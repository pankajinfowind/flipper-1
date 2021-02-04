import { BusEvent } from '@enexus/flipper-event';
import { Product } from '../entries/product';
export declare class DraftProductEvent extends BusEvent {
    draftProduct: Product;
    action: string;
    static readonly CHANNEL = "draftProduct";
    constructor(draftProduct: Product, action?: string);
}
//# sourceMappingURL=draft-product-event.d.ts.map