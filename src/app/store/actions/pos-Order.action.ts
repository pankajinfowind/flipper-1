import { Orders } from '../../orders/orders';
import {OrdersApiIndexParams} from '../model/pos-order-state-model';
import { Customer } from '../../customers/customer';
import { Invoice } from '../../invoices/invoice';

export class LoadOrderEntries implements LoadOrderEntriesAction{
  static readonly type = '[ORDER] Load Order Entries';
  constructor(public queryParams: OrdersApiIndexParams = {}){ }
}
//CurrentOrder
export class CurrentOrder implements LoadOrderEntriesAction{
  static readonly type = '[ORDER] Load CurrentOrder Entries';
  constructor(public queryParams: OrdersApiIndexParams = {}){ }
}
export class LoadCurrentOrder implements LoadOrderEntriesAction{
  static readonly type = '[ORDER] Load Current Order Entries';
  constructor(public order: Orders){ }
}

export class LoadMoreOrderEntries implements LoadOrderEntriesAction{
  static readonly type = '[ORDER] Load More Order Entries';
  public loadMore = true;
  constructor(public queryParams: OrdersApiIndexParams = {}){

    }
}

export class OpenPosOrder implements OrderIdAction{
  static readonly type = '[ORDER] Open Order Entries';
  constructor(public itemId:null ){  }

}
export class CustomerOrder implements CustomerAction{
  static readonly type = '[ORDER] Customer Order Entries';
  constructor(public customer:Customer ){  }

}
export class CreateInvoice implements InvoiceAction{
  static readonly type = '[ORDER] Create Order Invoice';
  constructor(public invoice:Invoice ){
   }

}

export class InvoiceDetails implements InvoiceAction{
  static readonly type = '[ORDER] Invoice Details';
  constructor(public invoice:Invoice ){
   }

}


export interface LoadOrderEntriesAction {
  queryParams?: OrdersApiIndexParams;
  order?: Orders;
  loadMore?: boolean;
  type?:string;
  itemId?:number;
}
export interface OrderIdAction {
  itemId?:number;
}
export interface OrderAction {
  order?: Orders;
}

export interface CustomerAction {
  customer?: Customer;
}
export interface InvoiceAction {
  invoice?: Invoice;
}
//Invoice
