import { BusEvent } from '@enexus/flipper-event';
import { Price } from '../entries';
export declare class PriceEvent extends BusEvent {
    price: Price;
    static readonly CHANNEL = "prices";
    constructor(price: Price);
}
//# sourceMappingURL=price-event.d.ts.map