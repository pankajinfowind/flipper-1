import { OrderItems } from '../pos/cart/order_items';

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
  insurance_id?:number;
  business_id?:number;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }

}
