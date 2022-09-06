import {
  ConnectedSocket,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'net';
import ConsumerService from 'src/kafka/consumer.service';
import type { ValidatorsInfoT } from 'src/validators/validators.model';

@WebSocketGateway({
  namespace: 'validators',
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
})
export default class ValidatorsGateway implements OnGatewayInit {
  constructor(private readonly consumer: ConsumerService) {}

  afterInit(@ConnectedSocket() client: Socket) {
    this.consumer.consume(
      { topics: ['validators_info'] },
      {
        eachMessage: async ({ message }) => {
          const validatorInfo = JSON.parse(
            (message.value as Buffer).toString(),
          ) as ValidatorsInfoT;
          validatorInfo.created = parseInt(message.timestamp);

          client.emit('validators_info', validatorInfo);
        },
      },
    );
  }
}
