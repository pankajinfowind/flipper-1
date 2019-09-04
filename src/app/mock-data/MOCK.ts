import { Category } from '../admin/master/categories/api/category';
import { Stock } from '../stock/api/stock';

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
