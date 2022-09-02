import { Controller, Get, Param, Query } from '@nestjs/common';
import TransactionsProvider from './transactions.service';

@Controller('transactions')
export default class TransactionsController {
  constructor(private readonly provider: TransactionsProvider) {}

  @Get('recent')
  recentTransactions(@Query('last') last = 10) {
    return this.provider.getTransactions(last);
  }

  @Get(':hash')
  byHash(@Param('hash') hash: string) {
    return this.provider.findByHash(hash);
  }

  @Get('account/:account')
  byAccount(@Param('account') account: string) {
    return this.provider.findByAccount(account);
  }

  @Get('time/:from/:to?')
  byTime(@Param('from') from: number, @Param('to') to?: number) {
    return this.provider.findInTimeRange(from, to);
  }
}
