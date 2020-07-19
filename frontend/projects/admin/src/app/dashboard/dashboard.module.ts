import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeViewComponent } from './views/home/home-view.component';

const dashboardViews: any[] = [
  HomeViewComponent,
];

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
  ]
})
export class DfoDashboardModule { }
