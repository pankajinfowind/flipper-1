
export class OrderItems {
  id?:number;
  order_id?:number;
  order_item?:number;
  Each?:any;
  currency?:any;
  Qty?:number;
  Total?:any;
  price?:number;
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
