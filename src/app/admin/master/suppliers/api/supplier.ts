export class Supplier {
  id?: number;
  supplier_id?: number;
  full_name?: string;
  supplier_no?:string;
  email?:string;
  phone?: string;
  address?:string;
  city?:string;
  country?:string;
  company?:string;
  business_id?: number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
