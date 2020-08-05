
import { v4 as uuidV4 } from 'uuid';

import * as WebSocket from 'ws';


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
}
