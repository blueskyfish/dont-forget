import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISidebarAction } from 'projects/webapp/src/app/sidebar/components/sidebar.models';

/**
 * The sidebar navbar shows the navbar actions
 */
@Component({
  selector: 'dfo-sidebar-navbar',
  template: `
    <nav class="sidebar-navbar">
      <dfo-sidebar-action
        [icon]="action.icon"
        [title]="action.title"
        [selected]="action.activated"
        (clicked)="selectAction(action)"
        *ngFor="let action of actionList">
      </dfo-sidebar-action>
    </nav>
  `,
  styleUrls: ['./sidebar-navbar.component.scss']
})
export class SidebarNavbarComponent implements OnInit {

  @Input()
  actionList: ISidebarAction[];

  @Output()
  execute: EventEmitter<ISidebarAction> = new EventEmitter<ISidebarAction>(true);

  constructor() { }

  ngOnInit(): void {
  }

  selectAction(action: ISidebarAction): void {

    this.actionList.forEach(a => a.activated = (a.id === action.id || a.command === action.command));

    this.execute.emit(action);
  }
}
