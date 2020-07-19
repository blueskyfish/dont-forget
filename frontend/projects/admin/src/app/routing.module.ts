import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from 'projects/admin/src/app/dashboard';
import { WithoutProtectedRouteGuard, WithProtectedRouteGuard } from 'projects/shared/src/lib/common/guard';
import { LoginViewComponent } from 'projects/shared/src/lib/login';
import { RegisterViewComponent } from 'projects/shared/src/lib/register';

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
    })
  ],
  exports: [RouterModule]
})
export class DfoRoutingModule { }
