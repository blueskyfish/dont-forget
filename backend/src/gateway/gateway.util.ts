
import { v4 as uuidV4 } from 'uuid';
import * as _ from 'lodash';
import * as WebSocket from 'ws';
import { asyncForEachIterator, forEachIterator } from '../common/util';
import { GatewayEvent } from './gateway.event';


export class GatewayUtil {

  /**
   * Add a new uuid to the websocket in the attribute `id`
   *
   * @param {WebSocket} ws
   * @returns {string}
   */
  static newId(ws: WebSocket): string {
    (ws as any).id = uuidV4();
    return (ws as any).id;
  }

  static getId(ws: WebSocket): string {
    if (!ws) {
      return null;
    }
    return (ws as any).id || null;
  }

  static async sendClient(client: WebSocket, value: GatewayEvent<any>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      client.send(JSON.stringify(value), (err => {
        if (err) {
          return reject(err);
        }
        resolve();
      }));
    })
  }

  static async broadcast(clients: Set<WebSocket>, value: GatewayEvent<any>, exceptClient?: WebSocket | string) {
    await asyncForEachIterator(clients.values(), async (client: WebSocket) => {
      const shouldSend = _.isNil(exceptClient) ||
        (typeof exceptClient === 'string' && GatewayUtil.getId(client) !== exceptClient) ||
        (GatewayUtil.getId(client) !== GatewayUtil.getId(exceptClient as WebSocket));

      if (shouldSend) {
        await GatewayUtil.sendClient(client, value);
      }
    });
  }
}
