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


    public create(params: Item): BackendResponse<{ data: Item }> {
        return this.http.post(API_ROUTES.ITEM, params);
    }
    public update(params: Item,id:number): BackendResponse<{ data: Item }> {
      return this.http.put(API_ROUTES.ITEM+'/'+id, params);
   }
   public delete(id:number): BackendResponse<{ data: Item }> {
    return this.http.delete(API_ROUTES.ITEM+'/'+id);
 }
    public get(): BackendResponse<{ data: Item []}> {
      return this.http.get(API_ROUTES.ITEM);
  }
}
