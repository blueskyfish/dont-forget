import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SafeHtmlPipe } from 'projects/shared/src/lib/elements/pipes/safe-html.pipe';
import { MessageBoxComponent, PictureListComponent } from './components';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AvatarDirective } from 'projects/shared/src/lib/elements/directives/avatar.directive';

const elementComponents: any[] = [
  MessageBoxComponent,
  NavBarComponent,
  PictureListComponent,
]

const elementPipes: any[] = [
  SafeHtmlPipe,
];

const elementDirectives: any[] = [
  AvatarDirective,
];


@NgModule({
  declarations: [
    ...elementComponents,
    ...elementPipes,
    ...elementDirectives,
  ],
  exports: [
    ...elementComponents,
    ...elementPipes,
    ...elementDirectives,
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    MatRippleModule,
  ]
})
export class DfoElementsModule {
}
