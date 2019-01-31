import { Stock } from './api/stock';


export class StockModel {
  id?:number;
  loading:boolean;
  available:Stock[]=[];
  stockout:Stock[]=[];
  lowerstock:Stock[]=[];
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
