export class Category {
  name:string;
  id?:number;
  category_id?:number;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
