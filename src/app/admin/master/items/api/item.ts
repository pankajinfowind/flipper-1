export class Item {
  item:string;
  sku:string;
  price:number;
  category_id?:number;
  barcode?:string;
  sale_price?:number;
  currency?:string;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
