import { Injectable } from '@angular/core';

import { Item } from './item';
import { Orders } from '../orders/orders';
import { BackendResponse } from '../../common/core/types/backend-response';
import { AppHttpClient } from '../../common/core/http/app-http-client.service';
import { API_ROUTES } from './api-routes.enum';

@Injectable({
    providedIn: 'root'
})
export class ApiPosService {

    constructor(private http: AppHttpClient) {

    }


    public createOrder(params: Orders): BackendResponse<{ data: Item }> {
        return this.http.post(API_ROUTES.ORDER, params);
    }

//     public update(params: Item,id:number): BackendResponse<{ data: Item }> {
//       return this.http.put(API_ROUTES.ITEM+'/'+id, params);
//    }
//    public delete(params:any): BackendResponse<{ data: Item[] }> {
//     return this.http.post(API_ROUTES.DELETE,params);
//  }
//     public get(): BackendResponse<{ data: Item []}> {
//       return this.http.get(API_ROUTES.ITEM);
//   }

}
