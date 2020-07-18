/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class BackendConfig {
  rootUrl: string = '';
}

/**
 * Parameters for `BackendModule.forRoot()`
 */
export interface BackendConfigParams {
  rootUrl?: string;
}
