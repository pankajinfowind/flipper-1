import { Injectable } from '@angular/core';

import { API_ROUTES_REASON } from './api-routes.enum';
import { Observable } from 'rxjs';
import { Reason } from './reason';
import { PaginationResponse } from '../../../common/core/types/pagination-response';
import { AppHttpClient } from '../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../common/core/types/backend-response';
export interface ReasonEntriesPaginationResponse extends PaginationResponse<Reason> {
  Reason?: Reason;
}
@Injectable({
    providedIn: 'root'
})
export class ApiReasonService {
    constructor(private http: AppHttpClient) {}


  public create(params: Reason): Observable<Reason> {
        return this.http.post(API_ROUTES_REASON.REASON, params);
    }
  public get(): BackendResponse<{ Reasonies: Reason[] }> {
      return this.http.get(API_ROUTES_REASON.REASON);
  }

  public update(id:number,params: Reason):  Observable<Reason> {
    return this.http.put(API_ROUTES_REASON.REASON+'/'+id, params);
 }
 public delete(id:number): BackendResponse<{ data: Reason }> {
  return this.http.delete(API_ROUTES_REASON.REASON+'/'+id);
}
public deleteMultiple(ids: number[]) {
  return this.http.delete(API_ROUTES_REASON.DELETE_MULTIPLE, {ids});
}
}
