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
import { buildGatewayEvent, GatewayEventName } from './gateway.event';
import { GatewayUtil } from './gateway.util';

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
    const id = GatewayUtil.newId(client);
    this.logger.debug(`Connect: Client (${id}) => ${++this.users}`, context);
    client.send(JSON.stringify(buildGatewayEvent('dfo.register', { users: this.users, id })));
  }

  handleDisconnect(client: WebSocket): any {
    const id = GatewayUtil.getId(client);
    this.logger.debug(`Disconnect: Client (${id}) => ${--this.users}`, context);
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
  send<T>(event: GatewayEventName, data: T, client?: WebSocket): void {
    const ev = buildGatewayEvent(event, data);
    const value = JSON.stringify(ev);
    this.server
      .clients
      .forEach(ws => {
        if (GatewayUtil.getId(ws) !== GatewayUtil.getId(client)) {
          ws.send(value);
        }
      });
  }
}
