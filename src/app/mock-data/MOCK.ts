import { Category } from '../admin/master/categories/api/category';
import { Stock } from '../stock/api/stock';
import { Business } from '../business/api/business';
import { User } from '../common/core/types/models/User';
import { Role } from '../common/core/types/models/Role';
import { Customer } from '../customers/customer';

export const CATEGORY_MOCK_DUPLICATE = [
    {
        "category": {
            "id": 1310,
            "name": "ZOLPIDEM",
            "active": 1,
            "parent_id": 0,
            "business_id": 42,
            "created_at": "2018-12-18 09:41:23",
            "updated_at": "2018-12-18 09:41:23"
        }
    },
    {
        "category": {
            "id": 1312,
            "name": "LK",
            "active": 1,
            "parent_id": 0,
            "business_id": 42,
            "created_at": "2018-12-18 09:41:23",
            "updated_at": "2018-12-18 09:41:23"
        },
    },
    {
        "category": {
            "id": 1312,
            "name": "LK",
            "active": 1,
            "parent_id": 0,
            "business_id": 42,
            "created_at": "2018-12-18 09:41:21",
            "updated_at": "2018-12-18 09:41:21"
        },
    },
    {
        "category": {
            "id": 1310,
            "name": "ZOLPIDEM",
            "active": 1,
            "parent_id": 0,
            "business_id": 42,
            "created_at": "2018-12-18 09:41:23",
            "updated_at": "2018-12-18 09:41:23"
        }
    }
];
export const CATEGORY_UNIQUE: Category[] = [
    {
        "id": 1310,
        "name": "ZOLPIDEM",
        "active": 1,
        "parent_id": 0,
        "business_id": 42,
        "created_at": "2018-12-18 09:41:23",
        "updated_at": "2018-12-18 09:41:23"
    },
    {
        "id": 1312,
        "name": "LK",
        "active": 1,
        "parent_id": 0,
        "business_id": 42,
        "created_at": "2018-12-18 09:41:23",
        "updated_at": "2018-12-18 09:41:23"
    }
];
export const STOCK: Stock[] = [
    {
        "stock_id": 292,
        "name": "10MG TABLET ",
        "status": "available",
        "available_stock_qty": 1,
        "in_stock_qty": 1,
        "minimum_stock_counts": 0,
        "expired_date": "1970-01-01 00:00:00",
        "item": {
            "id": 1964,
            "barcode": "N05CF0201E",
            "sku": "sku",
            "upc": 0,
            "summary": "NONE",
            "manufacturer": "NONE",
            "item": "10MG TABLET ",
            "currency": "RWF",
            "unit_cost": 200.00,
            "unit_sale": 200.00,
            "cover": "cover",
            "category_id": 1310,
            "business_id": 42,
            "created_at": "2018-12-18 09:41:23",
            "updated_at": "2018-12-18 09:41:23",
            "category": {
                "id": 1310,
                "name": "ZOLPIDEM",
                "active": 1,
                "parent_id": 0,
                "business_id": 42,
                "created_at": "2018-12-18 09:41:23",
                "updated_at": "2018-12-18 09:41:23"
            }
        },
        "category": {
            "id": 1310,
            "name": "ZOLPIDEM",
            "active": 1,
            "parent_id": 0,
            "business_id": 42,
            "created_at": "2018-12-18 09:41:23",
            "updated_at": "2018-12-18 09:41:23"
        },
        "stock_transctions": [
            {
                "id": 287,
                "stock_id": 292,
                "unit_price": "200",
                "currency": "Rwf",
                "quantity": 1,
                "type": "add",
                "transaction": "Stock-new",
                "comments": "no comments",
                "transction_date": "1970-01-01 00:00:00",
                "branch_id": 1,
                "created_at": "2018-12-18 11:01:17",
                "updated_at": "2018-12-18 11:01:17"
            }
        ],
        "branch": {
            "id": 1,
            "name": "kigali,rwanda",
            "business_id": 3,
            "active": 1,
            "created_at": "2018-12-06 09:40:05",
            "updated_at": "2018-12-06 09:40:05"
        },
        "created_at": "2018-12-18 11:01:17",
        "updated_at": "2018-12-18 11:01:17",
        "price": 2,
        "item_entries": "",
        "item_soldout": "",
        "available": [],

    },
    {
        "stock_id": 291,
        "name": "10MG TABLET ",
        "status": "available",
        "available_stock_qty": 1,
        "in_stock_qty": 1,
        "minimum_stock_counts": 0,
        "expired_date": "1970-01-01 00:00:00",
        "item": {
            "id": 1964,
            "barcode": "N05CF0201E",
            "sku": "sku",
            "upc": 0,
            "summary": "NONE",
            "manufacturer": "NONE",
            "item": "10MG TABLET ",
            "currency": "RWF",
            "unit_cost": 200.00,
            "unit_sale": 200.00,
            "cover": "cover",
            "category_id": 1310,
            "business_id": 42,
            "created_at": "2018-12-18 09:41:23",
            "updated_at": "2018-12-18 09:41:23",
            "category": {
                "id": 1310,
                "name": "ZOLPIDEM",
                "active": 1,
                "parent_id": 0,
                "business_id": 42,
                "created_at": "2018-12-18 09:41:23",
                "updated_at": "2018-12-18 09:41:23"
            }
        },
        "category": {
            "id": 1310,
            "name": "ZOLPIDEM",
            "active": 1,
            "parent_id": 0,
            "business_id": 42,
            "created_at": "2018-12-18 09:41:23",
            "updated_at": "2018-12-18 09:41:23"
        },
        "stock_transctions": [
            {
                "id": 286,
                "stock_id": 291,
                "unit_price": "200",
                "currency": "Rwf",
                "quantity": 1,
                "type": "add",
                "transaction": "Stock-new",
                "comments": "no comments",
                "transction_date": "1970-01-01 00:00:00",
                "branch_id": 1,
                "created_at": "2018-12-18 10:54:41",
                "updated_at": "2018-12-18 10:54:41"
            }
        ],
        "branch": {
            "id": 1,
            "name": "kigali,rwanda",
            "business_id": 3,
            "active": 1,
            "created_at": "2018-12-06 09:40:05",
            "updated_at": "2018-12-06 09:40:05"
        },
        "created_at": "2018-12-18 10:54:41",
        "updated_at": "2018-12-18 10:54:41",
        "price": 2,
        "item_entries": "",
        "item_soldout": "",
        "available": [],
    }
];
export const BUSINESS: Business[] = [
    {
        "bussiness_id": 42,
        "name": "4amv",
        "type": "pharmacy",
        "address": "kigali,rwanda",
        "tin": null,
        "tax_charge": null,
        "currency_code": null,
        "currency_symbol": null,
        "web_url": null,
        "zip_code": null,
        "description": "for pharmacy",
        "is_active": true,
        "created_at": "2018-12-18 09:39:53",
        "updated_at": "2018-12-18 09:39:53",
        "user_logged_in": {
            "id": 6,
            "yego_user_id": null,
            "username": null,
            "first_name": null,
            "last_name": null,
            "avatar": null,
            "address": null,
            "phone": null,
            "company": null,
            "website_url": null,
            "location": null,
            "language": null,
            "country": null,
            "timezone": null,
            "bio": null,
            "email": "ganza@yegobox.com",
            "created_at": "2018-12-13 10:25:01",
            "updated_at": "2018-12-13 10:25:01"
        },
        "user_logged_role": {
            "id": 42,
            "name": "admin",
            "display_name": "4amv-admin",
            "description": null,
            "created_at": "2018-12-18 09:41:23",
            "updated_at": "2018-12-18 09:41:23"
        },
        "branches": [
            {
                "id": 37,
                "name": "kigali,rwanda",
                "business_id": 42,
                "active": 1,
                "created_at": "2018-12-18 09:41:23",
                "updated_at": "2018-12-18 09:41:23"
            }
        ],
        "users_belongs": [
            {
                "id": 6,
                "yego_user_id": null,
                "username": null,
                "first_name": null,
                "last_name": null,
                "avatar": null,
                "address": null,
                "phone": null,
                "company": null,
                "website_url": null,
                "location": null,
                "language": null,
                "country": null,
                "timezone": null,
                "bio": null,
                "email": "ganza@yegobox.com",
                "created_at": "2018-12-13 10:25:01",
                "updated_at": "2018-12-13 10:25:01",
                "pivot": {
                    "business_id": 42,
                    "user_id": 6
                }
            }
        ],
        "can_view_business": true,
        "can_edit_business": true,
        "can_delete_business": true,
        "can_view_users": true,
        "can_grant_users": true,
        "can_revoke_users": true
    }
];

export const USER: User = {
    "id": 1,
    "display_name": "richie",
    "username": "Richie",
    "first_name": "Mura",
    "last_name": "Mura",
    "avatar": "",
    "permissions": "",
    "email": "",
    "password": "",
    "language": "",
    "timezone": "",
    "country": "",
    "created_at": "",
    "updated_at": "",
    "is_subscribed": true,
    "confirmed": true,
    "roles": [],
    "business": BUSINESS,
    "has_business_belongs": true,
    "social_profiles": [],
    "has_password": true,
    "oauth": [],
    "available_space": 2,
    "settings": "",
    "current": ""
};

export const ROLE: Role = {
    "id": 1,
    "name": "role",
    "display_name": "role",
    "permissions": "e,d",
    "default": false,
    "guests": false,
    "created_at": "",
    "updated_at": "",
    "users": []
}
export const CUSTOMER: Customer[] = [{
    "cstomer_no": "002",
    "full_name": "Ganza Respice",
    "email": "respinho2012@gmail.com",
    "phone": "0781945189",
    "address": "kigali,rwanda",
    "city": "kigali",
    "country": "Rwanda",
    "user_id": "1",
    "created_by": "1",
    "insurance_number": "23939",
    "insurance_type": "RAMA",
    "misc": "he likes food",
    "organization": "StreamUpBox",
    "insurance_percentage": "15",
    "insurance_expiration_date": "12",
    "updated_at": "2018-12-20 12:21:50",
    "created_at": "2018-12-20 12:21:50",
    "id": 7
}]
