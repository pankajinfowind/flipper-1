import { BusEvent } from '@enexus/flipper-event';
import { Subscription } from '../entries';
export declare class UserSubscriptionEvent extends BusEvent {
    subscription: Subscription;
    static readonly CHANNEL = "user-subscription";
    constructor(subscription: Subscription);
}
//# sourceMappingURL=user-subscription-event.d.ts.map