import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Util } from '../common/util';
import { GatewayConfig } from './gateway.config';
import { buildGatewayEvent, GatewayEvent, GatewayEventName } from './gateway.event';
import { GatewaySubject } from './gateway.subject';

@Injectable()
export class GatewayService implements OnDestroy {

  private eventMapper: { [event: string]: (store: Store, data: any) => void } = {};

  private readonly subject$: GatewaySubject;
  private connectState$: Subscription;

  constructor(private store: Store, private config: GatewayConfig) {
    this.subject$ = new GatewaySubject(config)
    this.connectState$ = this.subject$.connectionStatus$
      .subscribe((isConnect) => {

      });
  }

  ngOnDestroy() {
    this.connectState$.unsubscribe();
    this.subject$.unsubscribe();
  }

  mapEvent<T>(event: GatewayEventName, actionFunc: (store: Store, data: T) => void) {
    this.eventMapper[event] = actionFunc;
  }

  private getMessage$(): Observable<GatewayEvent<any>> {
    return this.subject$.asObservable()
      .pipe(
        filter(e => Util.notNil(e)),       // filter events not null
        filter(e => Util.notNil(e.event)), // filter event name not null,
      );
  }

  processHandler(): void {
    this.getMessage$()
      .subscribe((ev) => {
        console.log('[Gateway] received data =>', ev);
        if (this.eventMapper[ev.event]) {
          console.log('[Gateway] event => %s', ev.event);
          this.eventMapper[ev.event](this.store, ev.data);
        }
      });
  }

  send<T>(event: GatewayEventName, data: T) {
    console.log('[Gateway] send => %s =>', event, data);
    const value = buildGatewayEvent(event, data);
    this.subject$.send(value);
  }


}
