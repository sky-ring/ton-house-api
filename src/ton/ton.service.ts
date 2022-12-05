import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Transaction } from '../transaction/entity';
import { Block } from '../block/entity';
import { GetTransactionsRequest } from './request';
import { ValidatorsInfo } from '../validator/entity';
import { bytesToCell, parseValidators } from './helper/parser.helper';

@Injectable()
export class TonService {
  constructor(private readonly httpService: HttpService) {}

  async getLastMasterchainBlockInfo(): Promise<Block> {
    const { data } = await firstValueFrom(
      this.httpService.get('getMasterchainInfo'),
    );

    const blockInfo = data.result.last;

    const block = new Block({
      fileHash: blockInfo.file_hash,
      rootHash: blockInfo.root_hash,
      sequenceNumber: blockInfo.seqno,
      shard: blockInfo.shard,
      workchain: blockInfo.workchain,
    });

    return block;
  }

  async getTransactions(
    getTransactionsRequest: GetTransactionsRequest,
  ): Promise<Transaction[]> {
    const { data } = await firstValueFrom(
      this.httpService.get('getBlockTransactions', {
        params: {
          workchain: getTransactionsRequest.workchain,
          shard: getTransactionsRequest.shard,
          seqno: getTransactionsRequest.sequenceNumber,
          root_hash: getTransactionsRequest.rootHash,
          file_hash: getTransactionsRequest.fileHash,
        },
      }),
    );

    const transactions: Transaction[] = data.result.transactions.map(
      (transaction: any) =>
        new Transaction({
          account: transaction.account,
          hash: transaction.hash,
          lt: transaction.lt,
        }),
    );
    return transactions;
  }

  async getCurrentValidators(): Promise<ValidatorsInfo> {
    const { data } = await firstValueFrom(
      this.httpService.get('getConfigParam', {
        params: { config_id: 34 },
      }),
    );

    const bocBytes = bytesToCell(data.result.config.bytes);
    const deserialized = parseValidators(bocBytes);

    return deserialized;
  }
}
