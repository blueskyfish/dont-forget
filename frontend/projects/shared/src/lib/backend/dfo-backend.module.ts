/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DfoBackendConfig, DfoBackendConfigParams } from './dfo-backend-config';

import { DfoSystemService } from './services/dfo-system.service';
import { DfoUserService } from './services/dfo-user.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    DfoSystemService,
    DfoUserService,
    DfoBackendConfig
  ],
})
export class DfoBackendModule {
  static forRoot(params: DfoBackendConfigParams): ModuleWithProviders<DfoBackendModule> {
    return {
      ngModule: DfoBackendModule,
      providers: [
        {
          provide: DfoBackendConfig,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: DfoBackendModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('DfoBackendModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
