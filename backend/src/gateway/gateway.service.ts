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
import * as WebSocket from 'ws';
import { buildGatewayEvent } from './gateway.event';

/**
 * The logger context name
 */
const context = 'Gateway';

@WebSocketGateway()
export class GatewayService implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  @WebSocketServer()
  server: Server;

  private users = 0;

  constructor(private logger: Logger) {
  }

  afterInit(server: any): any {
    this.logger.debug(`Server initialized`, context);
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

  /**
   * Send an event data to the clients. If the  third parameter `client` is given, then it is excepted.
   * @param {string} event
   * @param {T} data
   * @param {WebSocket} client
   */
  send<T>(event: string, data: T, client?: WebSocket): void {
    const ev = buildGatewayEvent(event, data);
    const value = JSON.stringify(ev);
    this.server
      .clients
      .forEach(ws => {
        if (ws !== client) {
          ws.send(value);
        }
      });
  }
}
