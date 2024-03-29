import { Controller, Get, Query } from '@nestjs/common';
import { FindValidatorsChartRequest, FindValidatorsRequest } from './request';
import { ValidatorService } from './validator.service';

@Controller(ValidatorController.path)
export class ValidatorController {
  static path = 'validators';

  constructor(private readonly validatorService: ValidatorService) {}

  @Get()
  findAll(@Query() findValidatorsRequest: FindValidatorsRequest) {
    return this.validatorService.findAll(findValidatorsRequest);
  }

  @Get('chart')
  getChart(@Query() findValidatorsChartRequest: FindValidatorsChartRequest) {
    return this.validatorService.getChart(findValidatorsChartRequest);
  }

  @Get('populated')
  findAllPopulated(@Query() findValidatorsRequest: FindValidatorsRequest) {
    return this.validatorService.findAllPopulated(findValidatorsRequest);
  }

  @Get('latest')
  findLast() {
    return this.validatorService.findLatest();
  }

  @Get('latest/populated')
  findLastPopulated() {
    return this.validatorService.findLatestPopulated();
  }
}
