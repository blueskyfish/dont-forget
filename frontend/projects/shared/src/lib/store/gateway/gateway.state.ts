import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { GatewayConnection, GatewayConnect, GatewayDisconnect, GatewayUpdateUser } from './gateway.actions';

/**
 * The model of the gateway communication.
 */
export interface GatewayStateModel {

  /**
   * The id of the connection with the gateway.
   */
  id: string;

  /**
   * The count of connection
   */
  count: number;

  /**
   * The connected state
   */
  connected: boolean;
}

export const GATEWAY_TOKEN = new StateToken<GatewayStateModel>('gateway');

@State<GatewayStateModel>({
  name: GATEWAY_TOKEN,
  defaults: {
    id: null,
    count: 0,
    connected: false,
  }
})
@Injectable({
  providedIn: 'root'
})
export class GatewayState {


  @Action(GatewayConnect)
  updateConnect(ctx: StateContext<GatewayStateModel>, { id, count }: GatewayConnect) {
    ctx.patchState({
      id,
      count,
    });
  }

  @Action([GatewayDisconnect, GatewayUpdateUser])
  updateDisconnect(ctx: StateContext<GatewayStateModel>, { count }: GatewayDisconnect | GatewayUpdateUser) {
    ctx.patchState({
      count,
    });
  }

  @Action(GatewayConnection)
  updateConnected(ctx: StateContext<GatewayStateModel>, { connected }: GatewayConnection) {
    ctx.patchState({
      connected,
    });
  }
}
