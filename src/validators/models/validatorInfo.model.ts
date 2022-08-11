import mongoose from 'mongoose';

export type ValidatorsInfoT = {
  utimeSince: number;
  utimeUntill: number;
  total: number;
  main: number;
  totalWeight: string;
  created?: number;
};

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
});

export default ValidatorsInfoSchema;
