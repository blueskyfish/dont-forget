import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MessageBoxComponent, PictureListComponent } from './components';

const elementComponents: any[] = [
  MessageBoxComponent,
  PictureListComponent,
]


@NgModule({
  declarations: [
    ...elementComponents,
  ],
  exports: [
    ...elementComponents,
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatButtonModule,
  ]
})
export class DfoElementsModule { }
