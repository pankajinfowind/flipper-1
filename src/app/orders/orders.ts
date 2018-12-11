
export class Orders {
  id?:number;
  created_at?:Date;
  updated_at?:Date;
  status?:string;
  customer_id?:number;
  all?:string;
  orders?:any;
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }

}
