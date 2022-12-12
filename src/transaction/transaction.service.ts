import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { TonService } from '../ton/ton.service';
import { Block } from '../block/entity';
import { BlockEvents } from '../block/enum';
import { TransactionRepository } from './transaction.repository';
import { FindTransactionsRequest } from './request';
import { TransactionEvents } from './enum';
import { ObjectId } from 'mongodb';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepistory: TransactionRepository,
    private readonly tonService: TonService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findAll(findTransactionsRequest: FindTransactionsRequest) {
    return this.transactionRepistory.findAll(findTransactionsRequest.limit);
  }

  async findOneByHash(hash: string) {
    return this.transactionRepistory.findOneByHash(hash);
  }

  async findByAccount(account: string) {
    return this.transactionRepistory.findByAccount(account);
  }

  async collectBlockTransactions(block: Block): Promise<ObjectId[]> {
    const transactions = await this.tonService.getTransactions({
      sequenceNumber: block.sequenceNumber,
      shard: block.shard,
      workchain: block.workchain,
      fileHash: block.fileHash,
      rootHash: block.rootHash,
    });

    const createdTransactions = await this.transactionRepistory.createMany(
      transactions,
    );

    this.eventEmitter.emit(
      TransactionEvents.TransactionsInserted,
      createdTransactions,
    );

    return createdTransactions.map((transaction) => transaction._id);
  }
}
