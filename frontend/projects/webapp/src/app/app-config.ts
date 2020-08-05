import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GatewayService } from 'projects/shared/src/lib/gateway/gateway.service';
import { GatewayId } from 'projects/shared/src/lib/store/gateway';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


/**
 * Setup the gateway service.
 *
 * Here is the place for add redux action to the incoming gateway events.
 *
 * @param {GatewayService} gateway the service
 * @returns {() => void}
 */
export function gatewaySetup(gateway: GatewayService) {
  return () => {
    console.log('[Gateway] Setup ...');

    gateway.mapEvent<{id: string}>('dfo.register',
      (store, data) => store.dispatch(new GatewayId(data.id)));

    // start the process handling from the incoming gateway events.
    gateway.startProcessingIncomeGatewayEvents();
  };
}
