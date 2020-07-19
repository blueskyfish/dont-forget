import { DfoLoginPayload, DfoRegisterPayload } from 'projects/shared/src/lib/backend';

export class LoginUser {
  static readonly type = '[User] login user';

  constructor(public readonly payload: DfoLoginPayload) {
  }
}

export class RegisterUser {
  static readonly type = '[User] register user';

  constructor(public readonly payload: DfoRegisterPayload) {
  }
}
