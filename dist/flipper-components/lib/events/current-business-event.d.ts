import { BusEvent } from '@enexus/flipper-event';
import { Business } from '../entries';
export declare class CurrentBusinessEvent extends BusEvent {
    business: Business;
    action: string;
    static readonly CHANNEL = "current-business";
    constructor(business: Business, action?: string);
}
//# sourceMappingURL=current-business-event.d.ts.map