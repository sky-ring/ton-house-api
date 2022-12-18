import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { BlockService } from 'src/block/block.service';
import { NetworkStatus } from './entity';
import { NetworkStatusEvents } from './enum';

@Injectable()
export class NetworkStatusService {
  constructor(
    private readonly blockService: BlockService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getCurrentStatus(): Promise<NetworkStatus> {
    const startDate = DateTime.now()
      .minus({ minutes: 1 })
      .startOf('minute')
      .toJSDate();
    const endDate = DateTime.now().endOf('minute').toJSDate();

    const blocks = await this.blockService.findAll({
      from: startDate,
      to: endDate,
      limit: undefined,
    });

    // Number of blocks in the last minute
    const blocksCount = blocks.length;

    // Latest block's sequence number
    const blockHeight = blocks[0].sequenceNumber;

    const currentBlockDate = DateTime.fromJSDate(blocks[0].createdAt);
    const lastBlockDate = DateTime.fromJSDate(
      blocks[blocks.length - 1].createdAt,
    );

    const firstLastDiff =
      currentBlockDate.diff(lastBlockDate).toMillis() / 1000;

    // Average block time in the last minute
    const blockTime = firstLastDiff / blocksCount;

    // Average transactions per second in the last minute
    const transactionsCount = blocks.reduce(
      (last, current) => last + current.transactions.length,
      0,
    );
    const tps = transactionsCount / firstLastDiff;

    return {
      blockHeight: blockHeight,
      blockTime: Math.floor(blockTime),
      tps: tps,
      blocksCount: blocksCount,
    };
  }

  @Cron('*/5 * * * * *')
  async watchNetworkStatus(): Promise<void> {
    const networkStatus = await this.getCurrentStatus();
    this.eventEmitter.emit(NetworkStatusEvents.Changed, networkStatus);
  }
}
