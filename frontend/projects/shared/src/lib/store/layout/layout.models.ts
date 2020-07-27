
export const HORIZONTAL_MEDIA_QUERY_PORTRAIT = '(min-width: 768px) and (orientation: portrait)';
export const HORIZONTAL_MEDIA_QUERY_LANDSCAPE = '(min-width: 786px) and (orientation: landscape)';

export const VERTICAL_MEDIA_QUERY_LANDSCAPE = '(max-height: 512px) and (orientation: landscape)';


/**
 * Layout of horizontal mode
 */
export enum LayoutHorizontalMode {

  /**
   * The **large** horizontal mode.
   *
   * @see {@link HORIZONTAL_MEDIA_QUERY_LANDSCAPE}
   * @see {@link HORIZONTAL_MEDIA_QUERY_PORTRAIT}
   */
  Large = 'large',

  /**
   * The **medium** horizontal mode.
   *
   * @see {@link HORIZONTAL_MEDIA_QUERY_LANDSCAPE}
   * @see {@link HORIZONTAL_MEDIA_QUERY_PORTRAIT}
   */
  Medium = 'medium',
}

/**
 * The layout dimension of height.
 */
export enum LayoutVerticalMode {

  /**
   * The height is less
   */
  Small = 'small',

  /**
   * The height is normal and enough
   */
  Normal = 'normal',
}

export enum SidebarMode {
  Close = 'close',
  Open = 'open',
}
