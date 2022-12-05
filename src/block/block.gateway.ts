import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Block } from './entity';
import { BlockEvents } from './enum';
import { Server } from 'socket.io';
import { SOCKET_PORT } from '../common/constants';

@WebSocketGateway(SOCKET_PORT, {
  cors: true,
})
export class BlockGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent(BlockEvents.BlockInserted)
  async onBlockInserted(payload: Block) {
    this.server.sockets.emit(BlockEvents.BlockInserted, payload);
  }
}
