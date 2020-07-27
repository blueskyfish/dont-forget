import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISidebarAction } from 'projects/webapp/src/app/sidebar/components/sidebar.models';

@Component({
  selector: 'dfo-sidebar-navbar',
  templateUrl: './sidebar-navbar.component.html',
  styleUrls: ['./sidebar-navbar.component.scss']
})
export class SidebarNavbarComponent implements OnInit {

  @Input()
  items: ISidebarAction[];

  @Input()
  small: boolean;

  @Input()
  large: boolean;

  @Output()
  execute: EventEmitter<ISidebarAction> = new EventEmitter<ISidebarAction>(true);

  constructor() { }

  ngOnInit(): void {
  }

  selectAction(action: ISidebarAction): void {

    this.items.forEach(a => a.activated = a.id === action.id);

    this.execute.emit(action);
  }
}
