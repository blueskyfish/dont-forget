import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RouteNames } from '../route.names';
import { AuthService } from '../service/auth.service';
import { RouterUtil } from '../util';

/**
 * Check if the user is already logged in, then it redirected to the home page.
 *
 * This is use for pages like **login** or **register**
 */
@Injectable({
  providedIn: 'root'
})
export class WithoutProtectedRouteGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    if (this.authService.isAuth) {
      // the user is already logged in
      // redirected to home page
      return RouterUtil.navigateTo(this.router, RouteNames.Root, RouteNames.Home);
    }
    return Promise.resolve(true);
  }

}
