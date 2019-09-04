import { Social } from './Social';
import { SocialProfile } from './SocialProfile';
import { Role } from './Role';
import { Business } from '../../../../business/api/business';
import { Branch } from '../../../../admin/master/branch/api/branch';
import { NavItem } from '../../../../nav-menu-bar/nav-item';

export class Plan {
    id: number;
    name: string;
    amount: number;
    currency: string;
    currency_symbol =  '$';
    interval: 'day'|'week'|'month'|'year' = 'month';
    interval_count = 1;
    parent_id: number = null;
    parent?: Plan;
    permissions: object = {};
    recommended: 0|1 = 0;
    show_permissions: 0|1 = 0;
    free: 0|1 = 0;
    position = 0;
    features: string[] = [];

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}
export class Subscription {
    id: number;
    plan_id: number;
    user_id: number;
    on_grace_period?: boolean;
    gateway: string;
    gateway_id: string;
    valid?: boolean;
    on_trial?: boolean;
    plan?: Plan;
    trial_ends_at: string;
    ends_at: string;
    description: string;
    renews_at: string;
    user?: User;

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}
export class Settings{
  apperance?:Appearance;
  base_url:string;
  version:string;
}
export class Appearance{
  navLinks:any[] = [{path:'',label:'Dashboard'},{path:'master',label:'Master'} ,{path:'stock',label:'Stock'},{path:'sold',label:'Sold'},{path:'pos',label:'Pos'}];
  tabLayout ={color:'primary',backgroundColor:'primary',size:12};
  navLayout={color:'accent',backgroundColor:'primary',size:12};
}

export class User {
    id?: number;
    display_name?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
    permissions?: string;
    email?: string;
    phone?:string;
    role_id?:number;
    password?: string;
    language?: string;
    timezone?: string;
    country?: string;
    created_at?: string;
    updated_at?: string;
    is_subscribed?: boolean;
    confirmed?: true;
    roles?: Role[]=[];
    business?: Business[]=[];
    branches?: Branch[]=[];
    has_business_belongs?: boolean;
    social_profiles?: SocialProfile[];
    has_password?: boolean;
    oauth?: Social[];
    settings?:Settings
    current?:any;
    currencies?:any[];
    business_types?:any[];
    business_categories?:any[];
    role?:Role;
    pivot?:Object= {
        branch_id: 0,
        user_id: 0,
        id: 0,
        role_id: 0,
        switched: 0,
        activated: 1,
        activation_code: 0,
        active: 0
    }
    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}
    export class UserData {
        business?:Business;
        roles?: Role[]=[];
        user_logged_in?:User;
        user_logged_role?:Role;
        switched_branch?:Branch;
        permissions?:any;
        has_business_belongs?: boolean;
        menus?:NavItem[]=[];
        social_profiles?: SocialProfile[];
        user_branches?:Branch[];
        constructor(params: Object = {}) {
            for (let name in params) {
                this[name] = params[name];
            }
        }
}
