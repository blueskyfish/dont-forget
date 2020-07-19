import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { DfoLoginUser, DfoUserInfo, DfoUserService } from 'projects/shared/src/lib/backend';
import { RouteNames } from 'projects/shared/src/lib/common';
import { AuthService } from 'projects/shared/src/lib/common/service';
import { Util } from 'projects/shared/src/lib/common/util';
import { RouteNavigate, StartApp } from 'projects/shared/src/lib/store/actions';
import { RemoveLastError } from 'projects/shared/src/lib/store/error';
import { errorHandler } from 'projects/shared/src/lib/store/error/error.handler';
import { LoginUser, RegisterUser } from 'projects/shared/src/lib/store/user/user.actions';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';


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

  @Selector<UserStateModel>()
  static isAdmin(state: UserStateModel) {
    return Util.notNil(state.roles) && state.roles.indexOf('admin') >= 0;
  }

  @Action(StartApp)
  startApp(ctx: StateContext<UserStateModel>) {
    const user = ctx.getState();
    if (this.authService.isAuth && Util.isNil(user.id)) {
      return this.userService.getInfo()
        .pipe(
          tap((user: DfoUserInfo) => {
            UserState.updateState(ctx, user);
          }),
          catchError(errorHandler(ctx, 'info')),
        );
    }
    return EMPTY;
  }

  @Action(LoginUser)
  loginUser(ctx: StateContext<UserStateModel>, {payload}: LoginUser) {
    return this.userService.login({ body: payload})
      .pipe(
        switchMap((user: DfoLoginUser) => {
          this.authService.updateToken(user.token);
          UserState.updateState(ctx, user);
          return ctx.dispatch([
            new RouteNavigate([RouteNames.Root, RouteNames.Home]),
            new RemoveLastError()
          ]);
        }),
        catchError(errorHandler(ctx, 'login'))
      );
  }

  @Action(RegisterUser)
  registerUser(ctx: StateContext<UserStateModel>, {payload}: RegisterUser) {
    return this.userService.register({body: payload})
      .pipe(
        switchMap((user: DfoLoginUser) => {
          this.authService.updateToken(user.token);
          UserState.updateState(ctx, user);
          return ctx.dispatch([
            new RouteNavigate([RouteNames.Root, RouteNames.Home]),
            new RemoveLastError(),
          ]);
        }),
        catchError(errorHandler(ctx, 'login'))
      );
  }


  private static updateState(ctx: StateContext<UserStateModel>, user: DfoUserInfo | DfoLoginUser) {
    ctx.setState({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles
    });
  }
}
