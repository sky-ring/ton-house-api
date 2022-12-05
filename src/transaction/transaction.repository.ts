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

  async findAll(limit: number): Promise<Transaction[]> {
    return this.transactions
      .aggregate<Transaction>([
        {
          $sort: {
            createdAt: -1,
          },
        },
        ...(limit ? [{ $limit: limit }] : []),
      ])
      .toArray();
  }

  async findOneByHash(hash: string): Promise<Transaction> {
    return this.transactions.findOne<Transaction>({ hash: hash });
  }

  async findByAccount(account: string): Promise<Transaction[]> {
    return this.transactions.find<Transaction>({ account: account }).toArray();
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const createdTransaction = (await this.transactions.insertOne(transaction))
      .insertedId;
    return this.transactions.findOne({ _id: createdTransaction });
  }

  async createMany(transactions: Transaction[]): Promise<Transaction[]> {
    const createdTransactionsIds = (
      await this.transactions.insertMany(transactions)
    ).insertedIds;

    return this.transactions
      .find({
        _id: {
          $in: Object.values(createdTransactionsIds),
        },
      })
      .toArray();
  }
}
