/* tslint:disable */
export interface RegisterPayload {

  /**
   * The access code
   */
  accessCode: string;

  /**
   * The user email
   */
  email: string;

  /**
   * The user name
   */
  name: string;

  /**
   * The user password (less 8 signs or more)
   */
  password: string;

  /**
   * The user password as repeat
   */
  repeat: string;
}
