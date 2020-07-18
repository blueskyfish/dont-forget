import { ErrorMessage } from 'projects/shared/src/lib/store/error/error.message';

export class AppendError {

  static readonly type = '[Error] append error';
  constructor(public readonly error: Partial<ErrorMessage>) {
  }
}
