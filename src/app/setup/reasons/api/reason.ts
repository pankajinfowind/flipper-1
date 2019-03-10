export class Reason {
  name?: string;
  id?: number;
  reason_id?: number;
  is_active?: number;
  description?: string;
  type?:string;
  reason_type?:string;
  discount_value?:number;
  return_to_stock?:string;
  stock_movements_status?:string;
  business_id?:number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
