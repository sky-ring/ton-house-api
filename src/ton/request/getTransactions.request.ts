export class GetTransactionsRequest {
  workchain: number;
  shard: string;
  sequenceNumber: number;
  rootHash: string;
  fileHash: string;
}
