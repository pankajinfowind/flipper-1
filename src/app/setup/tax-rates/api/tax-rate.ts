export class TAXRATE {
  name?: string;
  id?: number;
  tax_rate_id?: number;
  active?: number;
  description?: string;
  percentage?: number;
  tax_type?:string;
  tax_code?:string;
  business_id?:number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
