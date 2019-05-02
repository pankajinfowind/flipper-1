import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../common/core/types/pagination-response';
import { AppHttpClient } from '../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../common/core/types/backend-response';
import { StockExpired } from './expired-stock';
import { API_ROUTES_EXPITEDITEM } from './api-routes.enum';
import { StockApiIndexParams } from '../../../store/model/pos-stock-expired-state-model';
import { LocalStorage } from '../../../common/core/services/local-storage.service';
import { ExpirationSetting } from '../../../setup/expiration_setting/api/expiration_setting';
export interface StockEntriesPaginationResponse extends PaginationResponse<StockExpired> {
  stocks?: StockExpired[];
}
export interface ExpirationSettingEntriesPaginationResponse extends PaginationResponse<ExpirationSetting> {
  period?: ExpirationSetting[];
}
@Injectable({
    providedIn: 'root'
})
export class ApiExpiredItemService {
    constructor(private http: AppHttpClient,private localStorage: LocalStorage) {}


  public get(params: StockApiIndexParams = {}): Observable<StockEntriesPaginationResponse> {
      return this.http.get(this.localStorage.get('stockExpiredUrl'),params);
  }
  public getExpPeriod(): Observable<ExpirationSettingEntriesPaginationResponse> {
    return this.http.get('expiration_setting');
}
  expiration_setting
  public getBySearchExpiredItems(branch_id:number,from:Date,to:Date): BackendResponse<{ expiredStock: StockExpired[] }> {
    return this.http.get(API_ROUTES_EXPITEDITEM.EXPITEDITEM_SEARCHED+'/'+branch_id+'/'+from+'/'+to);
}
public getByPeriodExpiredItems(branch_id:number,num:number=0,type:string='today'): BackendResponse<{ expiredStock: StockExpired[] }> {
  return this.http.get(API_ROUTES_EXPITEDITEM.EXPITEDITEM_PERIODICAL+'/'+branch_id+'/'+num+'/'+type);
}


//   public update(params: StockExpired,id:number): BackendResponse<{ data: StockExpired }> {
//     return this.http.put(API_ROUTES_TAXRATE.TAXRATE+'/'+id, params);
//  }
//  public delete(id:number): BackendResponse<{ data: StockExpired }> {
//   return this.http.delete(API_ROUTES_TAXRATE.TAXRATE+'/'+id);
// }
}
