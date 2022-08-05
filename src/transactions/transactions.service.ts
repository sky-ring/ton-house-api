import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlockTransactionT } from './transactions.model';

@Injectable()
export default class TransactionsProvider {
  constructor(
    @InjectModel('BlockTransactions')
    private readonly transactions: Model<BlockTransactionT>,
  ) {}

  async getTransactions(last = 10) {
    return this.transactions.find().sort({ created: -1 }).limit(last);
  }
}
