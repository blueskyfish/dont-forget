
export type GatewayEventName = 'dfo.register' | 'dfo.ticker';

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
