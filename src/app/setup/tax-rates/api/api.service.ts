import { Injectable } from '@angular/core';

import { API_ROUTES_TAXRATE } from './api-routes.enum';
import { Observable } from 'rxjs';
import { TAXRATE } from './tax-rate';
import { PaginationResponse } from '../../../common/core/types/pagination-response';
import { AppHttpClient } from '../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../common/core/types/backend-response';
export interface TAXRATEEntriesPaginationResponse extends PaginationResponse<TAXRATE> {
  TAXRATE?: TAXRATE;
}
@Injectable({
    providedIn: 'root'
})
export class ApiTaxRateService {
    constructor(private http: AppHttpClient) {}


  public create(params: TAXRATE):Observable<TAXRATE> {
        return this.http.post(API_ROUTES_TAXRATE.TAXRATE, params);
    }
  public get(): BackendResponse<{ TAXRATEies: TAXRATE[] }> {
      return this.http.get(API_ROUTES_TAXRATE.TAXRATE);
  }

  public update(id:number,params: TAXRATE): Observable<TAXRATE> {
    return this.http.put(API_ROUTES_TAXRATE.TAXRATE+'/'+id, params);
 }
 public delete(id:number): BackendResponse<{ data: TAXRATE }> {
  return this.http.delete(API_ROUTES_TAXRATE.TAXRATE+'/'+id);
}

public deleteMultiple(ids: number[]) {
  return this.http.delete(API_ROUTES_TAXRATE.DELETE_MULTIPLE, {ids});
}
}
