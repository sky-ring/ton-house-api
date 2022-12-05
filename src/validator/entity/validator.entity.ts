import { ObjectId } from 'mongodb';

export class Validator {
  _id: ObjectId;

  publicKey: string;

  weight: string;

  address: string;

  constructor(data?: Partial<Validator>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
