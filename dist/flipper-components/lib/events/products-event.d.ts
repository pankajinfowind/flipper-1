import { BusEvent } from '@enexus/flipper-event';
import { Product } from '../entries/product';
export declare class ProductsEvent extends BusEvent {
    products: Product[];
    static readonly CHANNEL = "products";
    constructor(products: Product[]);
}
//# sourceMappingURL=products-event.d.ts.map