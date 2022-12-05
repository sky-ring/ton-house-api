import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
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
  ) {}

  async findAll(findBlocksRequest: FindBlocksRequest) {
    return this.blockRepository.findAll(findBlocksRequest.limit);
  }

  @Cron('*/3 * * * * *')
  async collectLastBlock() {
    const latestBlock = await this.tonService.getLastMasterchainBlockInfo();

    const exists = await this.blockRepository.findByHash(
      latestBlock.rootHash,
      latestBlock.fileHash,
    );

    if (exists) {
      return;
    }

    const createdBlock = await this.blockRepository.create(latestBlock);
    this.eventEmitter.emit(BlockEvents.BlockCollected, createdBlock);
    this.eventEmitter.emit(BlockEvents.BlockInserted, createdBlock);
  }
}
