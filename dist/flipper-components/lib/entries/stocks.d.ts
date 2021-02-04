export declare class Stock {
    id: string;
    branchId: string;
    variantId: string;
    productId?: any;
    reasonId?: any;
    unitId?: any;
    lowStock?: any;
    currentStock?: any;
    supplyPrice?: any;
    retailPrice?: any;
    wholeSalePrice?: 0;
    active?: boolean;
    inStock?: any;
    syncedOnline?: boolean;
    canTrackingStock?: boolean;
    showLowStockAlert?: boolean;
    createdAt: string;
    updatedAt: string;
    table: string;
    docId?: string;
    channels: Array<string>;
    channel?: string;
    userId?: string;
    constructor(params?: object);
}
//# sourceMappingURL=stocks.d.ts.map