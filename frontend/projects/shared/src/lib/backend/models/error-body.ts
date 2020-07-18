/* tslint:disable */
export interface ErrorBody {

  /**
   * The error code
   */
  code: string;

  /**
   * An optional data properties
   */
  data?: {  };

  /**
   * The error group
   */
  group: string;

  /**
   * The message of the error occurretion
   */
  message: string;

  /**
   * The request method
   */
  method?: string;

  /**
   * The stacktrace of the error
   */
  stack?: Array<string>;

  /**
   * The request url with all parts of the query
   */
  url?: string;
}
