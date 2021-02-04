import { InjectionToken } from '@angular/core';
export const APP_CONFIG = new InjectionToken('APP_CONFIG');
export var TABLES;
(function (TABLES) {
    TABLES["USER"] = "user";
    TABLES["BUSINESS"] = "business";
    TABLES["TYPES"] = "businessTypes";
    TABLES["MENU"] = "menus";
    TABLES["BRANCHES"] = "branches";
    TABLES["BUSINESSCATEGORY"] = "businessCategories";
    TABLES["USERBUSINESS"] = "businessUsers";
    TABLES["TAXES"] = "taxes";
    TABLES["PRODUCTS"] = "products";
    TABLES["VARIANTS"] = "variants";
    TABLES["REASON"] = "reasons";
    TABLES["STOCKS"] = "stocks";
    TABLES["BRANCHPRODUCTS"] = "branchProducts";
    TABLES["ORDER"] = "orders";
    TABLES["ORDERDETAILS"] = "orderDetails";
    TABLES["STOCKHISTORY"] = "stockHistory";
    TABLES["DEVICE"] = "devices";
    TABLES["RECEIPT"] = "receipts";
    TABLES["SUBSCRIPTION"] = "subscription";
})(TABLES || (TABLES = {}));
export const DEFAULT_FLIPPER_DB_CONFIG = {
    database: { name: 'flipper', engine: 'LOCALSTORAGE' },
    tables: [
        {
            name: TABLES.USER,
            query: `id STRING,
                    name STRING,
                    email STRING,
                    active BOOL,
                    token STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
            `,
        },
        {
            name: TABLES.BUSINESSCATEGORY,
            query: `id STRING,
                    name STRING,
                    typeId STRING,
                    syncedOnline BOOL,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.REASON,
            query: `id STRING,
                    name STRING,
                    operation STRING,
                    active BOOL,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                 `,
        },
        {
            name: TABLES.TYPES,
            query: `id STRING,
                    name STRING,
                    syncedOnline BOOL,
                    PRIMARY KEY (id)
            `,
        },
        {
            name: TABLES.MENU,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                name STRING,
                icon STRING,
                route STRING,
                active BOOL,
                isSetting BOOL,
                PRIMARY KEY (id)`,
        },
        {
            name: TABLES.BUSINESS,
            query: `
                id STRING,
                name STRING,
                country STRING,
                currency STRING,
                businessUrl STRING,
                timeZone STRING,
                active BOOL,
                userId STRING,
                typeId STRING,
                categoryId STRING,
                createdAt DATETIME,
                updatedAt DATETIME,
                PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.BRANCHES,
            query: `
                id STRING,
                name STRING,
                active BOOL,
                businessId STRING,
                mapLatitude STRING NULL,
                mapLongitude STRING NULL,
                createdAt DATETIME,
                updatedAt DATETIME,
                PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.USERBUSINESS,
            query: `id STRING,
                    userId STRING,
                    businessId STRING,
                    PRIMARY KEY (id)
                    `,
        },
        {
            name: TABLES.TAXES,
            query: `id STRING,
                    name STRING,
                    percentage int(11),
                    active BOOL,
                    isDefault BOOL,
                    businessId STRING,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                        `,
        },
        {
            name: TABLES.PRODUCTS,
            query: `id STRING,
                    name STRING,
                    categoryId int(11) NULL,
                    description STRING NULL,
                    picture STRING NULL,
                    taxId int(11) NULL,
                    active BOOL,
                    hasPicture BOOL,
                    isDraft BOOL,
                    isCurrentUpdate BOOL,
                    businessId STRING,
                    supplierId STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.BRANCHPRODUCTS,
            query: `id STRING,
                    productId STRING,
                    branchId STRING,
                    channel STRING,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.VARIANTS,
            query: `id STRING,
                    name STRING,
                    sku STRING,
                    productId STRING,
                    unit STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.STOCKS,
            query: ` id STRING,
                    branchId STRING,
                    variantId STRING,
                    productId STRING,
                    lowStock STRING,
                    currentStock STRING,
                    supplyPrice int(11) NULL,
                    retailPrice int(11) NULL,
                    canTrackingStock BOOL,
                    showLowStockAlert BOOL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.ORDER,
            query: `id STRING,
                    branchId STRING NOT NULL,
                    deviceId STRING NULL,
                    orderNumber STRING NOT NULL,
                    customerId STRING NULL,
                    status STRING NOT NULL,
                    reference STRING NULL,
                    orderType STRING NOT NULL,
                    supplierId STRING NULL,
                    subTotal int(11) NULL,
                    supplierInvoiceNumber STRING NULL,
                    taxRate int(11) NULL,
                    taxAmount int(11) NULL,
                    discountRate int(11) NULL,
                    discountAmount int(11) NULL,
                    cashReceived int(11) NULL,
                    customerChangeDue int(11) NULL,
                    saleTotal int(11) NULL,
                    paymentId STRING NULL,
                    orderNote STRING NULL,
                    active BOOL,
                    isDraft BOOL,
                    channel STRING,
                    deliverDate DATETIME,
                    orderDate DATETIME,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.ORDERDETAILS,
            query: ` id STRING NOT NULL,
                    orderId STRING NOT NULL,
                    variantId STRING NOT NULL,
                    variantName STRING NOT NULL,
                    price int(11) NULL,
                    quantity int(11) NOT NULL,
                    unit STRING NULL,
                    taxAmount int(11) NULL,
                    taxRate int(11) NULL,
                    discountAmount int(11) NULL,
                    discountRate int(11) NULL,
                    subTotal int(11) NULL,
                    note STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.STOCKHISTORY,
            query: `id STRING,
                    variantId STRING,
                    stockId STRING,
                    productId STRING,
                    quantity int(11) NOT NULL,
                    reason STRING NULL,
                    note STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.DEVICE,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                    branchId int(11) NOT NULL,
                    name int(11) NOT NULL,
                    token STRING NOT NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.RECEIPT,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                    branchId int(11) NOT NULL,
                    businessName int(11) NOT NULL,
                    digitalLogo STRING  NULL,
                    printedLogo STRING  NULL,
                    showLocation BOOL  NULL,
                    color STRING  NULL,
                    address1 STRING  NULL,
                    address1 STRING  NULL,
                    city STRING  NULL,
                    customerText STRING  NULL,
                    returnPolicy STRING  NULL,
                    showItemNote BOOL  NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
    ],
    demo: {
        email: 'admin@admin.com',
        password: 'admin',
    },
    defaultMenu: [
        {
            name: 'Analytics',
            icon: 'analytics.svg',
            route: 'analytics',
            active: true,
            isSetting: false,
        },
        {
            name: 'POS',
            icon: 'pos.svg',
            route: 'pos',
            active: false,
            isSetting: false,
        },
        {
            name: 'Inventory',
            icon: 'inventory.svg',
            route: 'inventory',
            active: false,
            isSetting: false,
        },
        {
            name: 'Transactions',
            icon: 'transaction.svg',
            route: 'transactions',
            active: false,
            isSetting: false,
        },
        {
            name: 'Settings',
            icon: 'settings.svg',
            route: 'settings',
            active: false,
            isSetting: true,
        },
    ],
    defaultReasons: [
        {
            name: 'Stock Received',
            operation: 'add',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Inventory Re-count',
            operation: 'add',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Damage',
            operation: 'remove',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Theft',
            operation: 'remove',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Loss',
            operation: 'remove',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Restock Return',
            operation: 'add',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    defaultCategory: [
        {
            name: 'Beauty Salon',
            id: 'beauty-salon',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Hair Salon/Barbershop',
            id: 'hair-salon/barbershop',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Independent Stylist/Barber',
            id: 'independent-stylist/barber',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Massage Therapist',
            id: 'massage-therapist',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Nail Salon',
            id: 'nail-salon',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Spa',
            id: 'spa',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Tanning Salon',
            id: 'tanning-salon',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Tattoo/Piercing',
            id: 'tattoo/piercing',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Pharamcy',
            id: 'pharamcy',
            type_id: 'retail',
        },
        {
            name: 'Grocery/Market',
            id: 'grocery/market',
            type_id: 'retail',
        },
        {
            name: 'Pet Store',
            id: 'pet-store',
            type_id: 'retail',
        },
        {
            name: 'Electronics',
            id: 'electronics',
            type_id: 'retail',
        },
        {
            name: 'Hardware Store',
            id: 'hardware-store',
            type_id: 'retail',
        },
        {
            name: 'Eyewear',
            id: 'eyewear',
            type_id: 'retail',
        },
        {
            name: 'Outdoor Markets',
            id: 'outdoor-markets',
            type_id: 'retail',
        },
        {
            name: 'Speciality Shop',
            id: 'speciality-shop',
            type_id: 'retail',
        },
        {
            name: 'Sporting Goods',
            id: 'sporting-goods',
            type_id: 'retail',
        },
        {
            name: 'Hobby Shop',
            id: 'hobby-shop',
            type_id: 'retail',
        },
        {
            name: 'Jewelry and Watches',
            id: 'jewelry-and-watches',
            type_id: 'retail',
        },
        {
            name: 'Flowers and Gifts',
            id: 'flowers-and-gifts',
            type_id: 'retail',
        },
    ],
    defaultType: [
        {
            name: 'Beauty and Personal Care',
            id: 'beauty-and-personal-care',
        },
        {
            name: 'Retail',
            id: 'retail',
        },
    ],
};
export const Tables = {
    user: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.USER,
    business: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BUSINESS,
    branch: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BRANCHES,
    menu: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.MENU,
    type: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.TYPES,
    businessCategory: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BUSINESSCATEGORY,
    userBusiness: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.USERBUSINESS,
    taxes: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.TAXES,
    variants: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.VARIANTS,
    products: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.PRODUCTS,
    stocks: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.STOCKS,
    branchProducts: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BRANCHPRODUCTS,
    reasons: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.REASON,
    order: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.ORDER,
    orderDetails: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.ORDERDETAILS,
    stockHistory: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.STOCKHISTORY,
};
export const PouchConfig = {
    channel: localStorage.getItem('channel'),
    sessionId: localStorage.getItem('sessionId'),
    // bucket: localStorage.getItem('bucket'),
    bucket: 'main',
    syncUrl: 'http://yegobox.com:4985/main',
    canSync: true,
    user: 'admin',
    password: 'singlworld',
    Tables: {
        user: TABLES.USER + '_' + localStorage.getItem('channel'),
        business: TABLES.BUSINESS + '_' + localStorage.getItem('channel'),
        branches: TABLES.BRANCHES + '_' + localStorage.getItem('channel'),
        menus: TABLES.MENU,
        businessTypes: TABLES.TYPES,
        businessCategories: TABLES.BUSINESSCATEGORY,
        businessUsers: TABLES.USERBUSINESS + '_' + localStorage.getItem('channel'),
        taxes: TABLES.TAXES + '_' + localStorage.getItem('channel'),
        variants: TABLES.VARIANTS + '_' + localStorage.getItem('channel'),
        products: TABLES.PRODUCTS + '_' + localStorage.getItem('channel'),
        branchProducts: TABLES.BRANCHPRODUCTS + '_' + localStorage.getItem('channel'),
        reasons: TABLES.REASON + '_' + localStorage.getItem('channel'),
        orders: TABLES.ORDER + '_' + localStorage.getItem('channel'),
        orderDetails: TABLES.ORDERDETAILS + '_' + localStorage.getItem('channel'),
        stockHistories: TABLES.STOCKHISTORY + '_' + localStorage.getItem('channel'),
        subscription: TABLES.SUBSCRIPTION + '_' + localStorage.getItem('channel'),
        stocks: TABLES.STOCKS + '_' + localStorage.getItem('channel'),
    },
};
// localStorage.setItem("lastname", "Smith");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZmxpcHBlci1jb21wb25lbnRzL3NyYy9saWIvZGItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFJOUMsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLElBQUksY0FBYyxDQUFvQixZQUFZLENBQUMsQ0FBQTtBQUU3RSxNQUFNLENBQU4sSUFBWSxNQW9CWDtBQXBCRCxXQUFZLE1BQU07SUFDaEIsdUJBQWEsQ0FBQTtJQUNiLCtCQUFxQixDQUFBO0lBQ3JCLGlDQUF1QixDQUFBO0lBQ3ZCLHdCQUFjLENBQUE7SUFDZCwrQkFBcUIsQ0FBQTtJQUNyQixpREFBdUMsQ0FBQTtJQUN2Qyx3Q0FBOEIsQ0FBQTtJQUM5Qix5QkFBZSxDQUFBO0lBQ2YsK0JBQXFCLENBQUE7SUFDckIsK0JBQXFCLENBQUE7SUFDckIsNEJBQWtCLENBQUE7SUFDbEIsMkJBQWlCLENBQUE7SUFDakIsMkNBQWlDLENBQUE7SUFDakMsMEJBQWdCLENBQUE7SUFDaEIsdUNBQTZCLENBQUE7SUFDN0IsdUNBQTZCLENBQUE7SUFDN0IsNEJBQWtCLENBQUE7SUFDbEIsOEJBQW9CLENBQUE7SUFDcEIsdUNBQTZCLENBQUE7QUFDL0IsQ0FBQyxFQXBCVyxNQUFNLEtBQU4sTUFBTSxRQW9CakI7QUF1QkQsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUc7SUFDdkMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFO0lBQ3JELE1BQU0sRUFBRTtRQUNOO1lBQ0UsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2pCLEtBQUssRUFBRTs7Ozs7Ozs7YUFRQTtTQUNSO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtZQUM3QixLQUFLLEVBQUU7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QUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNqRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDakUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQzdFLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUM5RCxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDNUQsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3pFLGNBQWMsRUFBRSxNQUFNLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUMzRSxZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDekUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0tBQzlEO0NBQ0YsQ0FBQTtBQUNELDZDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHsgTWVudSB9IGZyb20gJy4vZW50cmllcydcclxuaW1wb3J0IHsgUmVhc29uIH0gZnJvbSAnLi9lbnRyaWVzL3JlYXNvbidcclxuXHJcbmV4cG9ydCBjb25zdCBBUFBfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPEZsaXBwZXJEQkNvbmZpZ1tdPignQVBQX0NPTkZJRycpXHJcblxyXG5leHBvcnQgZW51bSBUQUJMRVMge1xyXG4gIFVTRVIgPSAndXNlcicsXHJcbiAgQlVTSU5FU1MgPSAnYnVzaW5lc3MnLFxyXG4gIFRZUEVTID0gJ2J1c2luZXNzVHlwZXMnLFxyXG4gIE1FTlUgPSAnbWVudXMnLFxyXG4gIEJSQU5DSEVTID0gJ2JyYW5jaGVzJyxcclxuICBCVVNJTkVTU0NBVEVHT1JZID0gJ2J1c2luZXNzQ2F0ZWdvcmllcycsXHJcbiAgVVNFUkJVU0lORVNTID0gJ2J1c2luZXNzVXNlcnMnLFxyXG4gIFRBWEVTID0gJ3RheGVzJyxcclxuICBQUk9EVUNUUyA9ICdwcm9kdWN0cycsXHJcbiAgVkFSSUFOVFMgPSAndmFyaWFudHMnLFxyXG4gIFJFQVNPTiA9ICdyZWFzb25zJyxcclxuICBTVE9DS1MgPSAnc3RvY2tzJyxcclxuICBCUkFOQ0hQUk9EVUNUUyA9ICdicmFuY2hQcm9kdWN0cycsXHJcbiAgT1JERVIgPSAnb3JkZXJzJyxcclxuICBPUkRFUkRFVEFJTFMgPSAnb3JkZXJEZXRhaWxzJyxcclxuICBTVE9DS0hJU1RPUlkgPSAnc3RvY2tIaXN0b3J5JyxcclxuICBERVZJQ0UgPSAnZGV2aWNlcycsXHJcbiAgUkVDRUlQVCA9ICdyZWNlaXB0cycsXHJcbiAgU1VCU0NSSVBUSU9OID0gJ3N1YnNjcmlwdGlvbicsXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFRBQkxFID1cclxuICB8IFRBQkxFUy5VU0VSXHJcbiAgfCBUQUJMRVMuVFlQRVNcclxuICB8IFRBQkxFUy5NRU5VXHJcbiAgfCBUQUJMRVMuQlVTSU5FU1NcclxuICB8IFRBQkxFUy5CUkFOQ0hFU1xyXG4gIHwgVEFCTEVTLkJVU0lORVNTQ0FURUdPUllcclxuICB8IFRBQkxFUy5VU0VSQlVTSU5FU1NcclxuICB8IFRBQkxFUy5UQVhFU1xyXG4gIHwgVEFCTEVTLlBST0RVQ1RTXHJcbiAgfCBUQUJMRVMuVkFSSUFOVFNcclxuICB8IFRBQkxFUy5TVE9DS1NcclxuICB8IFRBQkxFUy5PUkRFUlxyXG4gIHwgVEFCTEVTLk9SREVSREVUQUlMU1xyXG4gIHwgVEFCTEVTLlJFQVNPTlxyXG4gIHwgVEFCTEVTLkRFVklDRVxyXG4gIHwgVEFCTEVTLlJFQ0VJUFRcclxuICB8IFRBQkxFUy5TVE9DS0hJU1RPUllcclxuICB8IFRBQkxFUy5CUkFOQ0hQUk9EVUNUU1xyXG4gIHwgVEFCTEVTLlNVQlNDUklQVElPTlxyXG5cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRkxJUFBFUl9EQl9DT05GSUcgPSB7XHJcbiAgZGF0YWJhc2U6IHsgbmFtZTogJ2ZsaXBwZXInLCBlbmdpbmU6ICdMT0NBTFNUT1JBR0UnIH0sXHJcbiAgdGFibGVzOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFRBQkxFUy5VU0VSLFxyXG4gICAgICBxdWVyeTogYGlkIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlIEJPT0wsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdCBEQVRFVElNRSxcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXQgREFURVRJTUUsXHJcbiAgICAgICAgICAgICAgICAgICAgUFJJTUFSWSBLRVkgKGlkKVxyXG4gICAgICAgICAgICBgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogVEFCTEVTLkJVU0lORVNTQ0FURUdPUlksXHJcbiAgICAgIHF1ZXJ5OiBgaWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVJZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3luY2VkT25saW5lIEJPT0wsXHJcbiAgICAgICAgICAgICAgICAgICAgUFJJTUFSWSBLRVkgKGlkKVxyXG4gICAgICAgICAgICAgICAgYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFRBQkxFUy5SRUFTT04sXHJcbiAgICAgIHF1ZXJ5OiBgaWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbiBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlIEJPT0wsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdCBEQVRFVElNRSxcclxuICAgICAgICAgICAgICAgICAgICBQUklNQVJZIEtFWSAoaWQpXHJcbiAgICAgICAgICAgICAgICAgYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFRBQkxFUy5UWVBFUyxcclxuICAgICAgcXVlcnk6IGBpZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3luY2VkT25saW5lIEJPT0wsXHJcbiAgICAgICAgICAgICAgICAgICAgUFJJTUFSWSBLRVkgKGlkKVxyXG4gICAgICAgICAgICBgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogVEFCTEVTLk1FTlUsXHJcbiAgICAgIHF1ZXJ5OiBgaWQgaW50KDExKSBOT1QgTlVMTCBBVVRPX0lOQ1JFTUVOVCxcclxuICAgICAgICAgICAgICAgIG5hbWUgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgaWNvbiBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICByb3V0ZSBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgQk9PTCxcclxuICAgICAgICAgICAgICAgIGlzU2V0dGluZyBCT09MLFxyXG4gICAgICAgICAgICAgICAgUFJJTUFSWSBLRVkgKGlkKWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiBUQUJMRVMuQlVTSU5FU1MsXHJcbiAgICAgIHF1ZXJ5OiBgXHJcbiAgICAgICAgICAgICAgICBpZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICBuYW1lIFNUUklORyxcclxuICAgICAgICAgICAgICAgIGNvdW50cnkgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgY3VycmVuY3kgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgYnVzaW5lc3NVcmwgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgdGltZVpvbmUgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlIEJPT0wsXHJcbiAgICAgICAgICAgICAgICB1c2VySWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgdHlwZUlkIFNUUklORyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgUFJJTUFSWSBLRVkgKGlkKVxyXG4gICAgICAgICAgICAgICAgYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFRBQkxFUy5CUkFOQ0hFUyxcclxuICAgICAgcXVlcnk6IGBcclxuICAgICAgICAgICAgICAgIGlkIFNUUklORyxcclxuICAgICAgICAgICAgICAgIG5hbWUgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlIEJPT0wsXHJcbiAgICAgICAgICAgICAgICBidXNpbmVzc0lkIFNUUklORyxcclxuICAgICAgICAgICAgICAgIG1hcExhdGl0dWRlIFNUUklORyBOVUxMLFxyXG4gICAgICAgICAgICAgICAgbWFwTG9uZ2l0dWRlIFNUUklORyBOVUxMLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgUFJJTUFSWSBLRVkgKGlkKVxyXG4gICAgICAgICAgICAgICAgYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFRBQkxFUy5VU0VSQlVTSU5FU1MsXHJcbiAgICAgIHF1ZXJ5OiBgaWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgYnVzaW5lc3NJZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgUFJJTUFSWSBLRVkgKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIGAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiBUQUJMRVMuVEFYRVMsXHJcbiAgICAgIHF1ZXJ5OiBgaWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2UgaW50KDExKSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgQk9PTCxcclxuICAgICAgICAgICAgICAgICAgICBpc0RlZmF1bHQgQk9PTCxcclxuICAgICAgICAgICAgICAgICAgICBidXNpbmVzc0lkIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQgREFURVRJTUUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgICAgIFBSSU1BUlkgS0VZIChpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFRBQkxFUy5QUk9EVUNUUyxcclxuICAgICAgcXVlcnk6IGBpZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlJZCBpbnQoMTEpIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gU1RSSU5HIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZSBTVFJJTkcgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICB0YXhJZCBpbnQoMTEpIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlIEJPT0wsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzUGljdHVyZSBCT09MLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRHJhZnQgQk9PTCxcclxuICAgICAgICAgICAgICAgICAgICBpc0N1cnJlbnRVcGRhdGUgQk9PTCxcclxuICAgICAgICAgICAgICAgICAgICBidXNpbmVzc0lkIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBzdXBwbGllcklkIFNUUklORyBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWwgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdCBEQVRFVElNRSxcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXQgREFURVRJTUUsXHJcbiAgICAgICAgICAgICAgICAgICAgUFJJTUFSWSBLRVkgKGlkKVxyXG4gICAgICAgICAgICAgICAgYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFRBQkxFUy5CUkFOQ0hQUk9EVUNUUyxcclxuICAgICAgcXVlcnk6IGBpZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBicmFuY2hJZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgUFJJTUFSWSBLRVkgKGlkKVxyXG4gICAgICAgICAgICAgICAgYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFRBQkxFUy5WQVJJQU5UUyxcclxuICAgICAgcXVlcnk6IGBpZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2t1IFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIHVuaXQgU1RSSU5HIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdCBEQVRFVElNRSxcclxuICAgICAgICAgICAgICAgICAgICBQUklNQVJZIEtFWSAoaWQpXHJcbiAgICAgICAgICAgICAgICBgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogVEFCTEVTLlNUT0NLUyxcclxuICAgICAgcXVlcnk6IGAgaWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIGJyYW5jaElkIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50SWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgbG93U3RvY2sgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9jayBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcGx5UHJpY2UgaW50KDExKSBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldGFpbFByaWNlIGludCgxMSkgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBjYW5UcmFja2luZ1N0b2NrIEJPT0wsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0xvd1N0b2NrQWxlcnQgQk9PTCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQgREFURVRJTUUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgICAgIFBSSU1BUlkgS0VZIChpZClcclxuICAgICAgICAgICAgICAgIGAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiBUQUJMRVMuT1JERVIsXHJcbiAgICAgIHF1ZXJ5OiBgaWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIGJyYW5jaElkIFNUUklORyBOT1QgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBkZXZpY2VJZCBTVFJJTkcgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlck51bWJlciBTVFJJTkcgTk9UIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJJZCBTVFJJTkcgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgU1RSSU5HIE5PVCBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZSBTVFJJTkcgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlclR5cGUgU1RSSU5HIE5PVCBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBsaWVySWQgU1RSSU5HIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViVG90YWwgaW50KDExKSBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBsaWVySW52b2ljZU51bWJlciBTVFJJTkcgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICB0YXhSYXRlIGludCgxMSkgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICB0YXhBbW91bnQgaW50KDExKSBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdW50UmF0ZSBpbnQoMTEpIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY291bnRBbW91bnQgaW50KDExKSBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2hSZWNlaXZlZCBpbnQoMTEpIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJDaGFuZ2VEdWUgaW50KDExKSBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhbGVUb3RhbCBpbnQoMTEpIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF5bWVudElkIFNUUklORyBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyTm90ZSBTVFJJTkcgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgQk9PTCxcclxuICAgICAgICAgICAgICAgICAgICBpc0RyYWZ0IEJPT0wsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsaXZlckRhdGUgREFURVRJTUUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJEYXRlIERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdCBEQVRFVElNRSxcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXQgREFURVRJTUUsXHJcbiAgICAgICAgICAgICAgICAgICAgUFJJTUFSWSBLRVkgKGlkKVxyXG4gICAgICAgICAgICAgICAgYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFRBQkxFUy5PUkRFUkRFVEFJTFMsXHJcbiAgICAgIHF1ZXJ5OiBgIGlkIFNUUklORyBOT1QgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlcklkIFNUUklORyBOT1QgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50SWQgU1RSSU5HIE5PVCBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhbnROYW1lIFNUUklORyBOT1QgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBwcmljZSBpbnQoMTEpIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHkgaW50KDExKSBOT1QgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICB1bml0IFNUUklORyBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIHRheEFtb3VudCBpbnQoMTEpIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgdGF4UmF0ZSBpbnQoMTEpIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY291bnRBbW91bnQgaW50KDExKSBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdW50UmF0ZSBpbnQoMTEpIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViVG90YWwgaW50KDExKSBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGUgU1RSSU5HIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdCBEQVRFVElNRSxcclxuICAgICAgICAgICAgICAgICAgICBQUklNQVJZIEtFWSAoaWQpXHJcbiAgICAgICAgICAgICAgICBgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogVEFCTEVTLlNUT0NLSElTVE9SWSxcclxuICAgICAgcXVlcnk6IGBpZCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudElkIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBzdG9ja0lkIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQgU1RSSU5HLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1YW50aXR5IGludCgxMSkgTk9UIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhc29uIFNUUklORyBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGUgU1RSSU5HIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdCBEQVRFVElNRSxcclxuICAgICAgICAgICAgICAgICAgICBQUklNQVJZIEtFWSAoaWQpXHJcbiAgICAgICAgICAgICAgICBgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogVEFCTEVTLkRFVklDRSxcclxuICAgICAgcXVlcnk6IGAgaWQgaW50KDExKSBOT1QgTlVMTCBBVVRPX0lOQ1JFTUVOVCxcclxuICAgICAgICAgICAgICAgICAgICBicmFuY2hJZCBpbnQoMTEpIE5PVCBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgaW50KDExKSBOT1QgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbiBTVFJJTkcgTk9UIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbCBTVFJJTkcsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdCBEQVRFVElNRSxcclxuICAgICAgICAgICAgICAgICAgICBQUklNQVJZIEtFWSAoaWQpXHJcbiAgICAgICAgICAgICAgICBgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogVEFCTEVTLlJFQ0VJUFQsXHJcbiAgICAgIHF1ZXJ5OiBgIGlkIGludCgxMSkgTk9UIE5VTEwgQVVUT19JTkNSRU1FTlQsXHJcbiAgICAgICAgICAgICAgICAgICAgYnJhbmNoSWQgaW50KDExKSBOT1QgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBidXNpbmVzc05hbWUgaW50KDExKSBOT1QgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBkaWdpdGFsTG9nbyBTVFJJTkcgIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbnRlZExvZ28gU1RSSU5HICBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dMb2NhdGlvbiBCT09MICBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yIFNUUklORyAgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzMSBTVFJJTkcgIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczEgU1RSSU5HICBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIGNpdHkgU1RSSU5HICBOVUxMLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyVGV4dCBTVFJJTkcgIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuUG9saWN5IFNUUklORyAgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SXRlbU5vdGUgQk9PTCAgTlVMTCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsIFNUUklORyxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQgREFURVRJTUUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0IERBVEVUSU1FLFxyXG4gICAgICAgICAgICAgICAgICAgIFBSSU1BUlkgS0VZIChpZClcclxuICAgICAgICAgICAgICAgIGAsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgZGVtbzoge1xyXG4gICAgZW1haWw6ICdhZG1pbkBhZG1pbi5jb20nLFxyXG4gICAgcGFzc3dvcmQ6ICdhZG1pbicsXHJcbiAgfSxcclxuICBkZWZhdWx0TWVudTogW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAnQW5hbHl0aWNzJyxcclxuICAgICAgaWNvbjogJ2FuYWx5dGljcy5zdmcnLFxyXG4gICAgICByb3V0ZTogJ2FuYWx5dGljcycsXHJcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgICAgaXNTZXR0aW5nOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdQT1MnLFxyXG4gICAgICBpY29uOiAncG9zLnN2ZycsXHJcbiAgICAgIHJvdXRlOiAncG9zJyxcclxuICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgaXNTZXR0aW5nOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdJbnZlbnRvcnknLFxyXG4gICAgICBpY29uOiAnaW52ZW50b3J5LnN2ZycsXHJcbiAgICAgIHJvdXRlOiAnaW52ZW50b3J5JyxcclxuICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgaXNTZXR0aW5nOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdUcmFuc2FjdGlvbnMnLFxyXG4gICAgICBpY29uOiAndHJhbnNhY3Rpb24uc3ZnJyxcclxuICAgICAgcm91dGU6ICd0cmFuc2FjdGlvbnMnLFxyXG4gICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICBpc1NldHRpbmc6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ1NldHRpbmdzJyxcclxuICAgICAgaWNvbjogJ3NldHRpbmdzLnN2ZycsXHJcbiAgICAgIHJvdXRlOiAnc2V0dGluZ3MnLFxyXG4gICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICBpc1NldHRpbmc6IHRydWUsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgZGVmYXVsdFJlYXNvbnM6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ1N0b2NrIFJlY2VpdmVkJyxcclxuICAgICAgb3BlcmF0aW9uOiAnYWRkJyxcclxuICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXHJcbiAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdJbnZlbnRvcnkgUmUtY291bnQnLFxyXG4gICAgICBvcGVyYXRpb246ICdhZGQnLFxyXG4gICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcclxuICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ0RhbWFnZScsXHJcbiAgICAgIG9wZXJhdGlvbjogJ3JlbW92ZScsXHJcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxyXG4gICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnVGhlZnQnLFxyXG4gICAgICBvcGVyYXRpb246ICdyZW1vdmUnLFxyXG4gICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcclxuICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ0xvc3MnLFxyXG4gICAgICBvcGVyYXRpb246ICdyZW1vdmUnLFxyXG4gICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcclxuICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ1Jlc3RvY2sgUmV0dXJuJyxcclxuICAgICAgb3BlcmF0aW9uOiAnYWRkJyxcclxuICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXHJcbiAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKSxcclxuICAgIH0sXHJcbiAgXSxcclxuICBkZWZhdWx0Q2F0ZWdvcnk6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ0JlYXV0eSBTYWxvbicsXHJcbiAgICAgIGlkOiAnYmVhdXR5LXNhbG9uJyxcclxuICAgICAgdHlwZV9pZDogJ2JlYXV0eS1hbmQtcGVyc29uYWwtY2FyZScsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnSGFpciBTYWxvbi9CYXJiZXJzaG9wJyxcclxuICAgICAgaWQ6ICdoYWlyLXNhbG9uL2JhcmJlcnNob3AnLFxyXG4gICAgICB0eXBlX2lkOiAnYmVhdXR5LWFuZC1wZXJzb25hbC1jYXJlJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdJbmRlcGVuZGVudCBTdHlsaXN0L0JhcmJlcicsXHJcbiAgICAgIGlkOiAnaW5kZXBlbmRlbnQtc3R5bGlzdC9iYXJiZXInLFxyXG4gICAgICB0eXBlX2lkOiAnYmVhdXR5LWFuZC1wZXJzb25hbC1jYXJlJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdNYXNzYWdlIFRoZXJhcGlzdCcsXHJcbiAgICAgIGlkOiAnbWFzc2FnZS10aGVyYXBpc3QnLFxyXG4gICAgICB0eXBlX2lkOiAnYmVhdXR5LWFuZC1wZXJzb25hbC1jYXJlJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdOYWlsIFNhbG9uJyxcclxuICAgICAgaWQ6ICduYWlsLXNhbG9uJyxcclxuICAgICAgdHlwZV9pZDogJ2JlYXV0eS1hbmQtcGVyc29uYWwtY2FyZScsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnU3BhJyxcclxuICAgICAgaWQ6ICdzcGEnLFxyXG4gICAgICB0eXBlX2lkOiAnYmVhdXR5LWFuZC1wZXJzb25hbC1jYXJlJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdUYW5uaW5nIFNhbG9uJyxcclxuICAgICAgaWQ6ICd0YW5uaW5nLXNhbG9uJyxcclxuICAgICAgdHlwZV9pZDogJ2JlYXV0eS1hbmQtcGVyc29uYWwtY2FyZScsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnVGF0dG9vL1BpZXJjaW5nJyxcclxuICAgICAgaWQ6ICd0YXR0b28vcGllcmNpbmcnLFxyXG4gICAgICB0eXBlX2lkOiAnYmVhdXR5LWFuZC1wZXJzb25hbC1jYXJlJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdQaGFyYW1jeScsXHJcbiAgICAgIGlkOiAncGhhcmFtY3knLFxyXG4gICAgICB0eXBlX2lkOiAncmV0YWlsJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdHcm9jZXJ5L01hcmtldCcsXHJcbiAgICAgIGlkOiAnZ3JvY2VyeS9tYXJrZXQnLFxyXG4gICAgICB0eXBlX2lkOiAncmV0YWlsJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdQZXQgU3RvcmUnLFxyXG4gICAgICBpZDogJ3BldC1zdG9yZScsXHJcbiAgICAgIHR5cGVfaWQ6ICdyZXRhaWwnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ0VsZWN0cm9uaWNzJyxcclxuICAgICAgaWQ6ICdlbGVjdHJvbmljcycsXHJcbiAgICAgIHR5cGVfaWQ6ICdyZXRhaWwnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ0hhcmR3YXJlIFN0b3JlJyxcclxuICAgICAgaWQ6ICdoYXJkd2FyZS1zdG9yZScsXHJcbiAgICAgIHR5cGVfaWQ6ICdyZXRhaWwnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ0V5ZXdlYXInLFxyXG4gICAgICBpZDogJ2V5ZXdlYXInLFxyXG4gICAgICB0eXBlX2lkOiAncmV0YWlsJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdPdXRkb29yIE1hcmtldHMnLFxyXG4gICAgICBpZDogJ291dGRvb3ItbWFya2V0cycsXHJcbiAgICAgIHR5cGVfaWQ6ICdyZXRhaWwnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ1NwZWNpYWxpdHkgU2hvcCcsXHJcbiAgICAgIGlkOiAnc3BlY2lhbGl0eS1zaG9wJyxcclxuICAgICAgdHlwZV9pZDogJ3JldGFpbCcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnU3BvcnRpbmcgR29vZHMnLFxyXG4gICAgICBpZDogJ3Nwb3J0aW5nLWdvb2RzJyxcclxuICAgICAgdHlwZV9pZDogJ3JldGFpbCcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnSG9iYnkgU2hvcCcsXHJcbiAgICAgIGlkOiAnaG9iYnktc2hvcCcsXHJcbiAgICAgIHR5cGVfaWQ6ICdyZXRhaWwnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ0pld2VscnkgYW5kIFdhdGNoZXMnLFxyXG4gICAgICBpZDogJ2pld2VscnktYW5kLXdhdGNoZXMnLFxyXG4gICAgICB0eXBlX2lkOiAncmV0YWlsJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdGbG93ZXJzIGFuZCBHaWZ0cycsXHJcbiAgICAgIGlkOiAnZmxvd2Vycy1hbmQtZ2lmdHMnLFxyXG4gICAgICB0eXBlX2lkOiAncmV0YWlsJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBkZWZhdWx0VHlwZTogW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAnQmVhdXR5IGFuZCBQZXJzb25hbCBDYXJlJyxcclxuICAgICAgaWQ6ICdiZWF1dHktYW5kLXBlcnNvbmFsLWNhcmUnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ1JldGFpbCcsXHJcbiAgICAgIGlkOiAncmV0YWlsJyxcclxuICAgIH0sXHJcbiAgXSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGbGlwcGVyREJDb25maWcge1xyXG4gIFtrZXk6IHN0cmluZ106IGFueVxyXG5cclxuICBkYXRhYmFzZTogeyBuYW1lOiBzdHJpbmc7IGVuZ2luZTogc3RyaW5nIH1cclxuICB0YWJsZXM6IEFycmF5PHsgbmFtZTogVEFCTEU7IHF1ZXJ5OiBzdHJpbmcgfT5cclxuICBkZWZhdWx0TWVudTogQXJyYXk8TWVudT5cclxuICBkZWZhdWx0UmVhc29uczogQXJyYXk8UmVhc29uPlxyXG4gIGRlZmF1bHRUeXBlOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgY2F0ZWdvcnk6IGFueVtdIH0+XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBUYWJsZXMgPSB7XHJcbiAgdXNlcjogREVGQVVMVF9GTElQUEVSX0RCX0NPTkZJRy5kYXRhYmFzZS5uYW1lICsgJy4nICsgVEFCTEVTLlVTRVIsXHJcbiAgYnVzaW5lc3M6IERFRkFVTFRfRkxJUFBFUl9EQl9DT05GSUcuZGF0YWJhc2UubmFtZSArICcuJyArIFRBQkxFUy5CVVNJTkVTUyxcclxuICBicmFuY2g6IERFRkFVTFRfRkxJUFBFUl9EQl9DT05GSUcuZGF0YWJhc2UubmFtZSArICcuJyArIFRBQkxFUy5CUkFOQ0hFUyxcclxuICBtZW51OiBERUZBVUxUX0ZMSVBQRVJfREJfQ09ORklHLmRhdGFiYXNlLm5hbWUgKyAnLicgKyBUQUJMRVMuTUVOVSxcclxuICB0eXBlOiBERUZBVUxUX0ZMSVBQRVJfREJfQ09ORklHLmRhdGFiYXNlLm5hbWUgKyAnLicgKyBUQUJMRVMuVFlQRVMsXHJcbiAgYnVzaW5lc3NDYXRlZ29yeTogREVGQVVMVF9GTElQUEVSX0RCX0NPTkZJRy5kYXRhYmFzZS5uYW1lICsgJy4nICsgVEFCTEVTLkJVU0lORVNTQ0FURUdPUlksXHJcbiAgdXNlckJ1c2luZXNzOiBERUZBVUxUX0ZMSVBQRVJfREJfQ09ORklHLmRhdGFiYXNlLm5hbWUgKyAnLicgKyBUQUJMRVMuVVNFUkJVU0lORVNTLFxyXG4gIHRheGVzOiBERUZBVUxUX0ZMSVBQRVJfREJfQ09ORklHLmRhdGFiYXNlLm5hbWUgKyAnLicgKyBUQUJMRVMuVEFYRVMsXHJcbiAgdmFyaWFudHM6IERFRkFVTFRfRkxJUFBFUl9EQl9DT05GSUcuZGF0YWJhc2UubmFtZSArICcuJyArIFRBQkxFUy5WQVJJQU5UUyxcclxuICBwcm9kdWN0czogREVGQVVMVF9GTElQUEVSX0RCX0NPTkZJRy5kYXRhYmFzZS5uYW1lICsgJy4nICsgVEFCTEVTLlBST0RVQ1RTLFxyXG4gIHN0b2NrczogREVGQVVMVF9GTElQUEVSX0RCX0NPTkZJRy5kYXRhYmFzZS5uYW1lICsgJy4nICsgVEFCTEVTLlNUT0NLUyxcclxuICBicmFuY2hQcm9kdWN0czogREVGQVVMVF9GTElQUEVSX0RCX0NPTkZJRy5kYXRhYmFzZS5uYW1lICsgJy4nICsgVEFCTEVTLkJSQU5DSFBST0RVQ1RTLFxyXG4gIHJlYXNvbnM6IERFRkFVTFRfRkxJUFBFUl9EQl9DT05GSUcuZGF0YWJhc2UubmFtZSArICcuJyArIFRBQkxFUy5SRUFTT04sXHJcbiAgb3JkZXI6IERFRkFVTFRfRkxJUFBFUl9EQl9DT05GSUcuZGF0YWJhc2UubmFtZSArICcuJyArIFRBQkxFUy5PUkRFUixcclxuICBvcmRlckRldGFpbHM6IERFRkFVTFRfRkxJUFBFUl9EQl9DT05GSUcuZGF0YWJhc2UubmFtZSArICcuJyArIFRBQkxFUy5PUkRFUkRFVEFJTFMsXHJcbiAgc3RvY2tIaXN0b3J5OiBERUZBVUxUX0ZMSVBQRVJfREJfQ09ORklHLmRhdGFiYXNlLm5hbWUgKyAnLicgKyBUQUJMRVMuU1RPQ0tISVNUT1JZLFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUG91Y2hDb25maWcgPSB7XHJcbiAgY2hhbm5lbDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYW5uZWwnKSxcclxuICBzZXNzaW9uSWQ6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uSWQnKSxcclxuICAvLyBidWNrZXQ6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdidWNrZXQnKSxcclxuICBidWNrZXQ6ICdtYWluJyxcclxuICBzeW5jVXJsOiAnaHR0cDovL3llZ29ib3guY29tOjQ5ODUvbWFpbicsXHJcbiAgY2FuU3luYzogdHJ1ZSxcclxuICB1c2VyOiAnYWRtaW4nLFxyXG4gIHBhc3N3b3JkOiAnc2luZ2x3b3JsZCcsXHJcbiAgVGFibGVzOiB7XHJcbiAgICB1c2VyOiBUQUJMRVMuVVNFUiArICdfJyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGFubmVsJyksXHJcbiAgICBidXNpbmVzczogVEFCTEVTLkJVU0lORVNTICsgJ18nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYW5uZWwnKSxcclxuICAgIGJyYW5jaGVzOiBUQUJMRVMuQlJBTkNIRVMgKyAnXycgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2hhbm5lbCcpLFxyXG4gICAgbWVudXM6IFRBQkxFUy5NRU5VLFxyXG4gICAgYnVzaW5lc3NUeXBlczogVEFCTEVTLlRZUEVTLFxyXG4gICAgYnVzaW5lc3NDYXRlZ29yaWVzOiBUQUJMRVMuQlVTSU5FU1NDQVRFR09SWSxcclxuICAgIGJ1c2luZXNzVXNlcnM6IFRBQkxFUy5VU0VSQlVTSU5FU1MgKyAnXycgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2hhbm5lbCcpLFxyXG4gICAgdGF4ZXM6IFRBQkxFUy5UQVhFUyArICdfJyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGFubmVsJyksXHJcbiAgICB2YXJpYW50czogVEFCTEVTLlZBUklBTlRTICsgJ18nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYW5uZWwnKSxcclxuICAgIHByb2R1Y3RzOiBUQUJMRVMuUFJPRFVDVFMgKyAnXycgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2hhbm5lbCcpLFxyXG4gICAgYnJhbmNoUHJvZHVjdHM6IFRBQkxFUy5CUkFOQ0hQUk9EVUNUUyArICdfJyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGFubmVsJyksXHJcbiAgICByZWFzb25zOiBUQUJMRVMuUkVBU09OICsgJ18nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYW5uZWwnKSxcclxuICAgIG9yZGVyczogVEFCTEVTLk9SREVSICsgJ18nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYW5uZWwnKSxcclxuICAgIG9yZGVyRGV0YWlsczogVEFCTEVTLk9SREVSREVUQUlMUyArICdfJyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGFubmVsJyksXHJcbiAgICBzdG9ja0hpc3RvcmllczogVEFCTEVTLlNUT0NLSElTVE9SWSArICdfJyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGFubmVsJyksXHJcbiAgICBzdWJzY3JpcHRpb246IFRBQkxFUy5TVUJTQ1JJUFRJT04gKyAnXycgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2hhbm5lbCcpLFxyXG4gICAgc3RvY2tzOiBUQUJMRVMuU1RPQ0tTICsgJ18nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYW5uZWwnKSxcclxuICB9LFxyXG59XHJcbi8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGFzdG5hbWVcIiwgXCJTbWl0aFwiKTtcclxuIl19