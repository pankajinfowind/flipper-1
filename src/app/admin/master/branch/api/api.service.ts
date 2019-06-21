import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../../../common/core/http/app-http-client.service';
import { Branch } from './branch';
import { BackendResponse } from '../../../../common/core/types/backend-response';
import { API_ROUTES_BRANCH } from './api-routes.enum';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../../common/core/types/pagination-response';
export interface BranchEntriesPaginationResponse extends PaginationResponse<Branch> {
  Branch?: Branch;
}
@Injectable({
    providedIn: 'root'
})
export class ApiBranchService {
    constructor(private http: AppHttpClient) {}



    public create(params: Branch): Observable<Branch> {
      return this.http.post(API_ROUTES_BRANCH.BRANCH, params);
  }
  public get(): BackendResponse<{ branches: Branch[] }> {
      return this.http.get(API_ROUTES_BRANCH.BRANCH);
  }

 
 public update(id:number,params: Branch): Observable<Branch> {
  return this.http.put(API_ROUTES_BRANCH.BRANCH+'/'+id, params);
}
 public delete(id:number): BackendResponse<{ data: Branch }> {
  return this.http.delete(API_ROUTES_BRANCH.BRANCH+'/'+id);
}

public deleteMultiple(ids: number[]) {
  return this.http.delete(API_ROUTES_BRANCH.DELETE_MULTIPLE, {ids});
}
public switchBranch(params: any): Observable<any> {
  return this.http.post(API_ROUTES_BRANCH.BRANCH_SWITCH, params);
}
}
