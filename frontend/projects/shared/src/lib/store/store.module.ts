import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { StateClass } from '@ngxs/store/internals';
import { ErrorState } from 'projects/shared/src/lib/store/error';
import { UserState } from 'projects/shared/src/lib/store/user/user.state';
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
