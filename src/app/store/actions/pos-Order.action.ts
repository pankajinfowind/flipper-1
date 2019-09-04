import { Orders } from '../../orders/orders';
import {OrdersApiIndexParams} from '../model/pos-order-state-model';
import { Customer } from '../../customers/customer';
import { Invoice } from '../../invoices/invoice';
import { OrderItems } from '../../pos/cart/order_items';

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
//UpdateCurrentOrder
export class UpdateCurrentOrder implements OrderAction{
  static readonly type = '[ORDER] Update Current Order Entries';
  constructor(public order:Orders ){  }

}
export class CreateInvoice implements InvoiceAction{
  static readonly type = '[ORDER] Create Order Invoice';
  constructor(public invoice:Invoice ){
   }
//CreateOrder

}
export class CreateOrder implements OrderParmsAction{
  static readonly type = '[ORDER] Create Order';
  constructor(public orderParms:OrderParms ){
   }
  }
  //UpdateOrder
  export class UpdateOrder implements OrderAction{
    static readonly type = '[ORDER] Update Order';
    constructor(public order:Orders ){
     }
    }
    //DeleteOrder
    export class DeleteOrder implements OrderAction{
      static readonly type = '[ORDER] Delete Order';
      constructor(public order:Orders ){
       }
      }
  //UpdateOrderItems
  export class UpdateOrderItems implements OrderItemsAction{
    static readonly type = '[ORDER] Update Order Items';
    constructor(public orderItems:OrderItems ){
     }
    }
    export class DeleteOrderItems implements OrderItemsAction{
      static readonly type = '[ORDER] Delete Order Items';
      constructor(public orderItems:OrderItems ){
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
export interface OrderParmsAction {
  orderParms?: OrderParms;
}
export interface OrderItemsAction {
  orderItems?: OrderItems;
}
export interface OrderParms{
  status: string;
  branch_id?: number,
user_id: number,
business_id: number,
customer_id:number,
  cart_data: OrderItems 
}

//Invoice
