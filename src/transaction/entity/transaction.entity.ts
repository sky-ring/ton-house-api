import { ObjectId } from 'mongodb';

export class Transaction {
  _id: ObjectId;

  hash: string;

  account: string;

  lt: number;

  createdAt: Date;

  constructor(data: Partial<Transaction>) {
    this.createdAt = new Date();
    if (data) {
      Object.assign(this, data);
    }
  }
}
