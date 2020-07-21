import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DfoSharedModule } from 'projects/shared/src/lib/shared.module';
import { HomeViewComponent } from './views/home/home-view.component';

const dashboardViews: any[] = [
  HomeViewComponent,
]


@NgModule({
  declarations: [
    ...dashboardViews,
  ],
  exports: [
    ...dashboardViews,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    TranslateModule,

    MatSidenavModule,

    DfoSharedModule,
  ]
})
export class DfoDashboardModule { }
