import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogConfig } from 'projects/shared/src/lib/common/dialog';
import { BACKEND_CONFIG, BackendService } from 'projects/shared/src/lib/common/service/backend.service';
import { STORAGE_TOKEN } from 'projects/shared/src/lib/common/service/storage.service';

/**
 * The configuration interface for the {@link DfoCommonModule}
 */
export interface CoreConfig {

  /**
   * The backend api url
   */
  backendApi: string;

  /** disable to click on backdrop is cancel / close the dialog */
  disableClose?: boolean;

  /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
  width?: number | string;
  /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
  height?: number | string;
  /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
  minWidth?: number | string;
  /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
  minHeight?: number | string;
  /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
  maxWidth?: number | string;
  /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
  maxHeight?: number | string;
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class DfoCommonModule {
  static forRoot(storage: Storage, config: CoreConfig): ModuleWithProviders<DfoCommonModule> {
    return {
      ngModule: DfoCommonModule,
      providers: [
        {
          provide: STORAGE_TOKEN,
          useValue: storage,
        },
        {
          provide: BACKEND_CONFIG,
          useValue: config.backendApi,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: BackendService,
          multi: true,
        },
        {
          provide: DialogConfig,
          useValue: new DialogConfig({
            disableClose: config.disableClose,
            width: config.width,
            height: config.height,
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight,
          }),
        }
      ]
    };
  }

}
