import { OrderItems } from '../pos/cart/order_items';
import { Orders } from '../orders/orders';

export class Pay {

  id?:number;
  order?:Orders;
  order_items?:OrderItems[];
  payment_method?:string;
  invoice_no?:string;
  invoice_date?:Date;
  discounts?:number;
  total_items?:number;
  tax?:number
  amount?:number;
  amount_given?:number;
  amount_return?:number;
  currency?:string;
  status?:string;
  pos_session_id?:number;
  branch_id?:number;
  customer_id?:number;
  insurance_id?:number;
  created_at?:Date;
  updated_at?:Date;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }

}
