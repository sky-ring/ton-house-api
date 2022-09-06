import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlockT } from './blocks.model';

@Injectable()
export default class BlocksProvider {
  constructor(
    @InjectModel('Block')
    private readonly blocks: Model<BlockT>,
  ) {}

  async getLast(last = 20) {
    return this.blocks
      .find()
      .sort({ $natural: -1 })
      .limit(last)
      .select('-transactions');
  }
}
