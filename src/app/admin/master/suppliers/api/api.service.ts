import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../../common/core/types/backend-response';
import { API_ROUTES } from './api-routes.enum';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../../common/core/types/pagination-response';
import { Supplier } from './supplier';
export interface SupplierEntriesPaginationResponse extends PaginationResponse<Supplier> {
  supplier?: Supplier;
}
@Injectable({
    providedIn: 'root'
})
export class ApiSupplierService {
    constructor(private http: AppHttpClient) {}


  public create(params: Supplier): Observable<Supplier> {
        return this.http.post(API_ROUTES.SUPPLIER, params);
    }
  public get(): BackendResponse<{ Supplieries: Supplier[] }> {
      return this.http.get(API_ROUTES.SUPPLIER);
  }
 
  public update(id:number,params: Supplier): Observable<Supplier> {
    return this.http.put(API_ROUTES.SUPPLIER+'/'+id, params);
 }

public deleteMultiple(ids: number[]) {
  return this.http.delete(API_ROUTES.DELETE_MULTIPLE, {ids});
}
}
