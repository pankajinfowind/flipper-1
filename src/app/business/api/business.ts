export class Business {
  name:string;
  type:string;
  address?:string;
  tin?:string;
  description?:string;
  id?:number;
  bussiness_id?: number;
  tax_charge?: any;
  currency_code?: any;
  currency_symbol?: any;
  web_url?: string;
  zip_code?: any;
  is_active?: boolean;
  created_at?:any;
  updated_at?:any;
  user_logged_in?: any;
  user_logged_role?: any;
  branchies?: any;
  users_belongs?: any;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
