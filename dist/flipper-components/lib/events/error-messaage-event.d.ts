import { BusEvent } from '@enexus/flipper-event';
export declare class ErrorMessageEvent extends BusEvent {
    errorMessage: any;
    static readonly CHANNEL = "errorMessage";
    constructor(errorMessage: any);
}
//# sourceMappingURL=error-messaage-event.d.ts.map