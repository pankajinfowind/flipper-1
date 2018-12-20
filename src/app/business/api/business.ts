export class Business {
  name: string;
  type: string;
  address?: string;
  tin?: string;
  description?: string;
  id?: number;
  bussiness_id?: number;
  tax_charge?: any;
  currency_code?: any = 'rwf';
  currency_symbol?: any;
  web_url?: string;
  zip_code?: any;
  is_active?: boolean;
  created_at?: any;
  updated_at?: any;
  user_logged_in?: any;
  user_logged_role?: any;
  branchies?: any;
  users_belongs?: any;
  can_view_business?: boolean;
  can_edit_business?: boolean;
  can_delete_business?: boolean;
  can_view_users?: boolean;
  can_grant_users?: boolean;
  can_revoke_users?: boolean;
  branches: [{ id: number, name: string, business_id: number, active: number, created_at: string, updated_at: string }]

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
