import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { TonService } from '../ton/ton.service';
import { Validator } from './entity';
import { ValidatorEvents } from './enum';
import { FindValidatorsRequest } from './request';
import { ValidatorRepistory } from './validator.repository';

@Injectable()
export class ValidatorService {
  constructor(
    private readonly validatorRepistory: ValidatorRepistory,
    private readonly tonService: TonService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findAll(findValidatorsRequest: FindValidatorsRequest) {
    return this.validatorRepistory.findAll(findValidatorsRequest.limit);
  }

  async findAllPopulated(findValidatorsRequest: FindValidatorsRequest) {
    return this.validatorRepistory.findAllPopulated(
      findValidatorsRequest.limit,
    );
  }

  async findLast() {
    return this.validatorRepistory.findLast();
  }

  async findLastPopulated() {
    return this.validatorRepistory.findLastPopulated();
  }

  @Cron('*/5 * * * * *')
  async collectLastBlock() {
    const currentInfo = await this.tonService.getCurrentValidators();

    const createdValidatorsIds =
      await this.validatorRepistory.createManyValidators(
        currentInfo.validators as Validator[],
      );

    currentInfo.validators = createdValidatorsIds;

    const createdInfo = await this.validatorRepistory.createValidatorsInfo(
      currentInfo,
    );

    this.eventEmitter.emit(ValidatorEvents.ValidatorsInserted, createdInfo);
  }
}
