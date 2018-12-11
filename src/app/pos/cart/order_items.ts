
export class OrderItems {
  id?:number;
  order_id?:number;
  order_item?:number;
  Each?:any;
  currency?:any;
  Qty?:number;
  Total?:any;
  price?:number;
  total_discount?:number;
  total_amount?:number;
  total_tax?:number;
  discount?:number;
  available_qty?:number;
  Item?:string;
  tax?:number;
  note?:string;
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
