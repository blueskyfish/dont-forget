import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService, HTTP_AUTH_HEADER } from './auth.service';
import { BackendUtil } from './backend.util';

export const BACKEND_CONFIG: InjectionToken<string> = new InjectionToken<string>('bicycle.backend.config');

/**
 * The interceptor for the backend
 */
@Injectable({
  providedIn: 'root'
})
export class BackendService implements HttpInterceptor {

  private readonly backendApi: string;

  /**
   * Initialize the instance
   *
   * @param {string} backendApi the backend api url
   * @param {AuthService} authService the authorization service
   */
  constructor(
    @Inject(BACKEND_CONFIG) backendApi: string,
    private authService: AuthService
  ) {
    this.backendApi = BackendUtil.adjustBackendApi(backendApi);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isBackendCall = BackendUtil.isBackendUrl(this.backendApi, req.url);

    if (isBackendCall) {
      // show the loading indicator
      this.showLoading();
    }

    if (this.authService.isAuth && isBackendCall) {
      req = req.clone({
        setHeaders: this.createHeaders(),
      });
    }

    return next.handle(req)
      .pipe(
        tap(x => {
          if (isBackendCall) {
            // hide the loading indicator
            this.hideLoading();
          }
        })
      );
  }

  private createHeaders() {
    const headers = {};
    headers[HTTP_AUTH_HEADER] = this.authService.token;
    return headers;
  }

  private showLoading(): void {
    // TODO Redux show loading indicator
  }

  private hideLoading(): void {
    // TODO Redux hide loading indicator
  }
}
