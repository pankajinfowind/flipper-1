import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorsHeader {

      private auth_header: object;
      private cors_header: object;
      constructor() {
      }
      set authorizationHeader(auth_token) {
        this.auth_header = {
          headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : 'Bearer ' + auth_token
      }};
      }
      get authorizationHeader(): object {
        return this.auth_header;
      }
      set corshttpHeaders(method) {
       this.cors_header = {
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': method
              }
          };
      }
       get corshttpHeaders(): object {
        return this.cors_header;
       }
}
