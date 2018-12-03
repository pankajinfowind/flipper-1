export class Item {
  id?:number;
  item:string;
  item_id?:number;
  sku:string;
  upc?:number;
  summary?:string;
  manufacturer?:string;
  unit_cost:number;
  category_id?:number;
  category?:{name:string};
  barcode?:string;
  unit_sale?:number;
  currency?:string;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
