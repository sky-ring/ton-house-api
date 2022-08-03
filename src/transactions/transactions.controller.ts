import { Controller, Get } from '@nestjs/common';
import TransactionsProvider from './transactions.service';

@Controller('transactions')
export default class TransactionsController {
  constructor(private readonly provider: TransactionsProvider) {}

  @Get()
  recentTransactions() {
    return this.provider.getTransactions();
  }
}
