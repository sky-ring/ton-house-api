import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import BlocksController from './blocks.controller';
import { BlockSchema } from './blocks.model';
import BlocksProvider from './blocks.service';

export const BlocksModel = MongooseModule.forFeature([
  { name: 'Block', schema: BlockSchema },
]);

@Module({
  imports: [BlocksModel],
  exports: [BlocksModel],
  providers: [BlocksProvider],
  controllers: [BlocksController],
})
export default class BlocksModule {}
