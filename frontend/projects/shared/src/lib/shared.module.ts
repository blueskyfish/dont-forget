import { NgModule } from '@angular/core';
import { BackendModule } from 'projects/shared/src/lib/backend';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [],
  imports: [
    BackendModule.forRoot({
      rootUrl: environment.backendApi,
    }),
  ],
  exports: [
    BackendModule,
  ]
})
export class SharedModule { }
