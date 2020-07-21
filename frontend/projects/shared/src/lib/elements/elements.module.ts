import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SafeHtmlPipe } from 'projects/shared/src/lib/elements/pipes/safe-html.pipe';
import { MessageBoxComponent, PictureListComponent } from './components';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

const elementComponents: any[] = [
  MessageBoxComponent,
  NavBarComponent,
  PictureListComponent,
]

const elementPipes: any[] = [
  SafeHtmlPipe,
]


@NgModule({
  declarations: [
    ...elementComponents,
    ...elementPipes,
  ],
  exports: [
    ...elementComponents,
    ...elementPipes,
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
  ]
})
export class DfoElementsModule { }
