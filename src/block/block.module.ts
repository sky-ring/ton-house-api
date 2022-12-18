import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { Block } from './entity';
import { BlockService } from './block.service';
import { BlockRepository } from './block.repository';
import { MongoModule } from 'nest-mongodb';
import { TonModule } from '../ton/ton.module';
import { BlockGateway } from './block.gateway';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [MongoModule.forFeature([Block.name]), TonModule, TransactionModule],
  providers: [BlockService, BlockRepository, BlockGateway],
  controllers: [BlockController],
  exports: [BlockService, BlockRepository],
})
export class BlockModule {}
