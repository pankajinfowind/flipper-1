import { BusEvent } from '@enexus/flipper-event';
import { Branch } from '../entries';
export declare class CurrentBranchEvent extends BusEvent {
    branch: Branch;
    action: string;
    static readonly CHANNEL = "current-branch";
    constructor(branch: Branch, action?: string);
}
//# sourceMappingURL=current-branch-event.d.ts.map