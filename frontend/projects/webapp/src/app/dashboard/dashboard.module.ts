import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DfoSharedModule } from 'projects/shared/src/lib/shared.module';
import { DfoSidebarModule } from 'projects/webapp/src/app/sidebar/sidebar.module';
import { HomeViewComponent } from './views/home/home-view.component';

const dashboardViews: any[] = [
  HomeViewComponent,
];

const dashboardComponents: any[] = [
];


@NgModule({
  declarations: [
    ...dashboardViews,
    ...dashboardComponents,
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
    DfoSidebarModule,
  ]
})
export class DfoDashboardModule { }
