

export class GatewayEvent<T> {

  readonly event: string;

  readonly data: T;
}

export function buildGatewayEvent<T>(event: string, data: T): GatewayEvent<T> {
  return {
    event,
    data,
  };
}
