
export class OrderItems {
  id?:number;
  order_id?:number;
  order_item?:number;
  price?:number;
  currency?:any;
  quantity?:number;
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
