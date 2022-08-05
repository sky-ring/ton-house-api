import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import TransactionsController from './transactions.controller';
import BlockTransactionsSchema from './transactions.model';
import TransactionsProvider from './transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BlockTransactions', schema: BlockTransactionsSchema },
    ]),
  ],
  providers: [TransactionsProvider],
  controllers: [TransactionsController],
})
export default class TransactionsModule {}
