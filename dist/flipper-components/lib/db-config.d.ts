import { InjectionToken } from '@angular/core';
import { Menu } from './entries';
import { Reason } from './entries/reason';
export declare const APP_CONFIG: InjectionToken<FlipperDBConfig[]>;
export declare enum TABLES {
    USER = "user",
    BUSINESS = "business",
    TYPES = "businessTypes",
    MENU = "menus",
    BRANCHES = "branches",
    BUSINESSCATEGORY = "businessCategories",
    USERBUSINESS = "businessUsers",
    TAXES = "taxes",
    PRODUCTS = "products",
    VARIANTS = "variants",
    REASON = "reasons",
    STOCKS = "stocks",
    BRANCHPRODUCTS = "branchProducts",
    ORDER = "orders",
    ORDERDETAILS = "orderDetails",
    STOCKHISTORY = "stockHistory",
    DEVICE = "devices",
    RECEIPT = "receipts",
    SUBSCRIPTION = "subscription"
}
export declare type TABLE = TABLES.USER | TABLES.TYPES | TABLES.MENU | TABLES.BUSINESS | TABLES.BRANCHES | TABLES.BUSINESSCATEGORY | TABLES.USERBUSINESS | TABLES.TAXES | TABLES.PRODUCTS | TABLES.VARIANTS | TABLES.STOCKS | TABLES.ORDER | TABLES.ORDERDETAILS | TABLES.REASON | TABLES.DEVICE | TABLES.RECEIPT | TABLES.STOCKHISTORY | TABLES.BRANCHPRODUCTS | TABLES.SUBSCRIPTION;
export declare const DEFAULT_FLIPPER_DB_CONFIG: {
    database: {
        name: string;
        engine: string;
    };
    tables: {
        name: TABLES;
        query: string;
    }[];
    demo: {
        email: string;
        password: string;
    };
    defaultMenu: {
        name: string;
        icon: string;
        route: string;
        active: boolean;
        isSetting: boolean;
    }[];
    defaultReasons: {
        name: string;
        operation: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[];
    defaultCategory: {
        name: string;
        id: string;
        type_id: string;
    }[];
    defaultType: {
        name: string;
        id: string;
    }[];
};
export interface FlipperDBConfig {
    [key: string]: any;
    database: {
        name: string;
        engine: string;
    };
    tables: Array<{
        name: TABLE;
        query: string;
    }>;
    defaultMenu: Array<Menu>;
    defaultReasons: Array<Reason>;
    defaultType: Array<{
        name: string;
        category: any[];
    }>;
}
export declare const Tables: {
    user: string;
    business: string;
    branch: string;
    menu: string;
    type: string;
    businessCategory: string;
    userBusiness: string;
    taxes: string;
    variants: string;
    products: string;
    stocks: string;
    branchProducts: string;
    reasons: string;
    order: string;
    orderDetails: string;
    stockHistory: string;
};
export declare const PouchConfig: {
    channel: string;
    sessionId: string;
    bucket: string;
    syncUrl: string;
    canSync: boolean;
    user: string;
    password: string;
    Tables: {
        user: string;
        business: string;
        branches: string;
        menus: TABLES;
        businessTypes: TABLES;
        businessCategories: TABLES;
        businessUsers: string;
        taxes: string;
        variants: string;
        products: string;
        branchProducts: string;
        reasons: string;
        orders: string;
        orderDetails: string;
        stockHistories: string;
        subscription: string;
        stocks: string;
    };
};
//# sourceMappingURL=db-config.d.ts.map