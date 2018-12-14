import { Injectable } from '@angular/core';

import { Item } from './item';
import { BackendResponse } from '../../common/core/types/backend-response';
import { AppHttpClient } from '../../common/core/http/app-http-client.service';
import { API_ROUTES } from './api-routes.enum';
import { Orders } from '../../orders/orders';
import { OrderItems } from '../cart/order_items';

@Injectable({
    providedIn: 'root'
})
export class ApiPosService {

    constructor(private http: AppHttpClient) {

    }


    public createOrder(params: Orders): BackendResponse<{ data: Orders }> {
        return this.http.post(API_ROUTES.ORDER, params);
    }
    public updateOrderItem(params: Orders): BackendResponse<{ data: OrderItems }> {
      return this.http.post(API_ROUTES.ORDERITEM, params);
  }
  public deleteOrderedItem(id): BackendResponse<{ data: OrderItems }> {
        return this.http.delete(API_ROUTES.DELETEORDEREDITEM+'/'+id);
     }
    public updateOrder(params: Orders,id:number): BackendResponse<{ data: Orders[] }> {
      return this.http.put(API_ROUTES.ORDER+'/'+id, params);
   }
//    public delete(params:any): BackendResponse<{ data: Item[] }> {
//     return this.http.post(API_ROUTES.DELETE,params);
//  }
//     public get(): BackendResponse<{ data: Item []}> {
//       return this.http.get(API_ROUTES.ITEM);
//   }

}
