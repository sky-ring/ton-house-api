import { Injectable } from '@nestjs/common';
import DatabaseProvider from 'src/db/database.service';

@Injectable()
export default class TransactionsProvider {
  constructor(private readonly db: DatabaseProvider) {}

  async getTransactions(last = 10) {
    const query = `SELECT * FROM ${this.db.KEYSPACE}.block_transactions LIMIT ${last}`;
    const res = await this.db.execute(query);
    return res.rows;
  }
}
