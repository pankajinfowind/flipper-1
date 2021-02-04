import { EventEmitter, ElementRef } from '@angular/core';
import { Order, CalculateTotalClassPipe, FindKeyPipe, RoundNumberPipe } from '@enexus/flipper-components';
import { DialogService } from '@enexus/flipper-dialog';
export declare class CalculatorComponent {
    private totalPipe;
    dialog: DialogService;
    private randPipe;
    private findKeyPipe;
    set currentOrder(order: Order);
    get currentOrder(): Order;
    set collectCashCompleted(inputed: object);
    get collectCashCompleted(): object;
    closeModelEmit: EventEmitter<boolean>;
    constructor(totalPipe: CalculateTotalClassPipe, dialog: DialogService, randPipe: RoundNumberPipe, findKeyPipe: FindKeyPipe);
    currentNumber: string;
    isNegativeNumber: boolean;
    private isCurrentOrder;
    saveOrderUpdatedEmit: EventEmitter<Order>;
    collectCashEmit: EventEmitter<boolean>;
    currency: string;
    private didCollectCashCompleted;
    isCalculatorNumOpen: boolean;
    calculatorNums: any[];
    searchInputElement: ElementRef;
    getCollectCashCompleted(inputed: any): import("rxjs").Subscription;
    onKeydownHandler(event: KeyboardEvent): void;
    clear(): void;
    getDecimal(): void;
    getNumberOnKeyPress(v: string): void;
    getNumber(v: string): import("rxjs").Subscription;
    makeTotal(): import("rxjs").Subscription;
    onKeyFocused(key: any): boolean;
    collectCash(): import("rxjs").Subscription | import("rxjs").Observable<void>;
}
//# sourceMappingURL=calculator.component.d.ts.map