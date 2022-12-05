import { ObjectId } from 'mongodb';
import { Transaction } from '../../transaction/entity';

export class Block {
  _id: ObjectId;

  workchain: number;

  shard: string;

  sequenceNumber: number;

  rootHash: string;

  fileHash: string;

  transactions: ObjectId[] | Transaction[];

  createdAt: Date;

  constructor(data?: Partial<Block>) {
    this.createdAt = new Date();
    this.transactions = [];
    if (data) {
      Object.assign(this, data);
    }
  }
}
