import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpErrorHandler } from "./errors/http-error-handler.service";
import { catchError, filter, map } from "rxjs/operators";
import { Settings } from "../config/settings.service";
import { AppConfig } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AppHttpClient {
  public prefix = "secure";
  headers = new HttpHeaders({'Accept':'application/json'});
  /**
   * AppHttpClient Constructor.
   */
  constructor(
    protected httpClient: HttpClient,
    protected errorHandler: HttpErrorHandler,
    protected settings: Settings
  ) {}

  public get<T>(
    uri: string,
    params = {},
    options: object = {}
  ): Observable<T> | any {
    const httpParams = this.generateHttpParams(params);
    return this.httpClient
      .get<T>(this.prefixUri(uri), { params: httpParams, ...options })
      .pipe(catchError(err => this.errorHandler.handle(err, uri)));
  }

  public post<T>(uri: string, params: object = null): Observable<T> | any {
    params['_token']=this.settings.csrfToken;
    return this.httpClient
      .post<T>(this.prefixUri(uri), params,{headers:this.headers})
      .pipe(catchError(err => this.errorHandler.handle(err, uri)));
  }

  public put<T>(uri: string, params: object = {}): Observable<T> | any {
    params['_token']=this.settings.csrfToken;
    params = this.spoofHttpMethod(params, "PUT");
    return this.httpClient
      .post<T>(this.prefixUri(uri), params,{headers:this.headers})
      .pipe(catchError(err => this.errorHandler.handle(err, uri)));
  }

  public delete<T>(uri: string, params: object = {}): Observable<T> | any {
    params['_token']=this.settings.csrfToken;
    params = this.spoofHttpMethod(params, "DELETE");
    return this.httpClient
      .post<T>(this.prefixUri(uri), params)
      .pipe(catchError(err => this.errorHandler.handle(err, uri)));
  }

  /**
   * Prefix specified uri with backend API prefix.
   */
  private prefixUri(uri: string) {
    if (uri.indexOf("://") > -1) return uri;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      return AppConfig.url + this.prefix + "/" + uri;
    } else {
      return this.prefix + "/" + uri;
    }
  }

  /**
   * Generate http params for GET request.
   */
  private generateHttpParams(params: object | null) {
    let httpParams = new HttpParams();
    if (!params) return httpParams;

    Object.keys(params).forEach(key => {
      let value = params[key];
      if (value == null) value = "";
      httpParams = httpParams.append(key, value);
    });

    return httpParams;
  }

  /**
   * Spoof http method by adding '_method' to request params.
   */
  private spoofHttpMethod(
    params: object | FormData,
    method: "PUT" | "DELETE"
  ): object | FormData {
    if (params instanceof FormData) {
      (params as FormData).append("_method", method);
    } else {
      params["_method"] = method;
    }

    return params;
  }
}
