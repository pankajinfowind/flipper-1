export class Pricing {
  name?: string;
  id?: number;
  pricing_id?: number;
  active?: number;
  parent_id?: number;
  business_id?: number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
