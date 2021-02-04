import { BusEvent } from '@enexus/flipper-event';
import { StockHistory } from '../entries/stock-history';
export declare class DraftStockHistoryEvent extends BusEvent {
    draftStockHistory: StockHistory[];
    action: string;
    static readonly CHANNEL = "draftStockHistory";
    constructor(draftStockHistory: StockHistory[], action?: string);
}
//# sourceMappingURL=draft-stockHistory-event.d.ts.map