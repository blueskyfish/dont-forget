import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ISidebarAction } from '../sidebar.models';

/**
 * The icons / arrays for the button
 */
export interface IPopupIcons {
  openIcon: string;
  closeIcon: string;
  openArrow: string;
  closeArrow: string;
}

/**
 * Wrapper for an popup button with the command list.
 */
@Component({
  selector: 'dfo-sidebar-popup',
  templateUrl: './sidebar-popup.component.html',
  styleUrls: ['./sidebar-popup.component.scss']
})
export class SidebarPopupComponent {

  @Input()
  icons: IPopupIcons = {
    closeIcon: 'menu',
    openIcon: 'menu-open',
    openArrow: 'chevron-up',
    closeArrow: 'chevron-right',
  }

  @Input()
  title: string;

  popupIcon = this.icons.closeIcon;
  popupArrow = this.icons.closeArrow;

  @Input()
  commandList: ISidebarAction[];

  @Output()
  execute: EventEmitter<ISidebarAction> = new EventEmitter<ISidebarAction>(true);

  @ViewChild(MatMenuTrigger)
  menuPanel: MatMenuTrigger;

  openPopupPanel(): void {
    this.popupIcon = this.icons.openIcon;
    this.popupArrow = this.icons.openArrow;
  }

  closePopupPanel(): void {
    this.popupIcon = this.icons.closeIcon;
    this.popupArrow = this.icons.closeArrow;
  }

  selectCommand(command: ISidebarAction): void {
    if (this.menuPanel) {
      this.menuPanel.closeMenu();
    }
    this.execute.emit(command);
  }
}
