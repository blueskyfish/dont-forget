import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RouteNames } from '../route.names';
import { AuthService } from '../service/auth.service';
import { RouterUtil } from '../util';

/**
 * Check the existing auth token. If there is no auth token, then it is redirect to the login page
 */
@Injectable({
  providedIn: 'root'
})
export class WithProtectedRouteGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    if (!this.authService.isAuth) {
      // there is no user currently
      // --> navigate to the login page
      return RouterUtil.navigateTo(this.router, RouteNames.Root, RouteNames.Login);
    }

    return Promise.resolve(true);
  }

}
