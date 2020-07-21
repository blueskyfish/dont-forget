import { ObserversModule } from '@angular/cdk/observers';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { StateClass } from '@ngxs/store/internals';
import { ERROR_TOKEN, ErrorState } from 'projects/shared/src/lib/store/error';
import { LAYOUT_TOKEN, LayoutState, MediaQueryService } from 'projects/shared/src/lib/store/layout';
import { RouteHandlerService } from 'projects/shared/src/lib/store/route-handler.service';
import { USER_TOKEN, UserState } from 'projects/shared/src/lib/store/user';
import { environment } from 'src/environments/environment';

const states: StateClass[] = [
  ErrorState,
  LayoutState,
  UserState,
]

// Noop handler for factory function
export function noop() {
  return function() {};
}

@NgModule({
  imports: [
    ObserversModule,

    NgxsModule.forRoot(states, {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: [USER_TOKEN, ERROR_TOKEN, LAYOUT_TOKEN],
      storage: StorageOption.SessionStorage,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'DFO',
      disabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: noop,
      deps: [RouteHandlerService, MediaQueryService],
      multi: true
    }
  ],
  exports: [
    NgxsModule,
  ]
})
export class DfoStoreModule {

}
