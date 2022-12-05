import { Controller, Get, Query } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller(BlockController.path)
export class BlockController {
  static path = 'block';

  constructor(private readonly blockService: BlockService) {}

  @Get()
  findAll(@Query('limit') limit?: number) {
    return this.blockService.findAll(limit);
  }
}
