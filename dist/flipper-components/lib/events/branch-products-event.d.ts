import { BusEvent } from '@enexus/flipper-event';
import { BranchProducts } from '../entries/branch-products';
export declare class BranchProductsEvent extends BusEvent {
    branchProducts: BranchProducts[];
    static readonly CHANNEL = "branchProducts";
    constructor(branchProducts: BranchProducts[]);
}
//# sourceMappingURL=branch-products-event.d.ts.map