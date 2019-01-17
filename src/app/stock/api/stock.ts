import { Item } from '../../admin/master/items/api/item';
import { Category } from '../../admin/master/categories/api/category';
import { Reason } from '../../setup/reasons/api/reason';
import { TAXRATE } from '../../setup/tax-rates/api/tax-rate';


export class Stock {
  id?: number;
  stock_transctions: [{ id: number, stock_id: number, quantity: number, unit_price?:any;currency?:string;type: string, transaction: string, comments: string, transction_date: string, branch_id: number, created_at: string, updated_at: string,reason_id?:number;reason?:Reason }];
  created_at: string;
  updated_at: string;
  minimum_stock_counts: number;
  expired_date: string;
  item: Item;
  tax_rate?:TAXRATE;
  name?: string;
  sku?: string;
  price: number;
  category_id?: number;
  category?: Category;
  qty?: string;
  sale_price?: string;
  stock_id?: number;
  currency?: string;
  status?: any;
  available_stock_qty?: number;
  in_stock_qty?: number;
  weight?: number;
  unit_of_measure?: string;
  item_id?: number;
  branch_id?: number;
  branch?: any;
  item_entries: {};
  item_soldout: {};
  available: any[] | Stock[];
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
