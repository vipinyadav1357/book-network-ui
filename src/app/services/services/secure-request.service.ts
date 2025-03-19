/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { secure } from '../fn/secure-request/secure';
import { Secure$Params } from '../fn/secure-request/secure';

@Injectable({ providedIn: 'root' })
export class SecureRequestService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `secure()` */
  static readonly SecurePath = '/api/vip/v2/secure';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `secure()` instead.
   *
   * This method doesn't expect any request body.
   */
  secure$Response(params?: Secure$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return secure(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `secure$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  secure(params?: Secure$Params, context?: HttpContext): Observable<string> {
    return this.secure$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
