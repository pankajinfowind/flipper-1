import { BusEvent } from '@enexus/flipper-event';
import { Variant } from '../entries/variant';
export declare class VariantEvent extends BusEvent {
    variant: Variant;
    static readonly CHANNEL = "variants";
    constructor(variant: Variant);
}
//# sourceMappingURL=variant-event.d.ts.map