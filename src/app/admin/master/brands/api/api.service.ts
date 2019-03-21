import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../../../common/core/http/app-http-client.service';
import { Brand } from './brand';
import { BackendResponse } from '../../../../common/core/types/backend-response';
import { API_ROUTES_BRAND } from './api-routes.enum';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../../common/core/types/pagination-response';
export interface BrandEntriesPaginationResponse extends PaginationResponse<Brand> {
  brand?: Brand;
}
@Injectable({
    providedIn: 'root'
})
export class ApiBrandService {
    constructor(private http: AppHttpClient) {}


  public create(params: Brand): Observable<Brand> {
        return this.http.post(API_ROUTES_BRAND.BRAND, params);
    }
  public get(): BackendResponse<{ brandies: Brand[] }> {
      return this.http.get(API_ROUTES_BRAND.BRAND);
  }

  public update(id:number,params: Brand): Observable<Brand> {
    return this.http.put(API_ROUTES_BRAND.BRAND+'/'+id, params);
 }
 public delete(id:number): BackendResponse<{ data: Brand }> {
  return this.http.delete(API_ROUTES_BRAND.BRAND+'/'+id);
}
public deleteMultiple(ids: number[]) {
  return this.http.delete(API_ROUTES_BRAND.DELETE_MULTIPLE, {ids});
}
}
