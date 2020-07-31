import { Injectable, OnDestroy } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Util } from '../common/util';
import { GatewayConfig } from './gateway.config';
import { buildGatewayEvent, GatewayEvent } from './gateway.event';

@Injectable()
export class GatewayService implements OnDestroy {

  private sender$: Subject<GatewayEvent<any>> = new Subject<GatewayEvent<any>>();

  private ws: WebSocketSubject<GatewayEvent<any>>;

  constructor(private config: GatewayConfig) {
    this.initialWebsocket();
  }

  ngOnDestroy() {
    if (Util.notNil(this.ws)) {
      this.ws.complete();
    }
    this.sender$.complete();
  }

  getMessage$(): Observable<GatewayEvent<any>> {
    this.initialWebsocket();

    this.ws.asObservable()
      .pipe(
        catchError(err => {
          console.log('Gateway Error =>', err);
          return EMPTY;
        })
      )
      .subscribe(ev => {
        this.sender$.next(ev);
      });

    return this.sender$.asObservable();
  }

  send<T>(event: string, data: T) {
    this.initialWebsocket();
    this.ws.next(buildGatewayEvent(event, data));
  }

  private initialWebsocket(): void {
    if (Util.isNil(this.ws)) {
      this.ws = webSocket<GatewayEvent<any>>(this.config.url);
    }
  }
}
