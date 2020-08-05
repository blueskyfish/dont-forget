import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Util } from '../common/util';
import { GatewayConnection } from '../store/gateway';
import { GatewayConfig } from './gateway.config';
import { buildGatewayEvent, GatewayEvent, GatewayEventName } from './gateway.event';
import { GatewaySubject } from './gateway.subject';

/**
 * The callback function for mapping an incoming gateway event with the redux store
 */
export type MapEventFunc<T> = (store: Store, data: T) => any;

@Injectable()
export class GatewayService implements OnDestroy {

  private eventMapper: Map<GatewayEventName, MapEventFunc<any>> = new Map<GatewayEventName, MapEventFunc<any>>();

  private readonly subject$: GatewaySubject;
  private connectState$: Subscription;
  private messages$: Subscription;

  constructor(private store: Store, private config: GatewayConfig) {
    this.subject$ = new GatewaySubject(config)

    // listen for the change of connection to the backend pver gateway
    this.connectState$ = this.subject$.connectionStatus$
      .subscribe((connected) => {
        this.store.dispatch(new GatewayConnection(connected));
      });
  }

  ngOnDestroy() {
    this.eventMapper.clear();
    this.eventMapper = null;

    this.messages$.unsubscribe();
    this.connectState$.unsubscribe();
    this.subject$.unsubscribe();
  }

  /**
   * Maps an event to a callback function. If the event is received, then it call this function.
   *
   * @param {GatewayEventName} event the event name
   * @param {MapEventFunc<T>} mappingFunc the callback function
   * @returns {this}
   */
  mapEvent<T>(event: GatewayEventName, mappingFunc: MapEventFunc<T>): this {
    this.eventMapper.set(event, mappingFunc);
    return this;
  }

  /**
   * Process the incoming gateway events
   */
  startProcessingIncomeGatewayEvents(): void {

    this.messages$ = this.incomeGatewayEvents()
      .subscribe(async (ev) => {

        console.log('[Gateway] received data =>', ev);
        const func = this.eventMapper.get(ev.event);

        if (Util.notNil(func)) {

          console.log('[Gateway] event "%s" is processing', ev.event);
          try {
            await func(this.store, ev.data);
          } catch (e) {
            console.log('[Gateway] error @ "%s" =>', ev.event, e);
          }

        } else {
          console.log('[Gateway] event "%s" has no mapper function', ev.event);
        }
      });
  }

  /**
   *
   * @param {GatewayEventName} event
   * @param {T} data
   */
  send<T>(event: GatewayEventName, data: T) {
    console.log('[Gateway] send => %s =>', event, data);
    const value = buildGatewayEvent(event, data);
    this.subject$.send(value);
  }

  private incomeGatewayEvents(): Observable<GatewayEvent<any>> {
    return this.subject$.asObservable()
      .pipe(
        filter(e => Util.notNil(e)),       // filter events not null
        filter(e => Util.notNil(e.event)), // filter event name not null,
      );
  }

}
