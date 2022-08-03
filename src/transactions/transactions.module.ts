import { Module } from '@nestjs/common';
import DatabaseModule from 'src/db/database.module';
import TransactionsController from './transactions.controller';
import TransactionsProvider from './transactions.service';

@Module({
  imports: [DatabaseModule],
  providers: [TransactionsProvider],
  controllers: [TransactionsController],
})
export default class TransactionsModule {}
