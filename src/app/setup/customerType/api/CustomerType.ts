import { CustomerTypePrices } from './CustomerTypePrices';

export class CustomerType {
  name?: string;
  id?: number;
  customer_type_id?: number;
  is_active?: number;
  discount_value?: number;
  description?:string;
  business_id?: number;
  customer_type_items?:CustomerTypePrices[]=[];
  created_at?: any;
  updated_at?: any;
  active?: number;
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
