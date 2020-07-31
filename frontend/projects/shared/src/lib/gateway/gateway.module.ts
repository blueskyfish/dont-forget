import { ModuleWithProviders, NgModule } from '@angular/core';
import { GatewayConfig, IGatewayConfig } from './gateway.config';
import { GatewayService } from './gateway.service';

@NgModule({
  providers: [
    GatewayService,
  ],
})
export class DfoGatewayModule {

  static forRoot(config: IGatewayConfig): ModuleWithProviders<DfoGatewayModule> {
    return {
      ngModule: DfoGatewayModule,
      providers: [
        {
          provide: GatewayConfig,
          useValue: new GatewayConfig(config)
        },
        GatewayService,
      ]
    };
  }
}
