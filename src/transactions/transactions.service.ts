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
    return this.transactions.find().sort({ $natural: -1 }).limit(last);
  }

  async findByHash(hash: string) {
    return this.transactions.findOne({ hash }).sort({ $natural: -1 });
  }

  async findByAccount(account: string) {
    return this.transactions.find({ account }).sort({ $natural: -1 });
  }

  async findInTimeRange(from: number, to?: number) {
    if (to === undefined) {
      to = Date.now();
    }
    return this.transactions
      .find({
        created: {
          $gte: from,
          $lte: to,
        },
      })
      .sort({ $natural: -1 });
  }
}
