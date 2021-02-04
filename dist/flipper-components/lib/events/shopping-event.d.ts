import { BusEvent } from '@enexus/flipper-event';
import { OrderDetails } from '../entries';
export declare class ShoppingEvent extends BusEvent {
    shopping: OrderDetails;
    static readonly CHANNEL = "shoppings";
    constructor(shopping: OrderDetails);
}
//# sourceMappingURL=shopping-event.d.ts.map