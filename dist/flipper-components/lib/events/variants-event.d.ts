import { BusEvent } from '@enexus/flipper-event';
import { Variant } from '../entries/variant';
export declare class VariantsEvent extends BusEvent {
    variants: Variant[];
    static readonly CHANNEL = "variants";
    constructor(variants: Variant[]);
}
//# sourceMappingURL=variants-event.d.ts.map