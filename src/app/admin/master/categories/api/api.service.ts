import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../../../common/core/http/app-http-client.service';
import { Category } from './category';
import { BackendResponse } from '../../../../common/core/types/backend-response';
import { API_ROUTES } from './api-routes.enum';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../../common/core/types/pagination-response';
export interface CategoryEntriesPaginationResponse extends PaginationResponse<Category> {
  category?: Category;
}
@Injectable({
    providedIn: 'root'
})
export class ApiCategoryService {
    constructor(private http: AppHttpClient) {}


  public create(params: Category): Observable<Category> {
        return this.http.post(API_ROUTES.CATEGORY, params);
    }
  public get(): BackendResponse<{ categoryies: Category[] }> {
      return this.http.get(API_ROUTES.CATEGORY);
  }
  public getCategories(): Observable<CategoryEntriesPaginationResponse> {
    return this.http.get(API_ROUTES.CATEGORY);
  }
  public update(id:number,params: Category): Observable<Category> {
    return this.http.put(API_ROUTES.CATEGORY+'/'+id, params);
 }
 public delete(id:number): BackendResponse<{ data: Category }> {
  return this.http.delete(API_ROUTES.CATEGORY+'/'+id);
}

public deleteMultiple(ids: number[]) {
  return this.http.delete(API_ROUTES.DELETE_MULTIPLE, {ids});
}
}
