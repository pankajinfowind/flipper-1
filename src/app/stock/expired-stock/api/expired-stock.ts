import { Stock } from '../../api/stock';
import { Branch } from '../../../admin/master/branch/api/branch';
import { Item } from '../../../admin/master/items/api/item';


export class StockExpired {
  id?:number;
  stock?:Stock;
  item?:Item;
  branch?:Branch;
  batch_no?:string;
  expired_date?:Date;
  in_qty?:number;
  out_qty?:number;
  total_qty?:number;
  manufacture_date?:Date;
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
