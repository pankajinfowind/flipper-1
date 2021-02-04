import { BusEvent } from '@enexus/flipper-event';
import { Stock } from '../entries/stocks';
export declare class CurrentStockEvent extends BusEvent {
    currentStock: Stock;
    action: string;
    static readonly CHANNEL = "currentStock";
    constructor(currentStock: Stock, action?: string);
}
//# sourceMappingURL=current-stock-event.d.ts.map