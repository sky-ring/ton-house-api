import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { Validator, ValidatorsInfo } from './entity';

@Injectable()
export class ValidatorRepistory {
  constructor(
    @InjectCollection(ValidatorsInfo.name)
    private readonly validatorsInfo: Collection<ValidatorsInfo>,
    @InjectCollection(Validator.name)
    private readonly validators: Collection<Validator>,
  ) {}

  async findAll(limit: number): Promise<ValidatorsInfo[]> {
    return this.validatorsInfo
      .aggregate<ValidatorsInfo>([
        {
          $sort: {
            createdAt: -1,
          },
        },
        ...(limit ? [{ $limit: limit }] : []),
      ])
      .toArray();
  }

  async findLast(): Promise<ValidatorsInfo> {
    return (
      await this.validatorsInfo
        .aggregate<ValidatorsInfo>([
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
    return this.validatorsInfo
      .aggregate<ValidatorsInfo>([
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

  async findLastPopulated(): Promise<ValidatorsInfo> {
    return (
      await this.validatorsInfo
        .aggregate<ValidatorsInfo>([
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
