import { HttpClient } from "@angular/common/http";

import { CorsHeader } from "./header";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Methods {
  private _header;
  constructor(private http: HttpClient, private header: CorsHeader) {}
  post(api, data: any, token = "") {
    const secure = token === "" ? false : true;
    const value = secure ? token : "POST";
    // return this.http.post<Response>(environment.url + api, data, this.headers(value, secure));
  }
  put(api, data: any, token = "") {
    const secure = token === "" ? false : true;
    const value = secure ? token : "PUT";
    // return this.http.put<Response>(environment.url + api, data, this.headers(value, secure));
  }
  patch(api, data, token = "") {
    const secure = token === "" ? false : true;
    const value = secure ? token : "PATCH";
    // return this.http.patch<Response>(environment.url + api, data, this.headers(value, secure));
  }
  get(api, token = "") {
    const secure = token === "" ? false : true;
    const value = secure ? token : "GET";
    // return this.http.get<any>(environment.url + api, this.headers(value, secure));
  }
  headers(value, secure) {
    if (secure) {
      this.header.authorizationHeader = value;
      return this.header.authorizationHeader;
    } else {
      this.header.corshttpHeaders = value;
      return this.header.corshttpHeaders;
    }
  }
}
