import { Injectable } from '@nestjs/common';
import { BlockRepository } from './block.repository';

@Injectable()
export class BlockService {
  constructor(private readonly blockRepository: BlockRepository) {}

  async findAll(limit = 20) {
    return this.blockRepository.findAll(limit);
  }
}
