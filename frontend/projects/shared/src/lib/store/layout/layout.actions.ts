import { LayoutHorizontalMode, LayoutVerticalMode, SidebarMode } from './layout.models';

export class UpdateHorizontMode {
  static readonly type = '[Layout] update horizontal mode';

  constructor(public readonly horizontalMode: LayoutHorizontalMode) {
  }
}

export class UpdateVerticalMode {
  static readonly type = '[Layout] update vertical mode';

  constructor(public readonly verticalMode: LayoutVerticalMode) {
  }
}

export class ChangeSidebar {
  static readonly type = '[Layout] change sidebar';

  constructor(public readonly sidebarMode: SidebarMode) {
  }
}
