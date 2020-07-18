import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';

/**
 * Transports the data from the caller to the dialog and resolve the dismiss value back to the caller
 */
export class DialogHandler<D, R> {

  private _dismiss$: Subject<R> = new Subject<R>();

  /**
   * **NOTE**: call only in the caller not in the dialog.
   */
  get dismiss$(): Observable<R> {
    return this._dismiss$.asObservable();
  }

  get data(): D {
    return this._data;
  }

  constructor(private overlayRef: OverlayRef, private _data: D) {}

  dismiss(result?: R): void {
    this._dismiss$.next(result);
    this._dismiss$.complete();
    this.overlayRef.dispose();
    this.overlayRef = null;
  }
}
