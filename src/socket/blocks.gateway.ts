import {
  ConnectedSocket,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'net';
import ConsumerService from '../kafka/consumer.service';
import type { BlockInfoT, BlockT } from '../blocks/blocks.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@WebSocketGateway({
  namespace: 'blocks',
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
})
export default class BlocksGateway implements OnGatewayInit {
  constructor(
    private readonly consumer: ConsumerService,
    @InjectModel('Block')
    private readonly blocks: Model<BlockT>,
  ) {}

  afterInit(@ConnectedSocket() client: Socket) {
    this.consumer.consume(
      { topics: ['block'] },
      {
        eachMessage: async ({ message }) => {
          const block = JSON.parse(
            (message.value as Buffer).toString(),
          ) as BlockInfoT;
          const blockExists = await this.blocks.findOne({
            file_hash: block.file_hash,
            root_hash: block.root_hash,
            seqno: block.seqno,
          });
          if (blockExists) {
            block.transactionsCount = blockExists.transactionsCount;
          }
          client.emit('blocks', block);
        },
      },
    );
  }
}
