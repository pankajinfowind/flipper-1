import { BusEvent } from '@enexus/flipper-event';
import { Variant } from '../entries/variant';
export declare class DraftVariantsEvent extends BusEvent {
    draftVariants: Variant[];
    action: string;
    static readonly CHANNEL = "draftVariants";
    constructor(draftVariants: Variant[], action?: string);
}
//# sourceMappingURL=draft-variants-event.d.ts.map