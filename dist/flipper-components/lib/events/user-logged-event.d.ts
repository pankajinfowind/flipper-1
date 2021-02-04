import { BusEvent } from '@enexus/flipper-event';
import { User } from '../entries';
export declare class UserLoggedEvent extends BusEvent {
    user: User;
    static readonly CHANNEL = "current-user";
    constructor(user: User);
}
//# sourceMappingURL=user-logged-event.d.ts.map