import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Util } from 'projects/shared/src/lib/common/util';
import { GatewayEventName } from 'projects/shared/src/lib/gateway/gateway.event';
import { GatewayService } from 'projects/shared/src/lib/gateway/gateway.service';
import { GatewayConnect, GatewayDisconnect, GatewayUpdateUser } from 'projects/shared/src/lib/store/gateway';
import { USER_TOKEN } from 'projects/shared/src/lib/store/user';

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

    gateway
      .mapEvent<{ id: string, count: number }>(GatewayEventName.Connect, (store, {count, id}) => {

        // update the gateway
        store.dispatch(new GatewayConnect(id, count));

        // sent the user id !!
        const userState = store.selectSnapshot(USER_TOKEN);
        const userId = Util.notNil(userState.id) ? userState.id : -1;
        gateway.send(GatewayEventName.UserId, {userId});
      })
      .mapEvent<{ count: number }>(GatewayEventName.Disconnect, (store, {count}) => {
        // update the count
        store.dispatch(new GatewayDisconnect(count));
      })
      .mapEvent<{ count: number }>(GatewayEventName.UpdateUser, (store, {count}) => {
        // update the user count
        store.dispatch(new GatewayUpdateUser(count));
      })
    ;

    // start the process handling from the incoming gateway events.
    gateway.startProcessingIncomeGatewayEvents();
  };
}
