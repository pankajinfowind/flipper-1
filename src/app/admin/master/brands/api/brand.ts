export class Brand {
  name?: string;
  description?:string;
  id?: number;
  brand_id?: number;
  active?: number;
  business_id?: number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
