import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { DfoRegisterPayload } from 'projects/shared/src/lib/backend';
import { Util } from 'projects/shared/src/lib/common/util';
import { RegisterUser, RemoveError } from 'projects/shared/src/lib/store';
import { ErrorMessage, ErrorState } from 'projects/shared/src/lib/store/error';
import { buildErrorCode } from 'projects/shared/src/lib/store/error/error.handler';
import { Observable, Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'dfo-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: [ './register-view.component.scss' ]
})
export class RegisterViewComponent implements OnInit {


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

  /**
   * The form for the registration
   */
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
    repeat: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
    accessCode: new FormControl('', [ Validators.required, Validators.minLength(1) ]),
    term: new FormControl(false, Validators.requiredTrue),
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

  register(): void {

    const payload: DfoRegisterPayload = this.registerForm.value;
    if ((payload as any).term) {
      delete (payload as any).term;
    }

    this.store.dispatch(new RegisterUser(payload));
  }

  removeError(): void {
    if (Util.notNil(this.errorId)) {
      this.store.dispatch(new RemoveError(this.errorId));
    }
  }
}
