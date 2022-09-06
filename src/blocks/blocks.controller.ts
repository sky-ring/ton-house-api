import { Controller, Get, Query } from '@nestjs/common';
import BlocksProvider from './blocks.service';

@Controller('blocks')
export default class BlocksController {
  constructor(private readonly provider: BlocksProvider) {}

  @Get('')
  recentBlocks(@Query('count') count: number) {
    return this.provider.getLast(count);
  }
}
