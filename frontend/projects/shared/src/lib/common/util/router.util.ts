import { Router } from '@angular/router';
import { Util } from './util';

export type RouterPathType = string | number;

export class RouterUtil {

  /**
   * Navigates to the given route (the route should be absolute)
   *
   * @param {Router} router the router
   * @param {RouterPathType[]} paths the path segments
   * @returns {Promise<boolean>}
   */
  static navigateTo(router: Router, ...paths: RouterPathType[]): Promise<boolean> {
    const url = paths
      .filter(path => !Util.isNil(path))
      .join('/')
      .replace('//', '/');
    return router.navigateByUrl(url)
      .catch(err => {
        // TODO logging the error
        return false;
      })
  }
}
