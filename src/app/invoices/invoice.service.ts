import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";;
import { PaginationResponse } from '../common/core/types/pagination-response';
import { HttpCacheClient } from '../common/core/http/http-cache-client';
import { Invoice } from './invoice';


@Injectable({
  providedIn: "root"
})
export class InvoiceService {
  ROOT_URL = "invoice";
  DELETE_MULTIPLE="invoices/delete-multiple";
  protected http: HttpCacheClient;
  constructor(
    protected injector: Injector,
  ) {
    this.http = this.injector.get(HttpCacheClient);
  }

  get(params): Observable<PaginationResponse<Invoice>> {

        return this.http.getWithCache(this.ROOT_URL,params);
  }
  create(invoice: Partial<Invoice>): Observable<Invoice> {
    return this.http.post(this.ROOT_URL, invoice);
}
  edit(invoice: Partial<Invoice>): Observable<Invoice> {
    return this.http.put<Invoice>(this.ROOT_URL, invoice);
  }
  public deleteMultiple(ids: number[]) {
    return this.http.delete(this.DELETE_MULTIPLE, {ids});
  }
}
