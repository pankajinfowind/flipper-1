import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../../common/core/types/backend-response';
import { API_ROUTES } from './api-routes.enum';
import { Insurance } from './insurance';

@Injectable({
    providedIn: 'root'
})
export class ApiInsuranceService {
    constructor(private http: AppHttpClient) {}


    public create(params: Insurance): BackendResponse<{ data: any }> {
        return this.http.post(API_ROUTES.INSURANCES, params);
    }
    public get(): BackendResponse<{ data: any }> {
      return this.http.get(API_ROUTES.INSURANCES);
  }
  public getBusinessInsurance(): BackendResponse<{ data: any }> {
    return this.http.get(API_ROUTES.BUSINESS_INSURANCES);
}
public attachInsurance(params: any): BackendResponse<{ data: any }> {
  return this.http.post(API_ROUTES.ATTACH_INSURANCES, params);
}

}
