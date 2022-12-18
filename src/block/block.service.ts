import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { TransactionService } from '../transaction/transaction.service';
import { TonService } from '../ton/ton.service';
import { BlockRepository } from './block.repository';
import { BlockEvents } from './enum';
import { FindBlocksRequest } from './request/findBlocks.request';

@Injectable()
export class BlockService {
  constructor(
    private readonly blockRepository: BlockRepository,
    private readonly tonService: TonService,
    private readonly eventEmitter: EventEmitter2,
    private readonly transactionService: TransactionService,
  ) {}

  async findAll(findBlocksRequest: FindBlocksRequest) {
    return this.blockRepository.findAll(
      findBlocksRequest.from,
      findBlocksRequest.to,
      findBlocksRequest.limit,
    );
  }

  async findLatest() {
    return this.blockRepository.findLatest();
  }

  @Cron('*/3 * * * * *')
  async collectLastBlock() {
    const latestBlock = await this.tonService.getLastMasterchainBlockInfo();

    if (!latestBlock) {
      return;
    }

    const exists = await this.blockRepository.findByHash(
      latestBlock.rootHash,
      latestBlock.fileHash,
    );

    if (exists) {
      return;
    }
    const createdTransactionIds =
      await this.transactionService.collectBlockTransactions(latestBlock);
    latestBlock.transactions = createdTransactionIds;

    const createdBlock = await this.blockRepository.create(latestBlock);

    this.eventEmitter.emit(BlockEvents.BlockInserted, createdBlock);
  }
}
