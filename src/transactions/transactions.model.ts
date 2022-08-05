import mongoose from 'mongoose';

export type BlockTransactionT = {
  hash: string;
  account: string;
  lt: number;
  created?: number;
};

const BlockTransactionsSchema = new mongoose.Schema<BlockTransactionT>({
  account: String,
  lt: Number,
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  created: Number,
});

export default BlockTransactionsSchema;
