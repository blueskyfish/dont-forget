import { RouterPathType } from '../common/util';

export class StartApp {
  static readonly type = '[Start] starts application'
}

export class RouteNavigate {
  static readonly type = '[Route] navigate';

  constructor(public readonly paths: RouterPathType[]) {
  }
}
