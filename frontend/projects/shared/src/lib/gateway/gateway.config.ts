
export interface IGatewayConfig {
  readonly url: string;
  readonly interval: number;
  readonly maxRetry: number;
}

export class GatewayConfig {

  get url(): string {
    return this.config.url;
  }

  get interval(): number {
    return this.config.interval || 5000;
  }

  get maxRetry(): number {
    return this.config.maxRetry || 20;
  }

  constructor(private readonly config: IGatewayConfig) {
  }
}
