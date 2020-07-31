import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'ws';
import { buildGatewayEvent } from './gateway.event';

const context = 'Gateway';

@WebSocketGateway()
export class GatewayService implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  @WebSocketServer()
  server: Server;

  private users = 0;

  constructor(private logger: Logger) {
  }

  afterInit(server: any): any {
    this.logger.debug(`Server: ${JSON.stringify(server)}`, context);
  }


  handleConnection(client: WebSocket, ...args): any {
    this.logger.debug(`Connect: Client => ${++this.users}`, context);
    this.send('dfo.users', {
      users: this.users,
    });
  }

  handleDisconnect(client: WebSocket): any {
    this.logger.debug(`Disconnect: Client =>, ${--this.users}`, context);
  }

  @SubscribeMessage('dfo.ticker')
  subscribeTicker(@MessageBody() message: string) {
    this.logger.debug(`Ticker ${message}`, context);

    return `${message}+${this.users}`;
  }

  send<T>(event: string, data: T): void {
    const ev = buildGatewayEvent(event, data);
    const value = JSON.stringify(ev);
    this.server.clients.forEach(ws => ws.send(value));
  }
}
