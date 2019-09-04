import { Injectable } from '@angular/core';
import { API_ROUTES_USER } from './api-routes.enum';
import { Observable } from 'rxjs';
import { User } from '../../../common/core/types/models/User';
import { PaginationResponse } from '../../../common/core/types/pagination-response';
import { AppHttpClient } from '../../../common/core/http/app-http-client.service';
import { BackendResponse } from '../../../common/core/types/backend-response';
export interface BranchEntriesPaginationResponse extends PaginationResponse<User> {
  user?: User;
}
@Injectable({
    providedIn: 'root'
})
export class ApiUserService {
    constructor(private http: AppHttpClient) {}



    public create(params: User): Observable<User> {
      return this.http.post(API_ROUTES_USER.USER, params);
  }
  public get(): BackendResponse<{ branches: User[] }> {
      return this.http.get(API_ROUTES_USER.USER);
  }

 
 public update(id:number,params: User): Observable<User> {
  return this.http.put(API_ROUTES_USER.USER+'/'+id, params);
}
 public delete(id:number): BackendResponse<{ data: User }> {
  return this.http.delete(API_ROUTES_USER.USER+'/'+id);
}

public deleteMultiple(ids: number[]) {
  return this.http.delete(API_ROUTES_USER.DELETE_MULTIPLE, {ids});
}

}
