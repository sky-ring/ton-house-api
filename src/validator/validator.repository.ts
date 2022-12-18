import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { Validator, ValidatorsInfo } from './entity';
import { TimeWindow } from './enum';
import { TimeWindowFormat } from './validator.helper';

@Injectable()
export class ValidatorRepistory {
  constructor(
    @InjectCollection(ValidatorsInfo.name)
    private readonly validatorsInfo: Collection<ValidatorsInfo>,
    @InjectCollection(Validator.name)
    private readonly validators: Collection<Validator>,
  ) {}

  async getChart(
    timeWindow: TimeWindow,
    limit: number,
  ): Promise<ValidatorsInfo[]> {
    const endDate = DateTime.now().endOf(timeWindow);
    const startDate = endDate.minus({
      [`${timeWindow}s`]: limit,
    });

    return this.validatorsInfo
      .aggregate<ValidatorsInfo>([
        {
          $match: {
            createdAt: {
              $gte: startDate.toJSDate(),
              $lte: endDate.toJSDate(),
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: TimeWindowFormat[timeWindow],
                date: '$createdAt',
              },
            },
            totalWeight: {
              $avg: {
                $toLong: '$totalWeight',
              },
            },
            total: {
              $avg: '$total',
            },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $project: {
            _id: 0,
            createdAt: '$_id',
            totalWeight: 1,
            total: 1,
          },
        },
      ])
      .toArray();
  }

  async findAll(limit: number): Promise<ValidatorsInfo[]> {
    const endDate = DateTime.now().endOf('hour');
    const startDate = endDate.minus({
      days: 30,
    });

    return this.validatorsInfo
      .aggregate<ValidatorsInfo>([
        {
          $match: {
            createdAt: {
              $gte: startDate.toJSDate(),
              $lte: endDate.toJSDate(),
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        ...(limit ? [{ $limit: limit }] : []),
      ])
      .toArray();
  }

  async findLatest(): Promise<ValidatorsInfo> {
    const endDate = DateTime.now().endOf('day');
    const startDate = endDate
      .minus({
        days: 2,
      })
      .startOf('day');

    return (
      await this.validatorsInfo
        .aggregate<ValidatorsInfo>([
          {
            $match: {
              createdAt: {
                $gte: startDate.toJSDate(),
                $lte: endDate.toJSDate(),
              },
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $limit: 1,
          },
        ])
        .toArray()
    )[0];
  }

  async findAllPopulated(limit: number): Promise<ValidatorsInfo[]> {
    const endDate = DateTime.now().endOf('hour');
    const startDate = endDate.minus({
      days: 30,
    });

    return this.validatorsInfo
      .aggregate<ValidatorsInfo>([
        {
          $match: {
            createdAt: {
              $gte: startDate.toJSDate(),
              $lte: endDate.toJSDate(),
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        ...(limit ? [{ $limit: limit }] : []),
        {
          $lookup: {
            from: Validator.name,
            localField: 'validators',
            foreignField: '_id',
            as: 'validators',
          },
        },
      ])
      .toArray();
  }

  async findLatestPopulated(): Promise<ValidatorsInfo> {
    const endDate = DateTime.now().endOf('day');
    const startDate = endDate
      .minus({
        days: 2,
      })
      .startOf('day');

    return (
      await this.validatorsInfo
        .aggregate<ValidatorsInfo>([
          {
            $match: {
              createdAt: {
                $gte: startDate.toJSDate(),
                $lte: endDate.toJSDate(),
              },
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $limit: 1,
          },
          {
            $lookup: {
              from: Validator.name,
              localField: 'validators',
              foreignField: '_id',
              as: 'validators',
            },
          },
        ])
        .toArray()
    )[0];
  }

  async createValidatorsInfo(
    validatorsInfo: ValidatorsInfo,
  ): Promise<ValidatorsInfo> {
    const createdValidatorsInfo = (
      await this.validatorsInfo.insertOne(validatorsInfo)
    ).insertedId;
    return this.validatorsInfo.findOne({ _id: createdValidatorsInfo });
  }

  async createManyValidators(validators: Validator[]): Promise<ObjectId[]> {
    const createdValidatorsIds = (await this.validators.insertMany(validators))
      .insertedIds;
    return Object.values(createdValidatorsIds);
  }
}
