import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DfoSharedModule } from 'projects/shared/src/lib/shared.module';
import { DfoSidebarModule } from 'projects/webapp/src/app/sidebar/sidebar.module';
import { LogoutDialogComponent } from './dialogs';
import { HomeViewComponent } from './views/home/home-view.component';

const dashboardViews: any[] = [
  HomeViewComponent,
];

const dashboardComponents: any[] = [
];

const dashboardDialogs: any[] = [
  LogoutDialogComponent,
]

@NgModule({
  declarations: [
    ...dashboardViews,
    ...dashboardComponents,
    ...dashboardDialogs,
  ],
  exports: [
    ...dashboardViews,
    ...dashboardDialogs,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    TranslateModule,

    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,

    DfoSharedModule,
    DfoSidebarModule,
  ],
  entryComponents: [
    ...dashboardDialogs,
  ],
})
export class DfoDashboardModule { }
