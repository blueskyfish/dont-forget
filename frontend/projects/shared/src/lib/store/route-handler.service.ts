import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { RouterUtil } from '../common/util';
import { RouteNavigate } from './actions';

@Injectable({
  providedIn: 'root'
})
export class RouteHandlerService {

  constructor(private router: Router, private actions$: Actions) {

    this.actions$
      .pipe(
        ofActionDispatched(RouteNavigate)
      )
      .subscribe(({paths}: RouteNavigate) => {
        RouterUtil.navigateTo(this.router, ...paths)
          .catch(err => console.log('Navigate Error =>', err));
      });
  }
}
