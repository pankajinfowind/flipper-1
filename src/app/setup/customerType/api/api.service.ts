import { Injectable } from '@angular/core';
import { API_ROUTES_CUSTOMER_TYPE } from './api-routes.enum';
import { PaginationResponse } from '../../../common/core/types/pagination-response';
import { AppHttpClient } from '../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../common/core/types/backend-response';
import { CustomerType } from './CustomerType';
export interface CUSTOMER_TYPEEntriesPaginationResponse extends PaginationResponse<CustomerType> {
  customer_type?: CustomerType;
}
@Injectable({
    providedIn: 'root'
})
export class ApiCustomerTypeService {
    constructor(private http: AppHttpClient) {}


  public create(params: CustomerType): BackendResponse<{ data: any }> {
        return this.http.post(API_ROUTES_CUSTOMER_TYPE.CUSTOMER_TYPE, params);
    }
  public get(): BackendResponse<{ customer_type: CustomerType[] }> {
      return this.http.get(API_ROUTES_CUSTOMER_TYPE.CUSTOMER_TYPE);
  }

  public update(params: CustomerType,id:number): BackendResponse<{ data: CustomerType }> {
    return this.http.put(API_ROUTES_CUSTOMER_TYPE.CUSTOMER_TYPE+'/'+id, params);
 }
 public delete(id:number): BackendResponse<{ data: CustomerType }> {
  return this.http.delete(API_ROUTES_CUSTOMER_TYPE.CUSTOMER_TYPE+'/'+id);
}
}
