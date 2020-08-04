import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GatewayConfig } from './gateway.config';
import { buildGatewayEvent, GatewayEvent } from './gateway.event';
import { GatewaySubject } from './gateway.subject';

@Injectable()
export class GatewayService implements OnDestroy {

  private readonly subject$: GatewaySubject;



  constructor(private config: GatewayConfig) {
    this.subject$ = new GatewaySubject(config)

  }

  ngOnDestroy() {
    this.subject$.unsubscribe();
  }

  getMessage$(): Observable<GatewayEvent<any>> {
    return this.subject$.asObservable()
      .pipe(
        filter(e => !!e), // filter null events
      );
  }

  send<T>(event: string, data: T) {
    console.log('[Gateway] send event => %s =>', event, data);
    const value = buildGatewayEvent(event, data);
    this.subject$.send(value);
  }
}
