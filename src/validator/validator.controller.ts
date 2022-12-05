import { Controller, Get, Query } from '@nestjs/common';
import { ValidatorService } from './validator.service';

@Controller(ValidatorController.path)
export class ValidatorController {
  static path = 'validator';

  constructor(private readonly validatorService: ValidatorService) {}

  @Get()
  findAll(@Query('limit') limit: number) {
    return this.validatorService.findAll(limit);
  }
}
