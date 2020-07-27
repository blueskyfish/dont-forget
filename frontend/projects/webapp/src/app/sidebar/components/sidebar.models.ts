

export interface ISidebarAction {

  /**
   * Unique id
   */
  id: number;

  /**
   * Flag fpr active oder deactivated
   */
  activated: boolean;

  /**
   * The title of the action
   */
  title: string;

  /**
   * The **optional** icon
   */
  icon?: string;

  /**
   * The **optional** command
   */
  command?: string;
}

export type SidebarItem = ISidebarAction | '-';

export type SidebarItems = SidebarItem[];
