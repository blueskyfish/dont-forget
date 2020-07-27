import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISidebarAction } from 'projects/webapp/src/app/sidebar/components/sidebar.models';

@Component({
  selector: 'dfo-sidebar-action',
  template: `
    <div class="sidebar-action" matRipple (click)="execute.emit()">
      <div class="icon" *ngIf="action.icon">
        <mat-icon [svgIcon]="action.icon"></mat-icon>
      </div>
      <p class="title">{{ action.title }}</p>
      <div class="arrow">
        <mat-icon svgIcon="chevron-right"></mat-icon>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar-action.component.scss']
})
export class SidebarActionComponent implements OnInit {

  @Input()
  action: ISidebarAction;

  @Output()
  execute: EventEmitter<void> = new EventEmitter<void>(true);

  constructor() { }

  ngOnInit(): void {
  }


}
