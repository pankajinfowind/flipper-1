import { PriceVariant } from './price-variant';
import { Stock } from './stocks';
import { Product } from './product';
export declare class Variant {
    id: string;
    sku: any;
    name: string;
    productName?: string;
    categoryName?: string;
    brandName?: string;
    productId?: any;
    supplyPrice?: any;
    retailPrice?: any;
    wholeSalePrice?: any;
    unit?: string;
    isActive?: boolean;
    priceVariant?: PriceVariant;
    stock?: Stock;
    product?: Product;
    markup?: any;
    syncedOnline?: boolean;
    createdAt: string;
    updatedAt: string;
    table: string;
    docId?: string;
    channels: Array<string>;
    channel?: string;
    userId?: string;
    constructor(params?: object);
}
//# sourceMappingURL=variant.d.ts.map