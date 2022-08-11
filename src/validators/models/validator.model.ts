import mongoose from 'mongoose';

export type ValidatorT = {
  publicKey: string;
  weight: string;
  address: string;
};

const ValidatorSchema = new mongoose.Schema<ValidatorT>(
  {
    address: String,
    weight: String,
    publicKey: String,
  },
  { timestamps: true },
);

export default ValidatorSchema;
