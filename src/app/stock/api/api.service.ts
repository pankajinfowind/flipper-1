import { Injectable } from '@angular/core';
import { API_ROUTES } from './api-routes.enum';
import { BackendResponse } from '../../common/core/types/backend-response';
import { AppHttpClient } from '../../common/core/http/app-http-client.service';
import { Observable } from 'rxjs';
import { Stock } from './stock';

@Injectable({
    providedIn: 'root'
})
export class ApiStockService {
    constructor(private http: AppHttpClient) {}


    public create(params: any): Observable<Stock> {
        return this.http.post(API_ROUTES.STOCK, params);
    }
    public addOrRemoveExistingItem(params: any): BackendResponse<{ data: any }> {
      return this.http.post(API_ROUTES.ADD_OR_REMOVE_EXISTING_ITEM, params);
  }
  public update(params: any,id:number):  Observable<Stock> {
    return this.http.put(API_ROUTES.STOCK+'/'+id, params);
 }
 public delete(id:number):  Observable<Stock> {
  return this.http.delete(API_ROUTES.STOCK+'/'+id);
}

    public get(): BackendResponse<{ data: any }> {
      return this.http.get(API_ROUTES.STOCK);
    }
    public getStockByBranch(branch_id:number,status:string): BackendResponse<{ data: any }> {
      // here we can get stock available when status = 1 , damage(like expired by date(by stytem task) or branch mananger (can update the stock item damaged)) status= 3 and soldout  status=2
      return this.http.get(API_ROUTES.BRANCH_STOCK+'/'+branch_id+'/'+status);
    }
    public getNewStockItem(branch_id): BackendResponse<{ data: any []}> {
      return this.http.get(API_ROUTES.NEW_STOCK_ITEM+'/'+branch_id);
  }
  public deleteMultiple(ids: number[]) {
    return this.http.delete(API_ROUTES.DELETE_MULTIPLE, {ids});
  }
  public deleteMultipleStockMovement(ids: number[]) {
    return this.http.delete(API_ROUTES.DELETE_MULTIPLE_STOCKMOVEMENT, {ids});
  }
  public createStockOnBranch(params: Array<{item_id:number,branch_id:number,category_id:number}>): BackendResponse<{ data: any }> {
    return this.http.post(API_ROUTES.NEW_BRANCH_STOCKS, params);
}
    //new-item
}
