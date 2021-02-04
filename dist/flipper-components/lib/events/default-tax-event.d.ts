import { BusEvent } from '@enexus/flipper-event';
import { Taxes } from '../entries/taxes';
export declare class DefaultTaxesEvent extends BusEvent {
    defaultTax: Taxes;
    action: string;
    static readonly CHANNEL = "defaultTax";
    constructor(defaultTax: Taxes, action?: string);
}
//# sourceMappingURL=default-tax-event.d.ts.map