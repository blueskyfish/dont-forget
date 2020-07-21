import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Util } from 'projects/shared/src/lib/common/util';
import { AppendError, RemoveError, RemoveLastError } from 'projects/shared/src/lib/store/error/error.actions';
import { ErrorMessage } from 'projects/shared/src/lib/store/error/error.message';
import { ErrorUtil } from 'projects/shared/src/lib/store/error/error.util';

export interface ErrorStateModel {
  last: Partial<ErrorMessage>;
  list: Partial<ErrorMessage>[];
}

export const ERROR_TOKEN = new StateToken<ErrorStateModel>('error');

@State<ErrorStateModel>({
  name: ERROR_TOKEN,
  defaults: {
    last: null,
    list: [],
  }
})
@Injectable({
  providedIn: 'root',
})
export class ErrorState {

  @Selector<ErrorStateModel>()
  static lastError(state: ErrorStateModel) {
    return state.last;
  }

  @Selector<ErrorStateModel>()
  static errorCount(state: ErrorStateModel): string {
    let count = Util.size(state.list);
    if (Util.notNil(state.last)) {
      count++;
    }
    return count === 0 ? null : `${count}`;
  }


  @Action(AppendError)
  appendError(ctx: StateContext<ErrorStateModel>, {error}: AppendError) {
    ctx.setState(ErrorUtil.appendError(ctx.getState(), error));
  }

  @Action(RemoveError)
  removeError(ctx: StateContext<ErrorStateModel>, {id}: RemoveError) {
    ctx.setState(ErrorUtil.removeError(ctx.getState(), id));
  }

  @Action(RemoveLastError)
  removeLastError(ctx: StateContext<ErrorStateModel>) {
    ctx.patchState({
      last: null,
    });
  }
}
