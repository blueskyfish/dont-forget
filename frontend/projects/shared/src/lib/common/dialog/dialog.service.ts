import { ComponentType, Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DialogConfig, IDialogConfig } from './dialog.config';
import { DialogHandler } from './dialog.handler';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private injector: Injector,
    private overlay: Overlay,
    private dialogConfig: DialogConfig
  ) { }

  /**
   * Open a dialog component and returns the dialog handler (as middleware between caller and dialog)
   *
   * @param {ComponentType<T>} component the component must declare in the `entryComponents`.
   * @param {D} data the data to the dialog
   * @param {IDialogConfig} config the configuration
   * @returns {DialogHandler<D, R>}
   */
  open<R, D = {}, T = any>(component: ComponentType<T>, data: D, config: IDialogConfig): DialogHandler<D, R> {

    const overlayConfig = this.getOverlayConfig(config);

    const overlayRef = this.overlay.create(overlayConfig);

    const dialogHandler = new DialogHandler<D, R>(overlayRef, data);

    const portalInjector = this.getCreateInjector(dialogHandler);

    const componentRef = new ComponentPortal(component, null, portalInjector);

    overlayRef.attach(componentRef);

    if (!config.disableClose) {
      // close the dialog with null value
      overlayRef.backdropClick().subscribe(() => dialogHandler.dismiss(/*null*/));
    }

    return dialogHandler;
  }


  private getCreateInjector<D, R>(dialogHandlerRef: DialogHandler<D, R>): PortalInjector {
    const injectToken = new WeakMap();
    injectToken.set(DialogHandler, dialogHandlerRef);

    return new PortalInjector(this.injector, injectToken);
  }

  private getOverlayConfig(config: IDialogConfig): OverlayConfig {
    return {
      ...this.dialogConfig.mergeConfig(config),
      maxHeight: '95vh',
      maxWidth: '95vw',
      hasBackdrop: true,
      positionStrategy: this.getPositionStrategy(config),
      scrollStrategy: this.overlay.scrollStrategies.block()
    };
  }

  private getPositionStrategy(config: IDialogConfig): PositionStrategy {
    return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
  }
}
