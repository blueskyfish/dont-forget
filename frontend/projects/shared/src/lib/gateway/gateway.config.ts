
export interface IGatewayConfig {
  readonly url: string;
}

export class GatewayConfig {

  get url(): string {
    return this.config.url;
  }

  constructor(private readonly config: IGatewayConfig) {
  }
}
