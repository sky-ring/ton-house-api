import { Controller, Get, Query } from '@nestjs/common';
import { FindValidatorsRequest } from './request';
import { ValidatorService } from './validator.service';

@Controller(ValidatorController.path)
export class ValidatorController {
  static path = 'validators';

  constructor(private readonly validatorService: ValidatorService) {}

  @Get()
  findAll(@Query() findValidatorsRequest: FindValidatorsRequest) {
    return this.validatorService.findAll(findValidatorsRequest);
  }

  @Get('populated')
  findAllPopulated(@Query() findValidatorsRequest: FindValidatorsRequest) {
    return this.validatorService.findAllPopulated(findValidatorsRequest);
  }

  @Get('last')
  findLast() {
    return this.validatorService.findLast();
  }

  @Get('last/populated')
  findLastPopulated() {
    return this.validatorService.findLastPopulated();
  }
}
