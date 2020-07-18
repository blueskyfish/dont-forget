import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

/**
 * The http header name for the authorization token
 */
export const HTTP_AUTH_HEADER = 'x-dont-forget';

/**
 * Internal key for saving the authorization token in the Storage.
 */
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService) { }

  /**
   * Returns true if the authorization token existing
   */
  get isAuth(): boolean {
    return this.storageService.existItem(TOKEN_KEY);
  }

  get token(): string {
    return this.storageService.getItem(TOKEN_KEY);
  }

  updateToken(token: string): void {
    this.storageService.setItem(TOKEN_KEY, token);
  }

  reset(): void {
    this.storageService.removeItem(TOKEN_KEY);
  }

}
