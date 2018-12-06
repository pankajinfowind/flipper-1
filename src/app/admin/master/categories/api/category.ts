export class Category {
  name:string;
  id?:number;
  category_id?:number;
  active?:boolean;
  parent_id?:number;
  business_id?:number;
  created_at?:any;
  updated_at?:any;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
