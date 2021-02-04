import { BusEvent } from '@enexus/flipper-event';
import { Taxes } from '../entries/taxes';
export declare class TaxesEvent extends BusEvent {
    taxes: Taxes[];
    action: string;
    static readonly CHANNEL = "taxes";
    constructor(taxes: Taxes[], action?: string);
}
//# sourceMappingURL=taxes-event.d.ts.map