import { BusEvent } from '@enexus/flipper-event';
import { Stock } from '../entries/stocks';
export declare class StocksEvent extends BusEvent {
    stocks: Stock[];
    static readonly CHANNEL = "stocks";
    constructor(stocks: Stock[]);
}
//# sourceMappingURL=stocks-event.d.ts.map