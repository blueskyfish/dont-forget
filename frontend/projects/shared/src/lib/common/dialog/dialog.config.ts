

export interface IDialogConfig {

  /** disable to click on backdrop is cancel / close the dialog */
  disableClose?: boolean;

  /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
  width?: number | string;
  /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
  height?: number | string;
  /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
  minWidth?: number | string;
  /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
  minHeight?: number | string;
  /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
  maxWidth?: number | string;
  /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
  maxHeight?: number | string;
}

export class DialogConfig {

  constructor(private config: IDialogConfig) {}

  mergeConfig(config: IDialogConfig): IDialogConfig {
    return {
      ...this.config,
      ...config,
    };
  }
}
