import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DfoElementsModule } from 'projects/shared/src/lib/elements/elements.module';
import { LoginViewComponent } from 'projects/shared/src/lib/login/view/login-view.component';


/**
 * Login module
 */
@NgModule({
  declarations: [
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    TranslateModule,

    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    DfoElementsModule,
  ],
  exports: [
    LoginViewComponent,
  ]
})
export class DfoLoginModule { }
