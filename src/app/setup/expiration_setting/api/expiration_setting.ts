export class ExpirationSetting {
  name?: string;
  id?: number;
  is_active?: number;
  description?: string;
  period?: string;
  period_value?:number;
  color?:string;
  receive_notification?:number;
  business_id?:number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
