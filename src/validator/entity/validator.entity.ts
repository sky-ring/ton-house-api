export class Validator {
  publicKey: string;

  weight: string;

  address: string;

  constructor(data: Partial<Validator>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
