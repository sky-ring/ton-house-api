import { Validator } from './validator.entity';

export class ValidatorsInfo {
  timeSince: number;

  timeUntill: number;

  total: number;

  main: number;

  totalWeight: string;

  validators: Validator[];

  createdAt: Date;

  constructor(data: Partial<ValidatorsInfo>) {
    this.createdAt = new Date();
    if (data) {
      Object.assign(this, data);
    }
  }
}
