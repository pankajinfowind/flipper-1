import { BusEvent } from '@enexus/flipper-event';
import { Stock } from '../entries/stocks';
export declare class DraftStocksEvent extends BusEvent {
    draftStocks: Stock[];
    action: string;
    static readonly CHANNEL = "draftStocks";
    constructor(draftStocks: Stock[], action?: string);
}
//# sourceMappingURL=draft-stocks-event.d.ts.map