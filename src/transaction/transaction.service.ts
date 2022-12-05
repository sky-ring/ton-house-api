import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepistory: TransactionRepository) {}

  async findAll(limit = 10) {
    return this.transactionRepistory.findAll(limit);
  }

  async findOneByHash(hash: string) {
    return this.transactionRepistory.findOneByHash(hash);
  }

  async findByAccount(account: string) {
    return this.transactionRepistory.findByAccount(account);
  }
}
