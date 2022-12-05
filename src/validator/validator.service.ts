import { Injectable } from '@nestjs/common';
import { ValidatorRepistory } from './validator.repository';

@Injectable()
export class ValidatorService {
  constructor(private readonly validatorRepistory: ValidatorRepistory) {}

  async findAll(limit = 100) {
    return this.validatorRepistory.findAll(limit);
  }
}
