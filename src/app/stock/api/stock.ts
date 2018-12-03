import { Item } from '../../admin/master/items/api/item';
import { Category } from '../../admin/master/categories/api/category';

export class Stock {
  id?:number;
  item:Item;
  name?:string;
  sku?:string;
  price:number;
  category_id?:number;
  category?:Category;
  qty?:string;
  sale_price?:number;
  currency?:string;
  status?:any;
  available_stock_qty?:number;
  in_stock_qty?:number;
  weight?:number;
  unit_of_measure?:string;
  item_id?:number;
  branch_id?:number;
  branch?:any;
  item_entries:{};
  item_soldout:{};
  available:Stock[];
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
