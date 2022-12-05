import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { ValidatorsInfo } from './entity';

@Injectable()
export class ValidatorRepistory {
  constructor(
    @InjectCollection(ValidatorsInfo.name)
    private readonly validatorsInfo: Collection<ValidatorsInfo>,
  ) {}

  async findAll(limit = 100): Promise<ValidatorsInfo[]> {
    return this.validatorsInfo
      .aggregate<ValidatorsInfo>([{ ...(limit && { $limit: limit }) }])
      .toArray();
  }
}
