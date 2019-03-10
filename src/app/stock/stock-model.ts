import { Stock } from './api/stock';
import { StockExpired } from './expired-stock/api/expired-stock';


export class StockModel {
  id?:number;
  loading:boolean;
  available:Stock[]=[];
  stockout:Stock[]=[];
  lowerstock:Stock[]=[];
  expiredStock:StockExpired[]=[];
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
