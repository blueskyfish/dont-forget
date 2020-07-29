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
import { Observable, Subscribable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Util } from '../../../../../../shared/src/lib/common/util';

/**
 * Sidebar Panel define the place
 *
 * * `popup` the sidebar is only shown if the user is click on hamburger menu action
 * * `aside` the sidebar is always shown on the left side from the content.
 */
export type SidebarPanel = 'popup' | 'aside';

/**
 * The sidebar contains the user hero component and 2 parts of sidebar-navbar
 *
 * Under the
 */
@UntilDestroy()
@Component({
  selector: 'dfo-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.scss']
})
export class SidebarPanelComponent implements OnInit {

  private readonly POPUP_ICONS = {
    openAction: 'chevron-up',
    closeAction: 'chevron-right',
    closeIcon: 'menu',
    openIcon: 'menu-open',
  };

  /**
   * The icon for the popup button
   */
  popupIcon = this.POPUP_ICONS.closeIcon;

  /**
   * The icon for the popup button arrow
   */
  popupArrow = this.POPUP_ICONS.closeAction;


  @Select(UserState.getUserName)
  user$: Observable<IUserName>

  /**
   * Observe the vertical height from the layout state. `true` means, the height is small
   */
  verticalSmall$: Subscription;


  private verticalSmall: boolean;

  /**
   * Indicator for has action list
   */
  get hasActionList(): boolean {
    return Util.size(this.actionList) > 0
  }

  /**
   * Indicator for has command list and show
   */
  get hasCommandList(): boolean {
    return !this.verticalSmall && Util.size(this.commandList) > 0;
  }

  /**
   * Indicator for has popup button and show the command list in popup
   */
  get hasPopupButton(): boolean {
    return this.verticalSmall && Util.size(this.commandList) > 0;
  }

  /**
   * The sidebar place.
   *
   * @type {SidebarPanel}
   *
   * @see {@link HomeViewComponent}
   */
  @Input()
  kind: SidebarPanel;

  /**
   * The list with the action. The list ís shown under the hero and if necessary it has scrollbars
   */
  @Input()
  actionList: ISidebarAction[] = [];

  /**
   * The list of command action.
   *
   * If the sidebar too small, then it will be shown as popup, otherwise it shown from bottom up.
   *
   * The title must be a translation key.
   */
  @Input()
  commandList: ISidebarAction[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.verticalSmall$ = this.store
      .select(LayoutState.isVerticalSmall)
      .subscribe(verticalSmall => this.verticalSmall = verticalSmall);
  }

  selectHero(): void {
    this.closeSidebar();
  }

  executeAction(action: ISidebarAction): void {
    this.actionList.forEach(a => a.activated = a.id === action.id);
    //
    this.closeSidebar();
  }

  executeCommand(command: ISidebarAction): void {
    this.commandList.forEach(c => c.activated = c.command === command.command);
    //
    this.closeSidebar();
  }

  private closeSidebar(): void {
    if (this.kind === 'popup') {
      this.store.dispatch(new ChangeSidebar(SidebarMode.Close));
    }
  }
}
