import { BusEvent } from '@enexus/flipper-event';
import { Branch } from '../entries/branch';
export declare class BranchesEvent extends BusEvent {
    branches: Branch[];
    static readonly CHANNEL = "branches";
    constructor(branches: Branch[]);
}
//# sourceMappingURL=branches-event.d.ts.map