/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DfoBaseService } from '../dfo-base-service';
import { DfoBackendConfig } from '../dfo-backend-config';
import { DfoHttpResponse } from '../dfo-http-response';
import { DfoRequestBuilder } from '../dfo-request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DfoAbout } from '../models/dfo-about';
import { DfoAlive } from '../models/dfo-alive';

@Injectable({
  providedIn: 'root',
})
export class DfoSystemService extends DfoBaseService {
  constructor(
    config: DfoBackendConfig,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getHello
   */
  static readonly GetHelloPath = '/';

  /**
   * Get hello world
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHello()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHello$Response(params?: {

    /**
     * Your Name (max 20 signs)
     */
    name?: string;

  }): Observable<DfoHttpResponse<string>> {

    const rb = new DfoRequestBuilder(this.rootUrl, DfoSystemService.GetHelloPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as DfoHttpResponse<string>;
      })
    );
  }

  /**
   * Get hello world
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHello$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHello(params?: {

    /**
     * Your Name (max 20 signs)
     */
    name?: string;

  }): Observable<string> {

    return this.getHello$Response(params).pipe(
      map((r: DfoHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation alive
   */
  static readonly AlivePath = '/alive';

  /**
   * Get alive entity from the backend
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alive()` instead.
   *
   * This method doesn't expect any request body.
   */
  alive$Response(params?: {

  }): Observable<DfoHttpResponse<DfoAlive>> {

    const rb = new DfoRequestBuilder(this.rootUrl, DfoSystemService.AlivePath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as DfoHttpResponse<DfoAlive>;
      })
    );
  }

  /**
   * Get alive entity from the backend
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `alive$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  alive(params?: {

  }): Observable<DfoAlive> {

    return this.alive$Response(params).pipe(
      map((r: DfoHttpResponse<DfoAlive>) => r.body as DfoAlive)
    );
  }

  /**
   * Path part for operation getAbout
   */
  static readonly GetAboutPath = '/about';

  /**
   * Get the about information
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAbout()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAbout$Response(params?: {

  }): Observable<DfoHttpResponse<DfoAbout>> {

    const rb = new DfoRequestBuilder(this.rootUrl, DfoSystemService.GetAboutPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as DfoHttpResponse<DfoAbout>;
      })
    );
  }

  /**
   * Get the about information
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAbout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAbout(params?: {

  }): Observable<DfoAbout> {

    return this.getAbout$Response(params).pipe(
      map((r: DfoHttpResponse<DfoAbout>) => r.body as DfoAbout)
    );
  }

}
