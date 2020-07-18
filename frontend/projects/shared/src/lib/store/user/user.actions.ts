import { DfoLoginPayload } from 'projects/shared/src/lib/backend';

export class LoginUser {
  static readonly type = '[User] login user';
  constructor(public readonly payload: DfoLoginPayload) {
  }
}
