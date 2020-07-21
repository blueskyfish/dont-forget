import { LayoutHorizontalMode, LayoutVerticalMode } from './layout.models';

export const isLargeMode = (mode: LayoutHorizontalMode): boolean => {
  return mode === LayoutHorizontalMode.Large;
};

export const isSmallMode = (mode: LayoutVerticalMode): boolean => {
  return mode === LayoutVerticalMode.Small;
};

export const layoutClass = (value: LayoutHorizontalMode | boolean): string => {
  switch (value) {
    case LayoutHorizontalMode.Large:
    case true:
      return 'layout-large';
    case LayoutHorizontalMode.Medium:
    case false:
      return 'layout-medium';
    default:
      return 'layout-none';
  }
};

export const layoutSmall = (value: LayoutVerticalMode | boolean): string => {
  switch (value) {
    default:
    case LayoutVerticalMode.Normal:
    case false:
      return 'view-normal';
    case LayoutVerticalMode.Small:
    case true:
      return 'view-small';
  }
};
