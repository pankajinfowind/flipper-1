import { Injectable } from '@angular/core';
import { CustomizeInvoice } from './customize-invoice';
import { Observable } from 'rxjs';
import { AppHttpClient } from '../../common/core/http/app-http-client.service';


@Injectable({
  providedIn: 'root'
})
export class ApiCustomizeInvoiceService {

  constructor(private http: AppHttpClient) {}

  public create(params: CustomizeInvoice): Observable<CustomizeInvoice> {
    return this.http.post('customize-invoice', params);
}
public update(id:number,params: CustomizeInvoice): Observable<CustomizeInvoice> {
  return this.http.put('customize-invoice'+'/'+id, params);
}
  public deleteMultiple(ids: number[]) {
    return this.http.delete('customize-invoices/delete-multiple', {ids});
  }
}
