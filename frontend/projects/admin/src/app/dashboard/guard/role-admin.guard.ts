import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from 'projects/shared/src/lib/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {

  constructor(private store: Store) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select<boolean>(UserState.isAdmin)
      .pipe(
        tap((isAdmin: boolean) => {
          console.log('> debug: Admin Roles =>', isAdmin);

          if (!isAdmin) {
            // navigate to the webapp!!
            window.location.href = environment.webappUrl;
          }
        })
      );
  }

}
