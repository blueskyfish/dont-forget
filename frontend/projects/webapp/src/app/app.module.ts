import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DfoSharedModule } from 'projects/shared/src/lib/shared.module';
import { httpLoaderFactory } from 'projects/webapp/src/app/app-config';
import { DfoRoutingModule } from 'projects/webapp/src/app/routing.module';
import { tap } from 'rxjs/operators';
import { GatewayService } from '../../../shared/src/lib/gateway/gateway.service';
import { AppComponent } from './app.component';

export function gatewaySetup(gateway: GatewayService) {
  console.log('[Gateway] Setup');
  gateway.getMessage$()
    .pipe(
      tap(ev => {
        if (ev.event === 'dfo.users') {
          gateway.send('dfo.ticker', 'Hallo');
          return;
        }
        if (ev.event === 'dfo.ticker') {
          console.log('Ticker Result =>', ev.data);
        }
      })
    )
    .subscribe(data => console.log('[Gateway]: data =>', data));
  return () => {};
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    MatIconModule,

    DfoSharedModule,
    DfoRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: gatewaySetup,
      deps: [GatewayService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) {
    this.initializeIcons();
    this.initialTranslate();
  }


  private initialTranslate(): void {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  private initializeIcons(): void {
    this.iconRegistry.addSvgIconSet(this.sanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
