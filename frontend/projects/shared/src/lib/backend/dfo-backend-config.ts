/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class DfoBackendConfig {
  rootUrl: string = '';
}

/**
 * Parameters for `DfoBackendModule.forRoot()`
 */
export interface DfoBackendConfigParams {
  rootUrl?: string;
}
