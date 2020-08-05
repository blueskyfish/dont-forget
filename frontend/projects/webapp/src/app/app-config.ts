import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GatewayService } from 'projects/shared/src/lib/gateway/gateway.service';
import { GatewayRegister } from 'projects/shared/src/lib/store/gateway';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



export function gatewaySetup(gateway: GatewayService) {
  console.log('[Gateway] Setup');
  return () => {
    gateway.mapEvent<{id: string}>('dfo.register',
      (store, data) => store.dispatch(new GatewayRegister(data.id)));
    gateway.processHandler();
  };
}
