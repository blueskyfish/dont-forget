

export class GatewayRegister {
  static readonly type = '[Gateway] register gateway';

  constructor(public readonly id: string) {
  }
}
