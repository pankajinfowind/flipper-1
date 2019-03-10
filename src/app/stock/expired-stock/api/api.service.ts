import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../common/core/types/pagination-response';
import { AppHttpClient } from '../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../common/core/types/backend-response';
import { StockExpired } from './expired-stock';
import { API_ROUTES_EXPITEDITEM } from './api-routes.enum';
export interface TAXRATEEntriesPaginationResponse extends PaginationResponse<StockExpired> {
  expiredStock?: StockExpired;
}
@Injectable({
    providedIn: 'root'
})
export class ApiExpiredItemService {
    constructor(private http: AppHttpClient) {}


  // public create(params: StockExpired): BackendResponse<{ data: any }> {
  //       return this.http.post(API_ROUTES_EXPITEDITEM.EXPITEDITEM_ALL, params);
  //   }
  public getAllExpiredItems(branch_id:number): BackendResponse<{ expiredStock: StockExpired[] }> {
      return this.http.get(API_ROUTES_EXPITEDITEM.EXPITEDITEM_ALL+'/'+branch_id);
  }
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
