import {AppConfig} from '../../../../environments/environment';
import {InjectionToken} from '@angular/core';
import { Appearance } from '../types/models/User';

export const APP_CONFIG = new InjectionToken<FlipperConfig[]>('APP_CONFIG');

export interface FlipperConfigAppearance {
    navigationRoutes: string[];
    defaultRoute: string;
    sections: {[key: string]: AppearanceFieldConfig};
    menus: {
        availableRoutes: string[],
        positions: string[],
    };
}

export interface AppearanceFieldConfig {
    name: string;
    position?: number;
    route?: string;
    fields: AppearanceEditableField[];
}

export interface AppearanceEditableField {
    name: string;
    display_name?: string;
    type?: 'code'|'color'|'image'|'text';
    key: string;
    value?: any;
    defaultValue?: any;
    image_type?: string;
    input_type?: string;
    selector?: string;
    config?: { [key: string]: any };
}

export const DEFAULT_FLIPPER_CONFIG: FlipperConfig = {
    environment: AppConfig.production ? 'production' : 'dev',
    assetsPrefix: null,
    auth: {
        // Route users should be redirected to after successful login.
        redirectUri: '/',
        // Route admins should be redirected to after successful login.
        adminRedirectUri: '/',
        // color for login/register page buttons and checkbox
        color: 'accent',
    },
    accountSettings: {
        hideNavbar: false,
    },
    demo: {
        email: 'admin@admin.com',
        password: 'admin',
    },
    customPages: {
        hideNavbar: false,
    }
};

export interface FlipperConfig {
    [key: string]: any;

    // scrollbar
    forceCustomScrollbar?: boolean;

    // backend stuff
    base_url?: string;
    version?: string;
    appearance?:Appearance
    'homepage.type'?: string;
    'homepage.value'?: string;
    'logging.sentry_public'?: string;
    'dates.format'?: string;
    'ads.disable'?: boolean;
    menus?: string;
    'i18n.enable'?: boolean;
    'branding.site_name'?: string;
    'toast.default_timeout'?: number;
    // vebto config
    environment?: 'production'|'dev';
    assetsPrefix?: string|null;
    auth?: {
        redirectUri?: string,
        adminRedirectUri?: string,
        color?: 'accent'|'primary',
    };
    accountSettings?: {
        hideNavbar?: boolean,
    };
    navbar?: {
        defaultPosition: string,
        dropdownItems: {route: string, name: string, icon: string, permission?: string, role?: string}[],
    };


}
