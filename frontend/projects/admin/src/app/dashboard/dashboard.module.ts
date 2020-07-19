import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule
  ]
})
export class DfoDashboardModule { }
