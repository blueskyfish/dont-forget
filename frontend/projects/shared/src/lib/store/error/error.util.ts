import { Util } from '../../common/util';
import { ErrorMessage } from './error.message';
import { ErrorStateModel } from './error.state';

export class ErrorUtil {

  static appendError(state: ErrorStateModel, error: Partial<ErrorMessage>): ErrorStateModel {
    console.log('> debug: state =>', state, error);

    const last = state.last;
    let newState = { ...state };
    newState.last = error;
    if (Util.notNil(last)) {
      newState.list.push({ ...last });
    }
    return newState;
  }

  static removeError(state: ErrorStateModel, id: number): ErrorStateModel {
    if (Util.notNil(state.last) && state.last.id === id) {
      return {
        ...state,
        last: null,
      };
    }
    return {
      ...state,
      list: state.list.filter(err => err.id !== id),
    };
  }
}
