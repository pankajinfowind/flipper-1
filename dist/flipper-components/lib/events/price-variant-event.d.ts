import { BusEvent } from '@enexus/flipper-event';
import { PriceVariant } from '../entries';
export declare class PriceVariantEvent extends BusEvent {
    priceVariant: PriceVariant;
    static readonly CHANNEL = "priceVariants";
    constructor(priceVariant: PriceVariant);
}
//# sourceMappingURL=price-variant-event.d.ts.map