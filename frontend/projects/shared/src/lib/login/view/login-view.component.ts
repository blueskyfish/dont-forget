import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { DfoLoginPayload } from 'projects/shared/src/lib/backend';
import { Util } from 'projects/shared/src/lib/common/util';
import { ErrorState, LoginUser, RemoveError } from 'projects/shared/src/lib/store';
import { ErrorMessage } from 'projects/shared/src/lib/store/error';
import { buildErrorCode } from 'projects/shared/src/lib/store/error/error.handler';
import { Observable, Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'dfo-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  lastSub$: Subscription;

  @Select(ErrorState.lastError)
  lastError$: Observable<ErrorMessage>;

  /**
   * The error code translation key or `null`.
   */
  errorCode: string = null;

  /**
   * Error id or null.
   */
  errorId: number;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.lastSub$ = this.lastError$
      .subscribe((error: ErrorMessage) => {
        if (Util.notNil(error)) {
          this.errorId = error.id;
          this.errorCode = buildErrorCode(error);
        } else {
          this.errorId = null;
          this.errorCode = null;
        }
      });
  }

  login(): void {
    const payload: DfoLoginPayload = this.loginForm.value;
    this.store.dispatch(new LoginUser(payload));
  }

  removeError(): void {
    if (Util.notNil(this.errorId)) {
      this.store.dispatch(new RemoveError(this.errorId));
    }
  }
}
