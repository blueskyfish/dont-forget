import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { DfoSharedModule } from 'projects/shared/src/lib/shared.module';
import {
  SidebarActionComponent,
  SidebarHeroComponent,
  SidebarNavbarComponent,
  SidebarPanelComponent
} from 'projects/webapp/src/app/sidebar/components';
import { SidebarPopupComponent } from './components/sidebar-popup/sidebar-popup.component';
import { LogoutDialogComponent } from './dialogs';

const sidebarComponents: any[] = [
  SidebarActionComponent,
  SidebarHeroComponent,
  SidebarNavbarComponent,
  SidebarPanelComponent,
  SidebarPopupComponent,
];

const sidebarDialogs: any[] = [
  LogoutDialogComponent,
]


@NgModule({
  declarations: [
    ...sidebarComponents,
    ...sidebarDialogs,
  ],
  imports: [
    CommonModule,
    RouterModule,

    TranslateModule,

    NgxsModule,

    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,

    DfoSharedModule,
  ],
  exports: [
    ...sidebarComponents,
    ...sidebarDialogs,
  ],
  entryComponents: [
    ...sidebarDialogs,
  ]
})
export class DfoSidebarModule { }
