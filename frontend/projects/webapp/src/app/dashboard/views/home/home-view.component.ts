import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { NavBarClicked } from 'projects/shared/src/lib/elements/components';
import { ErrorState } from 'projects/shared/src/lib/store/error';
import { ChangeSidebar, LayoutState, SidebarMode } from 'projects/shared/src/lib/store/layout';
import { IUserName, UserState } from 'projects/shared/src/lib/store/user';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'dfo-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  @Select(LayoutState.largeMode)
  largeMode$: Observable<boolean>;

  @Select(LayoutState.sidebarOpen)
  sidebarOpen$: Observable<boolean>;

  @Select(ErrorState.errorCount)
  errorCount$: Observable<string>;

  @Select(UserState.getUserName)
  userName$: Observable<IUserName>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  navBarClicked(ev: NavBarClicked): void {
    if (ev.type === 'menu') {
      this.store.dispatch(new ChangeSidebar(SidebarMode.Open));
      return;
    }
    if (ev.type === 'errors') {
      // TODO add popup error message
    }
  }

  closeSidebar(): void {
    this.store.dispatch(new ChangeSidebar(SidebarMode.Close));
  }
}
