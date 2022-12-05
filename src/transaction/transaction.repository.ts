import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { Transaction } from './entity';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectCollection(Transaction.name)
    private readonly transactions: Collection<Transaction>,
  ) {}

  async findAll(limit = 10): Promise<Transaction[]> {
    return this.transactions
      .aggregate<Transaction>([{ ...(limit && { $limit: limit }) }])
      .toArray();
  }

  async findOneByHash(hash: string): Promise<Transaction> {
    return this.transactions.findOne<Transaction>({ hash: hash });
  }

  async findByAccount(account: string): Promise<Transaction[]> {
    return this.transactions.find<Transaction>({ account: account }).toArray();
  }
}
