import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NetworkStatus } from './entity';
import { Server } from 'socket.io';
import { SOCKET_PORT } from '../common/constants';
import { NetworkStatusEvents } from './enum';

@WebSocketGateway(SOCKET_PORT, {
  cors: true,
})
export class NetworkStatusGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent(NetworkStatusEvents.Changed)
  async onNetworkStatusChanged(payload: NetworkStatus) {
    this.server.sockets.emit(NetworkStatusEvents.Changed, payload);
  }
}
