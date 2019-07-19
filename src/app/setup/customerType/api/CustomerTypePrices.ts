import { CustomerType } from './CustomerType';

export class CustomerTypePrices {
  id?: number;
  customer_type_id?: number;
  customer_type?:CustomerType;
  active?: number;
  created_at?: any;
  updated_at?: any;
  item_id?:number;
  sale_price_excluding_tax?:number;
  sale_price_including_tax?:number;
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
