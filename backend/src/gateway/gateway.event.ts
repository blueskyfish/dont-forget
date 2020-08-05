//
// "gateway.event.ts" is synchronized with the backend and frontend
//

export enum GatewayEventName {

  /**
   * A websocket is connected send the uid for the client.
   *
   */
  Connect = 'dfo.connect',

  /**
   * A websocket is disconnected. To all other websockets are sent this message.
   */
  Disconnect = 'dfo.disconnect',

  /**
   * Update the count of users to the clients
   */
  UpdateUser = 'dfo.updateUser',

  /**
   * A client send its user id (`-1` means there is no logged in user)
   */
  UserId = 'dfo.userId',
}


export class GatewayEvent<T> {
  readonly event: GatewayEventName;
  readonly data: T;
}

export function buildGatewayEvent<T>(event: GatewayEventName, data: T): GatewayEvent<T> {
  return {
    event,
    data,
  };
}
