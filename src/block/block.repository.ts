import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { Collection } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { Block } from './entity';

@Injectable()
export class BlockRepository {
  constructor(
    @InjectCollection(Block.name)
    private readonly blocks: Collection<Block>,
  ) {}

  async findAll(limit: number, from: Date, to: Date): Promise<Block[]> {
    const startDate = from
      ? from
      : DateTime.now().minus({ hours: 1 }).startOf('hour').toJSDate();
    const endDate = to ? to : DateTime.now().endOf('hour').toJSDate();

    return this.blocks
      .aggregate<Block>([
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        ...(limit ? [{ $limit: limit }] : []),
      ])
      .toArray();
  }

  async findLatest(): Promise<Block> {
    const startDate = DateTime.now()
      .minus({ hours: 1 })
      .startOf('hour')
      .toJSDate();
    const endDate = DateTime.now().endOf('hour').toJSDate();

    return (
      await this.blocks
        .aggregate<Block>([
          {
            $match: {
              createdAt: {
                $gte: startDate,
                $lte: endDate,
              },
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          { $limit: 1 },
        ])
        .toArray()
    )[0];
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
