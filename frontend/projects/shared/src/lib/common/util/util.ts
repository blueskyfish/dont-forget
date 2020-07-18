
import { isNil, get, toLower, toUpper, startsWith, endsWith } from 'lodash';

export class Util {
  static readonly isNil = isNil;
  static readonly get = get;
  static readonly toLower = toLower;
  static readonly toUpper = toUpper;
  static readonly startsWith = startsWith;
  static readonly endsWith = endsWith;

  static readonly notNil = (value: any): boolean => {
    return !Util.isNil(value);
  }
}
