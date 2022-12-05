import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SOCKET_PORT } from '../common/constants';
import { Transaction } from './entity';
import { TransactionEvents } from './enum';

@WebSocketGateway(SOCKET_PORT, {
  cors: true,
})
export class TransactionGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent(TransactionEvents.TransactionsInserted)
  async onTransactionsInserted(payload: Transaction[]) {
    this.server.sockets.emit(TransactionEvents.TransactionsInserted, payload);
  }
}
