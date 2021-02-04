import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { OrderDetails } from '@enexus/flipper-components';
export declare class BasicShoppingListComponent implements OnChanges {
    loading: boolean;
    action: string;
    private getOrderItems;
    updateQtyEmit: EventEmitter<OrderDetails>;
    removeItemEmit: EventEmitter<OrderDetails>;
    set orderItems(value: OrderDetails[]);
    get orderItems(): OrderDetails[];
    updateQuantity(item: OrderDetails, action?: any): void;
    removeItem(item: OrderDetails): void;
    ngOnChanges(changes: SimpleChanges): void;
}
//# sourceMappingURL=basic-shopping-list.component.d.ts.map