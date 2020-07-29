import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { ChangeSidebar, UpdateHorizontMode, UpdateVerticalMode } from './layout.actions';
import { LayoutHorizontalMode, LayoutVerticalMode, SidebarMode } from './layout.models';
import { isLargeMode, isSmallMode } from './layout.util';


export interface LayoutStateModel {

  horizontalMode: LayoutHorizontalMode;

  verticalMode: LayoutVerticalMode;

  sidebarMode: SidebarMode;
}

export const LAYOUT_TOKEN = new StateToken<LayoutStateModel>('layout');


@State<LayoutStateModel>({
  name: LAYOUT_TOKEN,
  defaults: {
    horizontalMode: null,
    verticalMode: null,
    sidebarMode: SidebarMode.Close,
  }
})
@Injectable({
  providedIn: 'root'
})
export class LayoutState {

  @Selector<LayoutStateModel>()
  static largeMode(state: LayoutStateModel): boolean {
    return isLargeMode(state.horizontalMode);
  }

  @Selector<LayoutStateModel>()
  static sidebarOpen(state: LayoutStateModel): boolean {
    return state.sidebarMode === SidebarMode.Open;
  }

  @Selector<LayoutStateModel>()
  static horizontalMode(state: LayoutStateModel): LayoutHorizontalMode {
    return state.horizontalMode;
  }

  @Selector<LayoutStateModel>()
  static verticalMode(state: LayoutStateModel): LayoutVerticalMode {
    return state.verticalMode;
  }

  @Selector()
  static isVerticalSmall(state: LayoutStateModel): boolean {
    return isSmallMode(LayoutState.verticalMode(state));
  }


  @Action(UpdateHorizontMode)
  updateHorizontalMode(ctx: StateContext<LayoutStateModel>, {horizontalMode}: UpdateHorizontMode) {
    ctx.patchState({
      horizontalMode,
    });
  }

  @Action(UpdateVerticalMode)
  updateVerticalModel(ctx: StateContext<LayoutStateModel>, {verticalMode}: UpdateVerticalMode) {
    ctx.patchState({
      verticalMode,
    });
  }

  @Action(ChangeSidebar)
  changeSidebar(ctx: StateContext<LayoutStateModel>, {sidebarMode}: ChangeSidebar) {
    ctx.patchState({
      sidebarMode,
    });
  }
}
