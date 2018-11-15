import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../../common/core/types/backend-response';
import { API_ROUTES } from './api-routes.enum';
import { Item } from './item';

@Injectable({
    providedIn: 'root'
})
export class ApiItemService {
    constructor(private http: AppHttpClient) {}


    public create(params: Item): BackendResponse<{ data: any }> {
        return this.http.post(API_ROUTES.ITEM, params);
    }
    public get(): BackendResponse<{ data: any }> {
      return this.http.get(API_ROUTES.ITEM);
  }
}
