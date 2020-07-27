import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ChangeSidebar, SidebarMode } from 'projects/shared/src/lib/store/layout';
import { IUserName, UserState } from 'projects/shared/src/lib/store/user';
import { ISidebarAction } from 'projects/webapp/src/app/sidebar/components/sidebar.models';
import { Observable } from 'rxjs';

export type SidebarPanel = 'popup' | 'aside';


@Component({
  selector: 'dfo-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.scss']
})
export class SidebarPanelComponent implements OnInit {

  @Select(UserState.getUserName)
  user$: Observable<IUserName>

  @Input()
  kind: SidebarPanel;

  items: ISidebarAction[] = [
    {
      icon: 'home',
      title: 'Test',
      id: 4711,
      activated: false,
    }
  ]

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
