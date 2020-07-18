import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { DfoLoginUser, DfoUserInfo, DfoUserService } from 'projects/shared/src/lib/backend';
import { AuthService } from 'projects/shared/src/lib/common/service';
import { Util } from 'projects/shared/src/lib/common/util';
import { StartApp } from 'projects/shared/src/lib/store/actions';
import { errorHandler } from 'projects/shared/src/lib/store/error/error.handler';
import { LoginUser } from 'projects/shared/src/lib/store/user/user.actions';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


export interface UserStateModel {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export const USER_TOKEN = new StateToken<UserStateModel>('user');


@State<UserStateModel>({
  name: USER_TOKEN,
  defaults: {
    id: null,
    name: null,
    email: null,
    roles: null,
  }
})
@Injectable({
  providedIn: 'root',
})
export class UserState {

  constructor(
    private authService: AuthService,
    private userService: DfoUserService,
  ) {
  }

  @Action(StartApp)
  startApp(ctx: StateContext<UserStateModel>) {
    const user = ctx.getState();
    if (this.authService.isAuth && Util.isNil(user.id)) {
      return this.userService.getInfo()
        .pipe(
          tap((user: DfoUserInfo) => {
            this.updateState(ctx, user);
          }),
          catchError(errorHandler(ctx, 'info'))
        );
    }
    return EMPTY;
  }

  @Action(LoginUser)
  loginUser(ctx: StateContext<UserStateModel>, {payload}: LoginUser) {
    return this.userService.login({ body: payload})
      .pipe(
        tap((user: DfoLoginUser) => {
          this.authService.updateToken(user.token);
          this.updateState(ctx, user);
        }),
        catchError(errorHandler(ctx, 'login'))
      );
  }


  private updateState(ctx: StateContext<UserStateModel>, user: DfoUserInfo | DfoLoginUser) {
    ctx.setState({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles
    });
  }
}
