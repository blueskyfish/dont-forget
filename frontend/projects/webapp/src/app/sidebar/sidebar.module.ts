import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { DfoSharedModule } from 'projects/shared/src/lib/shared.module';
import { HeroPanelComponent } from './components/hero-panel/hero-panel.component';
import { SidebarPanelComponent } from './components/sidebar-panel/sidebar-panel.component';
import { SidebarNavbarComponent } from './components/sidebar-navbar/sidebar-navbar.component';

const sidebarComponents: any[] = [
  HeroPanelComponent,
  SidebarNavbarComponent,
  SidebarPanelComponent,
];


@NgModule({
  declarations: [
    ...sidebarComponents,
  ],
  imports: [
    CommonModule,
    RouterModule,

    TranslateModule,

    NgxsModule,

    MatIconModule,
    MatButtonModule,
    MatRippleModule,

    DfoSharedModule,
  ],
  exports: [
    ...sidebarComponents,
  ]
})
export class DfoSidebarModule { }
