import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { AppendError, RemoveError } from 'projects/shared/src/lib/store/error/error.actions';
import { ErrorMessage } from 'projects/shared/src/lib/store/error/error.message';
import { ErrorUtil } from 'projects/shared/src/lib/store/error/error.util';
import { Observable } from 'rxjs';

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


  @Action(AppendError)
  appendError(ctx: StateContext<ErrorStateModel>, {error}: AppendError) {
    ctx.setState(ErrorUtil.appendError(ctx.getState(), error));
  }

  @Action(RemoveError)
  removeError(ctx: StateContext<ErrorStateModel>, {id}: RemoveError) {
    ctx.setState(ErrorUtil.removeError(ctx.getState(), id));
  }
}
