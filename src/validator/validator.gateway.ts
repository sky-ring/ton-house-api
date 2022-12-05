import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SOCKET_PORT } from '../common/constants';
import { ValidatorsInfo } from './entity';
import { ValidatorEvents } from './enum';

@WebSocketGateway(SOCKET_PORT, {
  cors: true,
})
export class ValidatorGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent(ValidatorEvents.ValidatorsInserted)
  async onTransactionsInserted(payload: ValidatorsInfo) {
    this.server.sockets.emit(ValidatorEvents.ValidatorsInserted, payload);
  }
}
