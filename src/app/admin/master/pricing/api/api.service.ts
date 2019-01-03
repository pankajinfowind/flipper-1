import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../../../common/core/http/app-http-client.service';
import { Pricing } from './pricing';
import { BackendResponse } from '../../../../common/core/types/backend-response';
import { API_ROUTES_PRICING } from './api-routes.enum';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../../common/core/types/pagination-response';
export interface PricingEntriesPaginationResponse extends PaginationResponse<Pricing> {
  pricing?: Pricing;
}
@Injectable({
    providedIn: 'root'
})
export class ApiPricingService {
    constructor(private http: AppHttpClient) {}


  public create(params: Pricing): BackendResponse<{ data: any }> {
        return this.http.post(API_ROUTES_PRICING.PRICING, params);
    }
  public get(): BackendResponse<{ Pricingies: Pricing[] }> {
      return this.http.get(API_ROUTES_PRICING.PRICING);
  }

  public update(params: Pricing,id:number): BackendResponse<{ data: Pricing }> {
    return this.http.put(API_ROUTES_PRICING.PRICING+'/'+id, params);
 }
 public delete(id:number): BackendResponse<{ data: Pricing }> {
  return this.http.delete(API_ROUTES_PRICING.PRICING+'/'+id);
}
}
