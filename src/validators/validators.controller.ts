import { Controller, Get, Query } from '@nestjs/common';
import ValidatorsProvider from './validators.service';

@Controller('validators')
export default class ValidatorsController {
  constructor(private readonly provider: ValidatorsProvider) {}

  @Get('')
  recentTransactions(@Query('count') count = 100) {
    return this.provider.getLast(count);
  }
}