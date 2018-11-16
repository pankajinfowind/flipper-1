export class Stock {
  id?:number;
  item:string;
  sku:string;
  price:number;
  category_id?:number;
  category?:{name:string};
  qty?:string;
  sale_price?:number;
  currency?:string;
  available?:boolean;
  current_stock_qty?:number;
  openning_stock_qty?:number;
  weight?:number;
  unit_of_measure?:string;
  item_id?:number;
  branch_id?:number;
  branch?:{name?:string};
  item_entries:{};
  item_soldout:{};

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
