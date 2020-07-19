import { ErrorMessage } from 'projects/shared/src/lib/store/error/error.message';

export class AppendError {
  static readonly type = '[Error] append error';

  constructor(public readonly error: Partial<ErrorMessage>) {
  }
}

export class RemoveError {
  static readonly type = '[Error] remove error';

  constructor(public readonly id: number) {
  }
}

export class RemoveLastError {
  static readonly type = '[Error] remove last error';
}
