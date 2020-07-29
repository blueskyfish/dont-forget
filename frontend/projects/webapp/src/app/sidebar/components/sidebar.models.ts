

export interface ISidebarAction {

  /**
   * The action id. It should unique in the list of actions
   */
  id?: number;

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
   * The command of action. It should unique in the list of commands
   */
  command?: string;
}
