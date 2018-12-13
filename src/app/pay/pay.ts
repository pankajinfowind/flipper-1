import { OrderItems } from '../pos/cart/order_items';
import { Orders } from '../orders/orders';

export class Pay {

  id?:number;
  order?:Orders;
  payment_method?:string;
  //payment_method?:string;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }

}
