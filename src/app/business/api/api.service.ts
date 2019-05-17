import { Injectable } from '@angular/core';
import { BackendResponse } from '../../common/core/types/backend-response';
import { PaginatedBackendResponse } from '../../common/core/types/paginated-backend-response';
import { API_ROUTES } from './api-routes.enum';
import { AppHttpClient } from '../../common/core/http/app-http-client.service';
import { Business } from './business';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: AppHttpClient) {}


    public create(params: Business): BackendResponse<{ data: any }> {
        return this.http.post(API_ROUTES.BUSINESS, params);
    }
    public update(params: Business,id:number): BackendResponse<{ data: any }> {
      return this.http.put(API_ROUTES.BUSINESS+'/'+id, params);
   }

}
