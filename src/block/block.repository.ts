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

  async findAll(limit: number): Promise<Block[]> {
    return this.blocks
      .aggregate<Block>([
        {
          $sort: {
            createdAt: -1,
          },
        },
        ...(limit ? [{ $limit: limit }] : []),
      ])
      .toArray();
  }

  async findByHash(rootHash: string, fileHash: string): Promise<Block> {
    return this.blocks.findOne({ rootHash: rootHash, fileHash: fileHash });
  }

  async create(block: Block): Promise<Block> {
    const createdBlock = (await this.blocks.insertOne(block)).insertedId;
    return this.blocks.findOne({ _id: createdBlock });
  }

  async createMany(blocks: Block[]): Promise<Block[]> {
    const createdBlocks = (await this.blocks.insertMany(blocks)).insertedIds;
    return this.blocks.find({ _id: createdBlocks }).toArray();
  }
}
