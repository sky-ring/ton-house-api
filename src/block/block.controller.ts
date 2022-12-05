import { Controller, Get, Query } from '@nestjs/common';
import { BlockService } from './block.service';
import { FindBlocksRequest } from './request';

@Controller(BlockController.path)
export class BlockController {
  static path = 'block';

  constructor(private readonly blockService: BlockService) {}

  @Get()
  findAll(@Query() findBlocksRequest: FindBlocksRequest) {
    return this.blockService.findAll(findBlocksRequest);
  }
}
