import { Injectable } from '@angular/core';

import { PaginationResponse } from '../../../common/core/types/pagination-response';
import { AppHttpClient } from '../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../common/core/types/backend-response';
import { ExpirationSetting } from './expiration_setting';
import { API_ROUTES_EXPIRATIONSETTING } from './api-routes.enum';
import { Observable } from 'rxjs';
export interface ExpirationSettingEntriesPaginationResponse extends PaginationResponse<ExpirationSetting> {
  expiration_setting?: ExpirationSetting;
}
@Injectable({
    providedIn: 'root'
})
export class ApiExpirationSettingService {
    constructor(private http: AppHttpClient) {}


  public create(params: ExpirationSetting): Observable<ExpirationSetting> {
        return this.http.post(API_ROUTES_EXPIRATIONSETTING.EXPIRATIONSETTING, params);
    }
  public get(): BackendResponse<{data:any}> {
      return this.http.get(API_ROUTES_EXPIRATIONSETTING.EXPIRATIONSETTING);
  }

  public update(id:number,params: ExpirationSetting): Observable<ExpirationSetting> {
    return this.http.put(API_ROUTES_EXPIRATIONSETTING.EXPIRATIONSETTING+'/'+id, params);
 }
 public delete(id:number): BackendResponse<{data:any}> {
  return this.http.delete(API_ROUTES_EXPIRATIONSETTING.EXPIRATIONSETTING+'/'+id);
}
public deleteMultiple(ids: number[]) {
  return this.http.delete(API_ROUTES_EXPIRATIONSETTING.DELETE_MULTIPLE, {ids});
}
}
