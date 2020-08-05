import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { Server } from 'ws';
import { buildGatewayEvent, GatewayEventName } from './gateway.event';
import { GatewayUtil } from './gateway.util';

/**
 * The logger context name
 */
const context = 'Gateway';

@WebSocketGateway()
export class GatewayService implements OnGatewayConnection<WebSocket>, OnGatewayDisconnect<WebSocket>, OnGatewayInit {

  @WebSocketServer()
  server: Server;

  private users = 0;

  constructor(private logger: Logger) {
  }

  afterInit(server: any): any {
    this.logger.debug(`Server initialized`, context);
  }

  async handleConnection(client: WebSocket, ...args): Promise<any> {

    // create a new uid and put into the client (websocket instance)
    const id = GatewayUtil.newId(client);
    this.logger.debug(`Connect: Client (${id}) => ${++this.users}`, context);

    await GatewayUtil.sendClient(client, buildGatewayEvent(GatewayEventName.Connect, { count: this.users, id }));

    // update all other clients
    const value = buildGatewayEvent(GatewayEventName.UpdateUser, {count: this.users});
    await GatewayUtil.broadcast(this.server.clients, value, client);
  }

  async handleDisconnect(client: WebSocket): Promise<any> {

    const id = GatewayUtil.getId(client);
    this.logger.debug(`Disconnect: Client (${id}) => ${--this.users}`, context);

    const value = buildGatewayEvent(GatewayEventName.Disconnect, { count: this.users })
    await GatewayUtil.broadcast(this.server.clients, value, client);
  }

  @SubscribeMessage('dfo.ticker')
  subscribeTicker(@MessageBody() message: string) {
    this.logger.debug(`Ticker ${message}`, context);

    return `${message}+${this.users}`;
  }

  @SubscribeMessage(GatewayEventName.UserId)
  subscribeUserId(client: WebSocket, {userId}) {
    const id = GatewayUtil.getId(client);
    this.logger.debug(`UserId: "${id}" => ${userId}`, context);
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
