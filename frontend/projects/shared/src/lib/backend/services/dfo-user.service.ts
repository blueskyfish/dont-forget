/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DfoBaseService } from '../dfo-base-service';
import { DfoBackendConfig } from '../dfo-backend-config';
import { DfoHttpResponse } from '../dfo-http-response';
import { DfoRequestBuilder } from '../dfo-request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DfoChangePasswordPayload } from '../models/dfo-change-password-payload';
import { DfoLoginPayload } from '../models/dfo-login-payload';
import { DfoLoginUser } from '../models/dfo-login-user';
import { DfoRegisterPayload } from '../models/dfo-register-payload';
import { DfoUserInfo } from '../models/dfo-user-info';

@Injectable({
  providedIn: 'root',
})
export class DfoUserService extends DfoBaseService {
  constructor(
    config: DfoBackendConfig,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/login';

  /**
   * The login of an user. In case of success the result is the user information and his authentication token
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: {
      body: DfoLoginPayload
  }): Observable<DfoHttpResponse<DfoLoginUser>> {

    const rb = new DfoRequestBuilder(this.rootUrl, DfoUserService.LoginPath, 'put');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as DfoHttpResponse<DfoLoginUser>;
      })
    );
  }

  /**
   * The login of an user. In case of success the result is the user information and his authentication token
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: {
      body: DfoLoginPayload
  }): Observable<DfoLoginUser> {

    return this.login$Response(params).pipe(
      map((r: DfoHttpResponse<DfoLoginUser>) => r.body as DfoLoginUser)
    );
  }

  /**
   * Path part for operation register
   */
  static readonly RegisterPath = '/register';

  /**
   * A user try to register. In case of success the result is the user information and his authentication token
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: {
      body: DfoRegisterPayload
  }): Observable<DfoHttpResponse<DfoLoginUser>> {

    const rb = new DfoRequestBuilder(this.rootUrl, DfoUserService.RegisterPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as DfoHttpResponse<DfoLoginUser>;
      })
    );
  }

  /**
   * A user try to register. In case of success the result is the user information and his authentication token
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: {
      body: DfoRegisterPayload
  }): Observable<DfoLoginUser> {

    return this.register$Response(params).pipe(
      map((r: DfoHttpResponse<DfoLoginUser>) => r.body as DfoLoginUser)
    );
  }

  /**
   * Path part for operation getInfo
   */
  static readonly GetInfoPath = '/user/info';

  /**
   * Get the information of the current user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInfo$Response(params?: {

  }): Observable<DfoHttpResponse<DfoUserInfo>> {

    const rb = new DfoRequestBuilder(this.rootUrl, DfoUserService.GetInfoPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as DfoHttpResponse<DfoUserInfo>;
      })
    );
  }

  /**
   * Get the information of the current user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInfo(params?: {

  }): Observable<DfoUserInfo> {

    return this.getInfo$Response(params).pipe(
      map((r: DfoHttpResponse<DfoUserInfo>) => r.body as DfoUserInfo)
    );
  }

  /**
   * Path part for operation changePassword
   */
  static readonly ChangePasswordPath = '/user/password';

  /**
   * Chnage the password of the current user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: {
      body: DfoChangePasswordPayload
  }): Observable<DfoHttpResponse<DfoUserInfo>> {

    const rb = new DfoRequestBuilder(this.rootUrl, DfoUserService.ChangePasswordPath, 'put');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as DfoHttpResponse<DfoUserInfo>;
      })
    );
  }

  /**
   * Chnage the password of the current user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: {
      body: DfoChangePasswordPayload
  }): Observable<DfoUserInfo> {

    return this.changePassword$Response(params).pipe(
      map((r: DfoHttpResponse<DfoUserInfo>) => r.body as DfoUserInfo)
    );
  }

}
