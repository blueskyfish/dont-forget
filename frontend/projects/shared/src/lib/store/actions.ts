import { RouterPathType } from '../common/util';
import { GatewayEventName } from '../gateway/gateway.event';

export class StartApp {
  static readonly type = '[Start] starts application'
}

export class RouteNavigate {
  static readonly type = '[Route] navigate';

  constructor(public readonly paths: RouterPathType[]) {
  }
}

export class GatewayReceivedAction {
  static readonly type = '[Gateway] gateway received action';

  constructor(public readonly event: GatewayEventName, public readonly data?: any) {
  }
}
