import { OrderItems } from '../pos/cart/order_items';
import { Insurance } from '../admin/master/insurance/api/insurance';

export class Orders {

  id?:number;
  created_at?:Date;
  updated_at?:Date;
  status?:string;
  customer_id?:number;
  is_currently_processing:any;
  all?:string;
  order_items?:OrderItems[]=[];
  branch_id?:number;
  insurance?:Insurance;
  business_id?:number;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }

}
