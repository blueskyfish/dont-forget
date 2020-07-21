import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { NavBarClicked } from 'projects/shared/src/lib/elements/components';
import { ChangeSidebar, LayoutState, SidebarMode } from 'projects/shared/src/lib/store/layout';
import { Observable, Subscription } from 'rxjs';

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

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  navBarClicked(ev: NavBarClicked): void {
    console.log('> debug: NavBar clicked =>', ev);
    if (ev.type === 'menu') {
      this.store.dispatch(new ChangeSidebar(SidebarMode.Open));
    }
  }

  closeSidebar(): void {
    this.store.dispatch(new ChangeSidebar(SidebarMode.Close));
  }
}
