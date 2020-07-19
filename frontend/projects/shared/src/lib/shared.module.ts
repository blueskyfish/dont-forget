import { NgModule } from '@angular/core';
import { DfoBackendModule } from 'projects/shared/src/lib/backend';
import { DfoCommonModule } from 'projects/shared/src/lib/common/common.module';
import { DfoElementsModule } from 'projects/shared/src/lib/elements/elements.module';
import { DfoLoginModule } from 'projects/shared/src/lib/login';
import { DfoRegisterModule } from 'projects/shared/src/lib/register';
import { DfoStoreModule } from 'projects/shared/src/lib/store/store.module';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [],
  imports: [
    DfoCommonModule.forRoot(localStorage, {
      backendApi: environment.backendApi,
      disableClose: false, // tab on backdrop is cancel the dialog
    }),
    DfoBackendModule.forRoot({
      rootUrl: environment.backendApi,
    }),
    DfoStoreModule,
    DfoElementsModule,
    DfoLoginModule,
    DfoRegisterModule,
  ],
  exports: [
    DfoBackendModule,
    DfoStoreModule,
    DfoElementsModule,
    DfoLoginModule,
    DfoRegisterModule,
  ]
})
export class DfoSharedModule { }
