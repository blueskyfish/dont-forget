import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { StateClass } from '@ngxs/store/internals';
import { ERROR_TOKEN, ErrorState } from 'projects/shared/src/lib/store/error';
import { USER_TOKEN, UserState } from 'projects/shared/src/lib/store/user/user.state';
import { environment } from 'src/environments/environment';

const states: StateClass[] = [
  ErrorState,
  UserState,
]

@NgModule({
  imports: [

    NgxsModule.forRoot(states, {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: [USER_TOKEN, ERROR_TOKEN],
      storage: StorageOption.SessionStorage,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'DFO',
      disabled: environment.production,
    }),
  ],
  exports: [
    NgxsModule,
  ]
})
export class DfoStoreModule {

}
