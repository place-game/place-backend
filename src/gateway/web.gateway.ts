import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Events } from './web.events';

var userCount = -1; //minus admin
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WebGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  @SubscribeMessage(Events.ON_GET_PLAYERS)
  async getConcurrentPlayers(server = this.server) {
    await server?.emit(Events.GET_PLAYERS, { current: userCount ?? 0 });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    userCount--;
    await this.server?.emit(Events.GET_PLAYERS, { current: userCount ?? 0 });

  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    userCount++;
    await this.server?.emit(Events.GET_PLAYERS, { current: userCount ?? 0 });


  }
}
