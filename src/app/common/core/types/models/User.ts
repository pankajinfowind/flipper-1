import { Social } from './Social';
import { SocialProfile } from './SocialProfile';
import { Role } from './Role';

export class User {
    id: number;
    display_name: string;
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
    roles: Role[] = [];
    social_profiles: SocialProfile[];
    has_password: boolean;
    oauth?: Social[];
    available_space: number|null;

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}
