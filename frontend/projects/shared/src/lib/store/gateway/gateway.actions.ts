/**
 * set the gateway id
 */
export class GatewayId {
  static readonly type = '[Gateway] set gateway id';

  constructor(public readonly id: string) {
  }
}

export class GatewayConnection {
  static readonly type = '[Gateway] connection state';
  constructor(public readonly connected: boolean) {
  }
}
