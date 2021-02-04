import { BusEvent } from '@enexus/flipper-event';
import { Order } from '../entries/order';
export declare class OrderEvent extends BusEvent {
    order: Order;
    static readonly CHANNEL = "orders";
    constructor(order: Order);
}
//# sourceMappingURL=order-event.d.ts.map