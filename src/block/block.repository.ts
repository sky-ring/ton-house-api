import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { Block } from './entity';

@Injectable()
export class BlockRepository {
  constructor(
    @InjectCollection(Block.name)
    private readonly blocks: Collection<Block>,
  ) {}

  async findAll(limit = 20): Promise<Block[]> {
    return this.blocks
      .aggregate<Block>([
        {
          ...(limit && {
            $limit: limit,
          }),
        },
      ])
      .toArray();
  }
}
