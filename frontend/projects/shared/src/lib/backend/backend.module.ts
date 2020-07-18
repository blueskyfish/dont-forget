/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendConfig, BackendConfigParams } from './backend-config';

import { SystemService } from './services/system.service';
import { UserService } from './services/user.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    SystemService,
    UserService,
    BackendConfig
  ],
})
export class BackendModule {
  static forRoot(params: BackendConfigParams): ModuleWithProviders<BackendModule> {
    return {
      ngModule: BackendModule,
      providers: [
        {
          provide: BackendConfig,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: BackendModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('BackendModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
