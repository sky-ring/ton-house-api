import {
  ConnectedSocket,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'net';
import ConsumerService from 'src/kafka/consumer.service';
import type { BlockTransactionT } from 'src/transactions/transactions.model';

@WebSocketGateway({
  namespace: 'transactions',
  cors: {
    origin: [process.env.SOCKET_ORIGIN],
    methods: ['GET', 'POST'],
  },
})
export default class TransactionsGateway implements OnGatewayInit {
  constructor(private readonly consumer: ConsumerService) {}

  afterInit(@ConnectedSocket() client: Socket) {
    this.consumer.consume(
      { topics: ['block_transactions'] },
      {
        eachMessage: async ({ message }) => {
          const transaction = JSON.parse(
            (message.value as Buffer).toString(),
          ) as BlockTransactionT;
          transaction.created = parseInt(message.timestamp);

          client.emit('transaction', transaction);
        },
      },
    );
  }
}
