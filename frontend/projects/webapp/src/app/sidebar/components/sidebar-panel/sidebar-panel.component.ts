import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import {
  ChangeSidebar,
  isLargeMode,
  isSmallMode,
  LayoutState,
  SidebarMode
} from 'projects/shared/src/lib/store/layout';
import { IUserName, UserState } from 'projects/shared/src/lib/store/user';
import { ISidebarAction } from 'projects/webapp/src/app/sidebar/components/sidebar.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type SidebarPanel = 'popup' | 'aside';

@UntilDestroy()
@Component({
  selector: 'dfo-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.scss']
})
export class SidebarPanelComponent implements OnInit {

  @Select(UserState.getUserName)
  user$: Observable<IUserName>

  /**
   * Observe the vertical height from the layout state. `true` means, the height is small
   */
  verticalSmall$: Observable<boolean>;

  /**
   * Observe the horizontal width from the layout state. `true` means, the width is large.
   */
  horizontalLarge$: Observable<boolean>;

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
    this.verticalSmall$ = this.store
      .select(LayoutState.verticalMode)
      .pipe(
        map(v => isSmallMode(v))
      );

    this.horizontalLarge$ = this.store
      .select(LayoutState.horizontalMode)
      .pipe(
        map(h => isLargeMode(h))
      );
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
