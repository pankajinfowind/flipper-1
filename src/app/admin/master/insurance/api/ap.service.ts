import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../../common/core/types/backend-response';
import { Insurance } from './insurance';
import { API_ROUTES_INSURANCES } from './api-routes.enum';

@Injectable({
    providedIn: 'root'
})
export class ApiInsuranceService {
    constructor(private http: AppHttpClient) {}


    public create(params: Insurance): BackendResponse<{ data: any }> {
        return this.http.post(API_ROUTES_INSURANCES.INSURANCES, params);
    }
    public get(): BackendResponse<{ data: any }> {
      return this.http.get(API_ROUTES_INSURANCES.INSURANCES);
  }
  public getBusinessInsurance(): BackendResponse<{ data: any }> {
    return this.http.get(API_ROUTES_INSURANCES.BUSINESS_INSURANCES);
  }
  public attachInsurance(params: any): BackendResponse<{ data: Insurance[] }> {
    return this.http.post(API_ROUTES_INSURANCES.ATTACH_INSURANCES, params);
  }

  public update(params: Insurance,id:number): BackendResponse<{ data: Insurance }> {
    return this.http.put(API_ROUTES_INSURANCES.INSURANCES+'/'+id, params);
 }
 public delete(params: any): BackendResponse<{ data: Insurance[] }> {
  return this.http.post(API_ROUTES_INSURANCES.DETACH_INSURANCE,params);
}
}
