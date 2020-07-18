import { NgModule } from '@angular/core';
import { DfoBackendModule } from 'projects/shared/src/lib/backend';
import { DfoCommonModule } from 'projects/shared/src/lib/common/common.module';
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
  ],
  exports: [
    DfoBackendModule,
    DfoStoreModule,
  ]
})
export class DfoSharedModule { }
