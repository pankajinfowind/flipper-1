import { BusEvent } from '@enexus/flipper-event';
import { Business } from '../entries';
export declare class BusinessesEvent extends BusEvent {
    businesses: Business[];
    static readonly CHANNEL = "businesses";
    constructor(businesses: Business[]);
}
//# sourceMappingURL=businesses-event.d.ts.map