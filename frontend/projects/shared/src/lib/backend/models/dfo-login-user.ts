/* tslint:disable */
export interface DfoLoginUser {

  /**
   * The email of the user
   */
  email: string;

  /**
   * The user id
   */
  id: number;

  /**
   * The user name
   */
  name: string;

  /**
   * The roles of the user
   */
  roles: Array<string>;

  /**
   * This is the user token for his authentication at protected endpoints
   */
  token: string;
}
