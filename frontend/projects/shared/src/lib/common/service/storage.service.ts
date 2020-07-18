import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Util } from '../util';
import { StorageUtil } from './storage.util';

/**
 * The injection token for the storage engine
 *
 * * localStorage
 * * sessionStorage
 */
export const STORAGE_TOKEN: InjectionToken<Storage> = new InjectionToken<Storage>('dfo.storage.engine');


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * The storage engine
   */
  get storage(): Storage {
    return this.theStorage || localStorage;
  }

  constructor(@Inject(STORAGE_TOKEN) private readonly theStorage: Storage) {
  }

  existItem(key: string): boolean {
    const name = StorageUtil.buildKey(key);
    return !Util.isNil(this.storage.getItem(name));
  }

  getItem(key: string): string {
    const name = StorageUtil.buildKey(key);
    return this.storage.getItem(name);
  }

  setItem(key: string, value: string): void {
    const name = StorageUtil.buildKey(key);
    this.storage.setItem(name, value);
  }

  removeItem(key: string): void {
    const name = StorageUtil.buildKey(key);
    this.storage.removeItem(name);
  }

}
