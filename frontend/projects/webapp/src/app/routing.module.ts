import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithoutProtectedRouteGuard, WithProtectedRouteGuard } from 'projects/shared/src/lib/common/guard';
import { LoginViewComponent } from 'projects/shared/src/lib/login';
import { RegisterViewComponent } from 'projects/shared/src/lib/register';
import { DfoSharedModule } from 'projects/shared/src/lib/shared.module';
import { DfoDashboardModule, HomeViewComponent } from 'projects/webapp/src/app/dashboard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent,
    canActivate: [
      WithoutProtectedRouteGuard,
    ],
  },
  {
    path: 'register',
    component: RegisterViewComponent,
    canActivate: [
      WithoutProtectedRouteGuard,
    ]
  },
  {
    path: 'home',
    component: HomeViewComponent,
    canActivate: [
      WithProtectedRouteGuard,
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      paramsInheritanceStrategy: 'always',
    }),

    DfoSharedModule,
    DfoDashboardModule,
  ],
  exports: [
    RouterModule,

    DfoDashboardModule,
  ]
})
export class DfoRoutingModule {
}
