import { ObjectId } from 'mongodb';
import { Transaction } from '../../transaction/entity';

export class Block {
  _id: ObjectId;

  workchain: number;

  shard: string;

  sequenceNumber: number;

  rootHash: string;

  fileHash: string;

  transactionsCount: number;

  transactions: ObjectId[] | Transaction[];

  createdAt: Date;

  constructor(data: Partial<Block>) {
    this.createdAt = new Date();
    if (data) {
      Object.assign(this, data);
    }
  }
}
