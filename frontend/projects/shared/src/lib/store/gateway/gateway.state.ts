import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { GatewayRegister } from './gateway.actions';


export interface GatewayStateModel {
  id: string;
}

export const GATEWAY_TOKEN = new StateToken<GatewayStateModel>('gateway');

@State<GatewayStateModel>({
  name: GATEWAY_TOKEN,
  defaults: {
    id: null,
  }
})
@Injectable({
  providedIn: 'root'
})
export class GatewayState {


  @Action(GatewayRegister)
  updateGateway(ctx: StateContext<GatewayStateModel>, { id }: GatewayRegister) {
    ctx.patchState({
      id,
    });
  }

}
