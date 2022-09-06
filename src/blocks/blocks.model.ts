import mongoose, { Types } from 'mongoose';
import { BlockTransactionT } from '../transactions/transactions.model';

export type BlockType = {
  workchain: number;
  shard: string;
  seqno: number;
  root_hash: string;
  file_hash: string;
  transactionsCount: number;
};

export type BlockT = BlockType & {
  transactions?: Types.ObjectId[];
};

export type BlockInfoT = BlockType & {
  transactions: BlockTransactionT[];
};

export const BlockSchema = new mongoose.Schema<BlockT>({
  workchain: Number,
  shard: String,
  seqno: Number,
  root_hash: String,
  file_hash: String,
  transactions: [
    {
      body: 'string',
      by: mongoose.Schema.Types.ObjectId,
    },
  ],
  transactionsCount: Number,
});
