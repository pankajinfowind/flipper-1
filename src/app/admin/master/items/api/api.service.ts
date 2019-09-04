import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../../common/core/types/backend-response';
import { Item } from './item';
import { API_ROUTES_ITEMS } from './api-routes.enum';

@Injectable({
    providedIn: 'root'
})
export class ApiItemService {

    constructor(private http: AppHttpClient) {

    }


    public create(params: Item): BackendResponse<Item> {
        return this.http.post(API_ROUTES_ITEMS.ITEM, params);
    }
    public update(params: Item, id: number): BackendResponse<Item> {
        return this.http.put(API_ROUTES_ITEMS.ITEM + '/' + id, params);
    }
    public delete(params: any): BackendResponse<boolean> {
        return this.http.post(API_ROUTES_ITEMS.DELETE, params);
    }
    public get(): BackendResponse<Item[]> {
        return this.http.get(API_ROUTES_ITEMS.ITEM);
    }
    public deleteMultiple(ids: number[]) {
      return this.http.delete(API_ROUTES_ITEMS.DELETE_MULTIPLE, {ids});
    }
    public filterItem(params): BackendResponse<any> {
        return this.http.get("filter-item", params);
    }
   
}
