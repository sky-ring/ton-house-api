import { Controller, Get, Param, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller(TransactionController.path)
export class TransactionController {
  static path = 'transaction';

  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  findAll(@Query('limit') limit = 10) {
    return this.transactionService.findAll(limit);
  }

  @Get(':hash')
  findOneByHash(@Param('hash') hash: string) {
    return this.transactionService.findOneByHash(hash);
  }

  @Get('account/:account')
  findAllByAccount(@Param('account') account: string) {
    return this.transactionService.findByAccount(account);
  }
}
