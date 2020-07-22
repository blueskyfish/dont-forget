import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeSidebar, SidebarMode } from 'projects/shared/src/lib/store/layout';
import { AvatarValue } from '../hero-panel/hero-panel.util';

export type SidebarPanel = 'popup' | 'aside';


@Component({
  selector: 'dfo-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.scss']
})
export class SidebarPanelComponent implements OnInit {

  @Input()
  userName: AvatarValue;

  @Input()
  kind: SidebarPanel;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  selectHero(): void {
    this.closeSidebar();
  }

  private closeSidebar(): void {
    if (this.kind === 'popup') {
      this.store.dispatch(new ChangeSidebar(SidebarMode.Close));
    }
  }
}
