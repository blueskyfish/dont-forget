/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { BackendConfig } from '../backend-config';
import { BackendResponse } from '../backend-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { About } from '../models/about';
import { Alive } from '../models/alive';

@Injectable({
  providedIn: 'root',
})
export class SystemService extends BaseService {
  constructor(
    config: BackendConfig,
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

  }): Observable<BackendResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, SystemService.GetHelloPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BackendResponse<string>;
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
      map((r: BackendResponse<string>) => r.body as string)
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

  }): Observable<BackendResponse<Alive>> {

    const rb = new RequestBuilder(this.rootUrl, SystemService.AlivePath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BackendResponse<Alive>;
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

  }): Observable<Alive> {

    return this.alive$Response(params).pipe(
      map((r: BackendResponse<Alive>) => r.body as Alive)
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

  }): Observable<BackendResponse<About>> {

    const rb = new RequestBuilder(this.rootUrl, SystemService.GetAboutPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BackendResponse<About>;
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

  }): Observable<About> {

    return this.getAbout$Response(params).pipe(
      map((r: BackendResponse<About>) => r.body as About)
    );
  }

}
