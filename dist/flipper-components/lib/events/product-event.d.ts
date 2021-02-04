import { BusEvent } from '@enexus/flipper-event';
import { Product } from '../entries';
export declare class ProductEvent extends BusEvent {
    product: Product;
    static readonly CHANNEL = "products";
    constructor(product: Product);
}
//# sourceMappingURL=product-event.d.ts.map