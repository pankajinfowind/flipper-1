import { Social } from './Social';
import { SocialProfile } from './SocialProfile';
import { Role } from './Role';
import { Business } from '../../../../business/api/business';

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
export class User {
    id: number;
    display_name?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
    permissions?: string;
    email: string;
    password: string;
    language: string;
    timezone: string;
    country: string;
    created_at: string;
    updated_at: string;
    is_subscribed?: boolean;
    confirmed: true;
    roles?: Role[]=[];
    business?: Business[]=[];
    has_business_belongs?: boolean;
    social_profiles?: SocialProfile[];
    has_password?: boolean;
    oauth?: Social[];
    available_space?: number|null;

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}
