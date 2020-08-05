import { interval, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { GatewayConfig } from './gateway.config';
import { GatewayEvent } from './gateway.event';


export class GatewaySubject extends Subject<GatewayEvent<any>> {

  private _connectionStatus$: Subject<boolean> = new Subject<boolean>();

  get connectionStatus$(): Observable<boolean> {
    return this._connectionStatus$.asObservable()
      .pipe(
        distinctUntilChanged()
      );
  }

  private reconnectionObservable$: Observable<number> = null;

  private readonly wsSubjectConfig: WebSocketSubjectConfig<GatewayEvent<any>>;
  private socket: WebSocketSubject<GatewayEvent<any>>;

  constructor(
    private config: GatewayConfig
  ) {
    super();

    /// config for WebSocketSubject
    /// except the url, here is closeObserver and openObserver to update connection status
    this.wsSubjectConfig = {
      url: this.config.url,
      closeObserver: {
        next: (e: CloseEvent) => {
          console.log('[Gateway] Close websocket => %s', e.code, e.reason);
          this.socket = null;
          this._connectionStatus$.next(false);
        }
      },
      openObserver: {
        next: (e: Event) => {
          console.log('[Gateway] Open Websocket of %s', this.config.url);
          this._connectionStatus$.next(true);
        }
      }
    };

    /// we connect
    this.connect();
    /// we follow the connection status and run the reconnect while losing the connection
    this.connectionStatus$
      .subscribe((isConnected) => {
        if (!this.reconnectionObservable$ && !isConnected) {
          this.reconnect();
        }
      });
  }

  connect(): void {
    if (this.socket) {
      // already connected
      return;
    }

    this.socket = webSocket<GatewayEvent<any>>(this.wsSubjectConfig);
    this.socket.subscribe(
      (data) => {
        /// when receiving a message, we just send it to our Subject
        // console.log('[Gateway] receive data from Websocket =>', data);
        this.next(data);
      },
      (error) => {
        console.log('[Gateway] received error =>', error);

        if (!this.socket) {
          /// in case of an error with a loss of connection, we restore it
          this.reconnect();
        }
      });
  }

  /**
   * WebSocket Reconnect handling
   */
  reconnect(): void {
    if (this.reconnectionObservable$) {

      return;
    }

    this.reconnectionObservable$ = interval(this.config.interval)
      .pipe(
        takeWhile((v, index) => {
          return index < this.config.maxRetry && !this.socket;
        }),
      );

    this.reconnectionObservable$.subscribe(
      () => {
        this.connect();
      },
      (err) => {
        console.log('[Gateway] reconnect error =>', err);
      },
      () => {
        /// if the reconnection attempts are failed, then we call complete of our Subject and status
        this.reconnectionObservable$ = null;
        if (!this.socket) {
          this.complete();
          this._connectionStatus$.complete();
        }
      });
  }

  /**
   * send an event to the server
   * @param {GatewayEvent<*>} value
   */
  send(value: GatewayEvent<any>): void {
    console.log('[Gateway] send event => %s', value.event);
    this.socket.next(value);
  }

  unsubscribe() {
    super.unsubscribe();
    if (this._connectionStatus$) {
      this._connectionStatus$.unsubscribe();
    }
    this.socket.unsubscribe();
    this.socket = null;
  }
}

