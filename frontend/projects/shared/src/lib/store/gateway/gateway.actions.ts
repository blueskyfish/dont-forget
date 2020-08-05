/**
 * set the gateway connect
 */
export class GatewayConnect {
  static readonly type = '[Gateway] connect to gateway';

  constructor(public readonly id: string, public readonly count: number) {
  }
}

export class GatewayDisconnect {
  static readonly type = '[Gateway] disconnect from gateway';

  constructor(public readonly count: number) {
  }
}

export class GatewayUpdateUser {
  static readonly type = '[Gateway] update count clients';

  constructor(public readonly count: number) {
  }
}

/**
 * The connection state to the backend gateway
 */
export class GatewayConnection {
  static readonly type = '[Gateway] connection state';

  constructor(public readonly connected: boolean) {
  }
}
