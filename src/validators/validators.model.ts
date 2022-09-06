import mongoose from 'mongoose';

export type ValidatorT = {
  publicKey: string;
  weight: string;
  address: string;
};

export type ValidatorsInfoT = {
  utimeSince: number;
  utimeUntill: number;
  total: number;
  main: number;
  totalWeight: string;
  validators: ValidatorT[];
  created?: number;
};

const ValidatorSchema = new mongoose.Schema<ValidatorT>(
  {
    address: String,
    weight: String,
    publicKey: String,
  },
  { timestamps: true },
);

const ValidatorsInfoSchema = new mongoose.Schema<ValidatorsInfoT>({
  created: {
    type: Number,
    unique: true,
  },
  utimeSince: Date,
  utimeUntill: Date,
  total: Number,
  main: Number,
  totalWeight: String,
  validators: [ValidatorSchema],
});

export default ValidatorsInfoSchema;
