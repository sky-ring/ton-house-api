import {
  ConnectedSocket,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'net';
import ConsumerService from 'src/kafka/consumer.service';
import { ValidatorsInfoT } from 'src/validators/models/validatorInfo.model';

@WebSocketGateway({
  namespace: 'validators',
  cors: {
    origin: [process.env.SOCKET_ORIGIN],
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
