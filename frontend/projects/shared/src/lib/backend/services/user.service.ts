/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { BackendConfig } from '../backend-config';
import { BackendResponse } from '../backend-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ChangePasswordPayload } from '../models/change-password-payload';
import { LoginPayload } from '../models/login-payload';
import { LoginUser } from '../models/login-user';
import { RegisterPayload } from '../models/register-payload';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: BackendConfig,
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
      body: LoginPayload
  }): Observable<BackendResponse<LoginUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.LoginPath, 'put');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BackendResponse<LoginUser>;
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
      body: LoginPayload
  }): Observable<LoginUser> {

    return this.login$Response(params).pipe(
      map((r: BackendResponse<LoginUser>) => r.body as LoginUser)
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
      body: RegisterPayload
  }): Observable<BackendResponse<LoginUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.RegisterPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BackendResponse<LoginUser>;
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
      body: RegisterPayload
  }): Observable<LoginUser> {

    return this.register$Response(params).pipe(
      map((r: BackendResponse<LoginUser>) => r.body as LoginUser)
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

  }): Observable<BackendResponse<UserInfo>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.GetInfoPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BackendResponse<UserInfo>;
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

  }): Observable<UserInfo> {

    return this.getInfo$Response(params).pipe(
      map((r: BackendResponse<UserInfo>) => r.body as UserInfo)
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
      body: ChangePasswordPayload
  }): Observable<BackendResponse<UserInfo>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ChangePasswordPath, 'put');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BackendResponse<UserInfo>;
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
      body: ChangePasswordPayload
  }): Observable<UserInfo> {

    return this.changePassword$Response(params).pipe(
      map((r: BackendResponse<UserInfo>) => r.body as UserInfo)
    );
  }

}
