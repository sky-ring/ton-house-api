import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { Block } from './entity';
import { BlockService } from './block.service';
import { BlockRepository } from './block.repository';
import { MongoModule } from 'nest-mongodb';

@Module({
  imports: [MongoModule.forFeature([Block.name])],
  providers: [BlockService, BlockRepository],
  controllers: [BlockController],
})
export class BlockModule {}
