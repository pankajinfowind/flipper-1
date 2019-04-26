import { Injectable } from '@angular/core';
import { Orders } from '../../orders';
import { PaginationResponse } from '../../../common/core/types/pagination-response';
import { AppHttpClient } from '../../../common/core/http/app-http-client.service';
import { OrdersApiIndexParams } from '../../../store/model/pos-order-state-model';
import { Observable } from 'rxjs';
import { Invoice } from '../../../invoices/invoice';
export interface OrderEntriesPaginationResponse extends PaginationResponse<Orders> {
  orders?: Orders[];
}

export interface StockEntriesPaginationResponse extends PaginationResponse<Orders> {
  stocks?: Orders[];
}

@Injectable({
    providedIn: 'root'
})
export class ApiOrderService {

    constructor(private http: AppHttpClient) {

    }

    public getEntries(params: OrdersApiIndexParams = {}): Observable<OrderEntriesPaginationResponse> {
      return this.http.get(params.url, params);
    }
    public getCurrentOrder(): Observable<Orders> {
      return this.http.get('order/'+parseInt(localStorage.getItem('active_branch')));
    }
    public createInvoice(params: Invoice = {}): Observable<Invoice> {
      return this.http.post('invoice', params);
    }


}
