import { Branch } from '../../admin/master/branch/api/branch';

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
  category?:string;
  phone?:string;
  email?:string;
  city?:string;
  country?:string;
  street1?:string;
  street2?:string;
  street3?:string;
  logo?:string;
  branches?:Branch[]
  receipt?:null;
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
