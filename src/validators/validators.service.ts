import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidatorsInfoT } from './models/validator.model';

@Injectable()
export default class ValidatorsProvider {
  constructor(
    @InjectModel('ValidatorsInfo')
    private readonly validatorsInfo: Model<ValidatorsInfoT>,
  ) {}

  async getLast(last = 100) {
    return this.validatorsInfo
      .find()
      .sort({ $natural: -1 })
      .limit(last)
      .select('-validators');
  }
}
