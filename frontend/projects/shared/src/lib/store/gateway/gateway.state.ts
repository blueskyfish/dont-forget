import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { GatewayConnection, GatewayId } from './gateway.actions';

/**
 * The model of the gateway communication.
 */
export interface GatewayStateModel {

  /**
   * The id of the connection with the gateway.
   */
  id: string;

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
    connected: false,
  }
})
@Injectable({
  providedIn: 'root'
})
export class GatewayState {


  @Action(GatewayId)
  updateId(ctx: StateContext<GatewayStateModel>, { id }: GatewayId) {
    ctx.patchState({
      id,
    });
  }

  @Action(GatewayConnection)
  updateConnected(ctx: StateContext<GatewayStateModel>, { connected }: GatewayConnection) {
    ctx.patchState({
      connected,
      id: connected ? ctx.getState().id : null,
    });
  }
}
