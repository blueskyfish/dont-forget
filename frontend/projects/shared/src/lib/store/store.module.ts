import { ObserversModule } from '@angular/cdk/observers';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { StateClass } from '@ngxs/store/internals';
import { environment } from 'src/environments/environment';
import { ERROR_TOKEN, ErrorState } from './error';
import { GatewayState } from './gateway';
import { LAYOUT_TOKEN, LayoutState, MediaQueryService } from './layout';
import { RouteHandlerService } from './route-handler.service';
import { USER_TOKEN, UserState } from './user';

const states: StateClass[] = [
  ErrorState,
  GatewayState,
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
