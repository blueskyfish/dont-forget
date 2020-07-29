import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DfoErrorBody } from '../../backend';
import { Util } from '../../common/util';
import { AppendError } from './error.actions';
import { ErrorMessage } from './error.message';

/**
 * The server error group name
 */
export const SERVER_ERROR_GROUP = 'server';

/**
 * Generator for the error id.
 */
export const errorIdGen = {

  /**
   * The internal property for the next id.
   */
  value: 0,

  get nextId(): number {
    return ++this.value;
  }
}

/**
 * Handler for catch an error / exception during a http request.
 *
 * @param {StateContext} ctx
 * @param {string} serverCode the server error code
 * @returns {(reason) => Observable<TypedAction<any>>}
 */
export function errorHandler<M>(ctx: StateContext<M>, serverCode: string) {
  return (reason): Observable<void> => {

    if (reason instanceof HttpErrorResponse) {

      let error: Partial<ErrorMessage> = {
        id: errorIdGen.nextId,
        status: reason.status,
      };

      if (reason.status >= 500) {
        error.group = SERVER_ERROR_GROUP;
        error.code = serverCode;
      } else if (reason.status >= 400) {
        const body: DfoErrorBody = reason.error;
        error.group = body.group;
        error.code = body.code;
        error.message = body.message;
        error.request = {
          method: body.method,
          url: body.url
        }
      } else {
        error.group = SERVER_ERROR_GROUP;
        error.code = serverCode;
        error.message = reason.message;
      }

      return ctx.dispatch(new AppendError(error))

    } else if (reason instanceof HttpResponseBase) {
      const error: Partial<ErrorMessage> = {
        id: errorIdGen.nextId,
        status: reason.status,
        group: SERVER_ERROR_GROUP,
        code: serverCode,
        message: reason.statusText,
        request: {
          method: '?',
          url: reason.url
        }
      };
      return ctx.dispatch(new AppendError(error));

    } else if (reason instanceof Error) {
      const error: Partial<ErrorMessage> = {
        id: errorIdGen.nextId,
        status: 500,
        group: SERVER_ERROR_GROUP,
        code: serverCode,
        message: reason.message,
      };
      return ctx.dispatch(new AppendError(error));
    }

    // default error message
    const error: Partial<ErrorMessage> = {
      id: errorIdGen.nextId,
      status: 500,
      group: SERVER_ERROR_GROUP,
      code: serverCode,
      message: JSON.stringify(reason)
    };
    return ctx.dispatch(new AppendError(error));
  };
}

/**
 * Builds the translate key from the error message
 * @param {ErrorMessage} err the error message or null
 * @returns {string} the translate key or null
 */
export function buildErrorCode(err?: Partial<ErrorMessage>): string {
  return Util.notNil(err) ? ['app.error', err.group, err.code].join('.') : null;
}
