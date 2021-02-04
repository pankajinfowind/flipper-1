import { Component, Output, EventEmitter, Input, ViewEncapsulation, ChangeDetectionStrategy, HostListener, } from '@angular/core';
import { CalculateTotalClassPipe, MergeArryByIdPipe, ArrayRemoveItemPipe, } from '@enexus/flipper-components';
import { BehaviorSubject } from 'rxjs';
import { DialogService, DialogSize } from '@enexus/flipper-dialog';
import { UpdatePriceDialogComponent } from '../common/update-price-dialog/update-price-dialog.component';
import { AddCartItemDialogComponent } from '../common/add-cart-item-dialog/add-cart-item-dialog.component';
export class FlipperBasicPosComponent {
    constructor(dialog, totalPipe) {
        this.dialog = dialog;
        this.totalPipe = totalPipe;
        this.updateQtyEmit = new EventEmitter();
        this.searchEmitValue = new EventEmitter();
        this.addToCartEmit = new EventEmitter();
        this.saveOrderUpdatedEmit = new EventEmitter();
        this.updateOrderDetailsEmit = new EventEmitter();
        this.didCollectCashEmit = new EventEmitter();
        this.action = '';
        this.orderItems$ = new BehaviorSubject([]);
        this.canfoundVariant = [];
        this.isCurrentOrder = null;
        this.userClosedModel = false;
        this.setTaxes = [];
        this.currency = 'RWF';
        this.setCartFocused = null;
        this.didCollectCashCompleted = { isCompleted: false, collectedOrder: null };
    }
    set foundVariant(value) {
        this.canfoundVariant = value;
    }
    get foundVariant() {
        return this.canfoundVariant;
    }
    //taxes
    set taxes(value) {
        this.setTaxes = value;
    }
    get taxes() {
        return this.setTaxes;
    }
    set currentOrder(order) {
        this.isCurrentOrder = order;
        this.cartFocused = order && order.orderItems.length > 0 ? order.orderItems[0] : null;
    }
    get currentOrder() {
        return this.isCurrentOrder;
    }
    set cartFocused(cart) {
        this.setCartFocused = cart;
    }
    get cartFocused() {
        return this.setCartFocused;
    }
    // didCloseModel
    set userDidCloseModel(m) {
        this.userClosedModel = m;
    }
    get userDidCloseModel() {
        return this.userClosedModel;
    }
    // collectCashCompleted
    set collectCashCompleted(inputed) {
        this.didCollectCashCompleted = inputed;
    }
    get collectCashCompleted() {
        return this.didCollectCashCompleted;
    }
    onKeydownHandler(event) {
        // delete key
        if (this.cartFocused) {
            if (event.key === 'Delete') {
                this.removeItem(this.cartFocused);
            }
            if (event.shiftKey && event.key === '+') {
                // shift + (+)
                this.updateQuantity(this.cartFocused, '+');
            }
            if (event.shiftKey && event.key === '-') {
                // shift + (-)
                this.updateQuantity(this.cartFocused, '-');
            }
        }
        if (event.shiftKey && event.key === 'K') {
            // shift + k
            this.keyBoardShortCuts();
        }
        if (event.ctrlKey && event.key === 'N') {
            // shift + k
            this.addCartItem();
        }
    }
    keyBoardShortCuts() {
        this.dialog.keyBoardShortCuts();
    }
    searchPosProduct(event) {
        if (event) {
            this.searchEmitValue.emit(event);
        }
    }
    addToCart(item, updateProduct = false) {
        if (updateProduct) {
            return this.dialog.open(UpdatePriceDialogComponent, DialogSize.SIZE_SM, item.price).subscribe(result => {
                if (result !== 'close') {
                    if (result.price && result.price > 0) {
                        this.addToCartEmit.emit(result);
                    }
                }
            });
        }
        else {
            this.addToCartEmit.emit(item);
        }
    }
    updatePrice(item) {
        return this.dialog.open(UpdatePriceDialogComponent, DialogSize.SIZE_SM, item.price).subscribe(result => {
            if (result !== 'close') {
                if (result.price && result.price > 0) {
                    item.price = result.price;
                    item.subTotal = item.quantity * item.price;
                    this.updateQty(item);
                }
            }
        });
    }
    addCartItem() {
        return this.dialog.open(AddCartItemDialogComponent, DialogSize.SIZE_MD, this.taxes).subscribe(result => {
            if (result !== 'close' || result.price > 0 || result.quantity > 0) {
                this.addToCart(result);
            }
        });
    }
    updateQty(item) {
        this.updateOrderDetailsEmit.emit({ action: 'UPDATE', item });
    }
    removeItem(item) {
        this.updateOrderDetailsEmit.emit({ action: 'DELETE', item });
    }
    saveOrderUpdated(event) {
        const order = event ? event : this.currentOrder;
        this.saveOrderUpdatedEmit.emit(order);
    }
    updateQuantity(item, action = null) {
        const lastQty = item.quantity;
        this.action = action;
        this.canSetCartFocused(item);
        if (this.action === '-') {
            item.quantity = item.quantity - 1;
            if (item.quantity <= 0) {
                this.dialog
                    .message('Failure Message', 'Negative quantity is not allowed.', 'Failure', 'SIZE_SM')
                    .subscribe(() => {
                    item.quantity = lastQty;
                });
                item.quantity = lastQty;
            }
            item.subTotal = item.price * item.quantity;
            this.updateQty(item);
        }
        else if (this.action === '+') {
            item.quantity = item.quantity + 1;
            item.subTotal = item.price * item.quantity;
            this.updateQty(item);
        }
    }
    canSetCartFocused(item) {
        this.cartFocused = item;
    }
    collectCash(event) {
        this.didCollectCashEmit.emit(event);
    }
    closeModel(event) {
        this.userDidCloseModel = event;
    }
}
FlipperBasicPosComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-basic-pos',
                template: "<div class=\"row\">\r\n\r\n  <div class=\"column-lg\">\r\n    <div class=\"search-card\">\r\n      <table>\r\n        <tr>\r\n          <td style=\"width:90%\">\r\n            <flipper-search-box [foundVariant]=\"foundVariant\" [currency]=\"currency\" (addToCartEmit)=\"addToCart($event)\"\r\n              (searchEmitValue)=\"searchPosProduct($event)\" [didUserCloseModel]=\"userDidCloseModel\">\r\n            </flipper-search-box>\r\n          </td>\r\n          <td style=\"width:10%\">\r\n            <button (click)=\"addCartItem()\" class=\"button-default button--secondary ml-3\">\r\n              <img [src]=\"'./assets/icons/plus.svg'\" alt=\"search\" class=\"icon-img\" style=\"position: relative;top: 5.5px;\">\r\n            </button>\r\n          </td>\r\n\r\n        </tr>\r\n      </table>\r\n      <button (click)=\"keyBoardShortCuts()\" class=\"kbd-hotkeys-button\"><svg class=\"svg-icon svg-icon-keyboard\"\r\n          viewBox=\"0 0 32 32\">\r\n          <path\r\n            d=\"M24.133 8C25.72 8 27 9.344 27 11v10c0 1.652-1.29 3-2.867 3H6.867C5.28 24 4 22.656 4 21V11c0-1.65 1.29-3 2.867-3h17.266zm-.075 2H6.942c-.51 0-.942.448-.942 1v10c0 .555.422 1 .942 1h17.116c.51 0 .942-.448.942-1V11c0-.555-.422-1-.942-1zM8.801 18c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2H7.2c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm15 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm-2.992 0c.106 0 .191.086.191.2v1.6c0 .11-.095.2-.19.2H10.19a.193.193 0 0 1-.19-.2v-1.6c0-.11.095-.2.19-.2h10.62zM9.801 15c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2H8.2c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm2-3c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm-3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm-3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm-3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm-6 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2H7.2c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6z\">\r\n          </path>\r\n        </svg>\r\n      </button>\r\n    </div>\r\n\r\n\r\n\r\n    <div class=\"shoppinglist\" *ngIf=\"currentOrder && currentOrder.orderItems && currentOrder.orderItems.length > 0\">\r\n\r\n\r\n      <div class=\"item-lists\">\r\n\r\n        <mat-list *ngIf=\"currentOrder.orderItems.length > 0\">\r\n          <div mat-subheader>Items({{currentOrder.orderItems.length}})</div>\r\n\r\n          <!-- {{currentOrder.orderItems|json}} -->\r\n          <flipper-autocomplete *ngFor=\"let item of  currentOrder.orderItems; let i = index;\">\r\n            <mat-divider></mat-divider>\r\n            <mat-list-item (click)=\"canSetCartFocused(item)\" [class.setCartFocused]=\"cartFocused==item\">\r\n              <!-- <img [src]=\"'./assets/icons/archive-3.svg'\" style=\"width:48px\"> -->\r\n              <div mat-line>\r\n                <span>\r\n                  {{item.variantName=='Regular'?item.productName:item.variantName}} |  SKU:{{item.sku}}\r\n                </span>\r\n\r\n              </div>\r\n              <div mat-line>\r\n                <span *ngIf=\"item.canTrackingStock\">In stock({{item.currentStock}}) of </span>\r\n                &nbsp;\r\n                |&nbsp;\r\n                <a class=\"link\" (click)=\"updatePrice(item)\">\r\n                  {{currency}} {{item.price}}</a><span *ngIf=\"item.unit\">{{item.unit?'/'+item.unit:''}}</span>\r\n                  &nbsp;\r\n                |&nbsp;\r\n                <span class=\"details\" *ngIf=\"item.productName; else noProduct\">{{item.productName}}</span>\r\n                <ng-template #noProduct>\r\n                  <span class=\"details\">\r\n                    {{item.productName}}\r\n                  </span>\r\n                  </ng-template>\r\n\r\n                  &nbsp;\r\n                |&nbsp;\r\n                Quantity({{item.quantity}}<span *ngIf=\"item.unit\">{{item.unit?'/'+item.unit:''}}</span>)\r\n\r\n              </div>\r\n              <div style=\"float: right;position: relative;right: 0;margin-top:-5px\">\r\n                <table>\r\n                  <tr>\r\n                    <td>\r\n                      <button type=\"button\" class=\"update-qty\">\r\n                        <table>\r\n                          <tr>\r\n                            <td>\r\n                              <img [src]=\"'./assets/icons/minus.svg'\" alt=\"minus\" (click)=\"updateQuantity(item,'-')\">\r\n                            </td>\r\n                            <td>{{item.quantity}}</td>\r\n                            <td>\r\n                              <img [src]=\"'./assets/icons/plus.svg'\" alt=\"plus\" (click)=\"updateQuantity(item,'+')\">\r\n                            </td>\r\n                          </tr>\r\n                        </table>\r\n                      </button>\r\n                    </td>\r\n                    <td>\r\n                      <button class=\"remove-item\" type=\"button\">\r\n                        <img [src]=\"'./assets/icons/x.svg'\" alt=\"delete\" class=\"delete-icon\" (click)=\"removeItem(item)\">\r\n                      </button>\r\n                    </td>\r\n\r\n                  </tr>\r\n                </table>\r\n              </div>\r\n            </mat-list-item>\r\n\r\n\r\n          </flipper-autocomplete>\r\n          <mat-divider *ngIf=\"currentOrder.orderItems.length > 0\"></mat-divider>\r\n        </mat-list>\r\n\r\n        <!-- <flipper-autocomplete *ngFor=\"let item of  currentOrder.orderItems; let i = index;\">\r\n          <mat-option (click)=\"canSetCartFocused(item)\" [class.setCartFocused]=\"cartFocused==item\">\r\n\r\n\r\n\r\n            <div class=\"icon-2\">\r\n              <img [src]=\"'./assets/icons/archive-3.svg'\" class=\"icon-img\">\r\n            </div>\r\n            <div class=\"item\">\r\n              <span class=\"item-title\">\r\n                <span\r\n                  *ngIf=\"item.variant; else noVariant\">{{item.variant.name=='Regular'?item.product.name:item.variant.name}}\r\n                </span>\r\n                <ng-template #noVariant>\r\n                  <span>\r\n                    {{item.variantName}}\r\n                  </span>\r\n                </ng-template>\r\n              </span>\r\n              <div class=\"item-sub-title\">\r\n                <span class=\"details\">\r\n                  <span *ngIf=\"item.stock && item.stock.canTrackingStock\">In stock({{item.stock.currentStock}}) of\r\n                  </span>\r\n\r\n                  <span>\r\n                    <a class=\"link\" (click)=\"updatePrice(item)\">\r\n                      {{currency}} {{item.price}}</a><span *ngIf=\"item.unit\">{{item.unit?'/'+item.unit:''}}</span>\r\n                  </span>\r\n                </span>\r\n                <span class=\"details\" *ngIf=\"item.product; else noProduct\">{{item.product.name}}</span>\r\n                <ng-template #noProduct>\r\n                  <span class=\"details\">\r\n                    {{item.productName}}\r\n                  </span>\r\n                </ng-template>\r\n                <span class=\"details\">\r\n                  <div class=\"oval\"></div> &nbsp;&nbsp; Quantity({{item.quantity}}<span\r\n                    *ngIf=\"item.unit\">{{item.unit?'/'+item.unit:''}}</span>)\r\n                </span>\r\n              </div>\r\n\r\n\r\n            </div>\r\n            <div class=\"remove-item\">\r\n\r\n              <img [src]=\"'./assets/icons/x.svg'\" class=\"delete-icon\" (click)=\"removeItem(item)\">\r\n\r\n            </div>\r\n            <button type=\"button\" class=\"update-qty\">\r\n              <table>\r\n                <tr>\r\n                  <td>\r\n                    <img [src]=\"'./assets/icons/minus.svg'\" (click)=\"updateQuantity(item,'-')\">\r\n                  </td>\r\n                  <td>{{item.quantity}}</td>\r\n                  <td>\r\n                    <img [src]=\"'./assets/icons/plus.svg'\" (click)=\"updateQuantity(item,'+')\">\r\n                  </td>\r\n                </tr>\r\n              </table>\r\n            </button>\r\n\r\n          </mat-option>\r\n\r\n        </flipper-autocomplete> -->\r\n      </div>\r\n    </div>\r\n\r\n    <flipper-message (click)=\"addCartItem()\" *ngIf=\"currentOrder && currentOrder.orderItems.length===0\"\r\n      title=\"Search Product!\"\r\n      message=\"No Cart Item(s), Please search an item from inventory or click to + button to start shopping!\">\r\n    </flipper-message>\r\n\r\n    <flipper-message *ngIf=\"!currentOrder\" title=\"No Order!\" message=\"No current order created!\">\r\n    </flipper-message>\r\n  </div>\r\n  <div class=\"column-sm\">\r\n    <span *ngIf=\"currentOrder\" style=\"position: relative;left: 15px;top: 5px;\"><b>Order Number #\r\n        {{currentOrder.orderNumber}}</b></span><br />\r\n    <flipper-calculator [currentOrder]=\"currentOrder\" [currency]=\"currency\"\r\n      [collectCashCompleted]=\"collectCashCompleted\" (collectCashEmit)=\"collectCash($event)\"\r\n      (saveOrderUpdatedEmit)=saveOrderUpdated($event) (closeModelEmit)=\"closeModel($event)\">\r\n    </flipper-calculator>\r\n\r\n  </div>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CalculateTotalClassPipe, MergeArryByIdPipe, ArrayRemoveItemPipe],
                styles: [".mat-divider{border-top-color:#3f5ec6!important;border-top-style:dotted;border-top-width:2px;color:#3f5ec6!important;display:block;margin:0}.remove-item{border:1px solid #3f5ec6;border-radius:2px;float:right;height:50px;margin-left:8px;position:relative;right:0;width:50.3px}.remove-item .delete-icon{color:#1b2125;font-family:Roboto;font-size:22px;font-stretch:normal;font-style:normal;font-weight:500;height:40px;letter-spacing:normal;line-height:normal;position:relative;text-align:center;width:16px}.update-qty{border:1px solid #3f5ec6;border-radius:2px;float:right;height:50px;margin-left:8px;position:relative;right:0;width:123.3px}.update-qty table{width:100%}.update-qty table tr td{color:#1b2125;font-family:Roboto;font-size:22px;font-stretch:normal;font-style:normal;font-weight:500;height:40px;letter-spacing:normal;line-height:normal;position:relative;text-align:center;width:16px}.oval{background-color:#53be6d;border-radius:50px;bottom:0;height:8px;left:0;position:absolute;right:0;top:5px;width:8px}.details{color:#202124;display:inline-block;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:19px;letter-spacing:-.05px;line-height:normal;position:relative;width:auto}.row:after{clear:both;content:\"\";display:table}.row{display:flex;flex-wrap:wrap;list-style:none;margin:0}.row .row:after{clear:both;content:\"\";display:table}.row .column-sm{border-radius:.25rem;box-shadow:0 20px 40px -14px rgba(0,0,0,.25);float:right;padding:10px;width:35%}.row .column-sm flipper-calculator{display:flex;height:96vh;padding:.8rem}.row .column-lg{border-radius:.25rem;box-shadow:0 5px 4px -4px rgba(0,0,0,.25);display:flex;flex-direction:column;float:left;height:100vh;overflow:hidden;padding:10px;width:65%}.row .column-lg .search-card{display:flex}.row .column-lg .search-card flipper-search-box{display:flex;width:100%}.row .column-lg .search-card .kbd-hotkeys-button{background-color:#d6e8fa;border:1px solid #d6e8fa;border-radius:2px;bottom:0;color:#1b2733;font-stretch:normal;font-style:normal;font-weight:500;height:40px;left:0;letter-spacing:1.25px;line-height:1.14;opacity:.95;padding:4px;position:relative;text-align:center;top:9px;width:70px}.row .column-lg .search-card .kbd-hotkeys-button .svg-icon-keyboard{bottom:12px;position:relative}.row .column-lg flipper-message{display:flex;flex-direction:column;overflow:hidden;position:relative;top:50px;width:100%}.row .column-lg .shoppinglist{display:flex;height:100vh;position:relative;top:35px;width:94%}.row .column-lg .shoppinglist .item-lists{height:78vh;overflow:auto;width:100%}.row .column-lg .shoppinglist .item-lists flipper-autocomplete{position:relative;width:100%}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .setCartFocused{border-left-color:#3f5ec6!important;border-left-style:dotted;border-left-width:2px;border-right-color:#3f5ec6!important;border-right-style:dotted;border-right-width:2px;box-shadow:0 1px 1px 1px #3f5ec6;color:#3f5ec6!important}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option{background-color:#fff;border-top:4px solid #fcfeff;height:83px}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .item{display:inline-table;position:relative}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .item .item-sub-title{display:block;position:relative}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .item .item-sub-title .details{bottom:12px;color:#202124;display:inline-block;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:19px;letter-spacing:-.05px;line-height:normal;margin-right:18px;position:relative;width:auto}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .item .item-sub-title .details .oval{background-color:#53be6d;border-radius:50px;bottom:0;height:8px;left:0;position:absolute;right:0;top:5px;width:8px}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .item .item-title{color:#2575ec;font-family:Roboto;font-size:20px;font-stretch:normal;font-style:normal;font-weight:400;height:26px;letter-spacing:-.07px;line-height:normal;position:relative;top:10px;width:240px}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .icon-2{background-color:#fff;border:1px solid #d6daff;border-radius:4px;display:inline-block;height:53px;left:11px;position:relative;top:22px;width:53px}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .icon-2 .icon-img{height:36px;left:4px;position:relative;top:7px;width:47px}.link{color:#2996cc!important;cursor:pointer;text-decoration:none}"]
            },] }
];
FlipperBasicPosComponent.ctorParameters = () => [
    { type: DialogService },
    { type: CalculateTotalClassPipe }
];
FlipperBasicPosComponent.propDecorators = {
    updateQtyEmit: [{ type: Output }],
    searchEmitValue: [{ type: Output }],
    addToCartEmit: [{ type: Output }],
    saveOrderUpdatedEmit: [{ type: Output }],
    updateOrderDetailsEmit: [{ type: Output }],
    didCollectCashEmit: [{ type: Output }],
    currency: [{ type: Input }],
    foundVariant: [{ type: Input, args: ['foundVariant',] }],
    taxes: [{ type: Input, args: ['taxes',] }],
    currentOrder: [{ type: Input, args: ['currentOrder',] }],
    collectCashCompleted: [{ type: Input, args: ['collectCashCompleted',] }],
    onKeydownHandler: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcHBlci1iYXNpYy1wb3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZmxpcHBlci1wb3Mvc3JjL2xpYi9iYXNpYy9mbGlwcGVyLWJhc2ljLXBvcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQTtBQUN0QixPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixtQkFBbUIsR0FHcEIsTUFBTSw0QkFBNEIsQ0FBQTtBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFBO0FBQ3RDLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkRBQTZELENBQUE7QUFDeEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sK0RBQStELENBQUE7QUFVMUcsTUFBTSxPQUFPLHdCQUF3QjtJQWlHbkMsWUFBbUIsTUFBcUIsRUFBVSxTQUFrQztRQUFqRSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBeUI7UUFoRzFFLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUE7UUFDaEQsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFBO1FBQzVDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQXVELENBQUE7UUFDdkYseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQTtRQUNoRCwyQkFBc0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFBO1FBQ25ELHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUE7UUFFMUQsV0FBTSxHQUFHLEVB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O1NBQ3JCO0lBQ0gsQ0FBQztJQUNELGlCQUFpQixDQUFDLElBQUk7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7SUFDekIsQ0FBQztJQUNELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBQ0QsVUFBVSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFBO0lBQ2hDLENBQUM7OztZQWpNRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsMnBUQUFpRDtnQkFFakQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQzs7YUFDN0U7OztZQVhRLGFBQWE7WUFQcEIsdUJBQXVCOzs7NEJBb0J0QixNQUFNOzhCQUNOLE1BQU07NEJBQ04sTUFBTTttQ0FDTixNQUFNO3FDQUNOLE1BQU07aUNBQ04sTUFBTTt1QkFTTixLQUFLOzJCQUVMLEtBQUssU0FBQyxjQUFjO29CQVFwQixLQUFLLFNBQUMsT0FBTzsyQkFPYixLQUFLLFNBQUMsY0FBYzttQ0E4QnBCLEtBQUssU0FBQyxzQkFBc0I7K0JBUTVCLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgSG9zdExpc3RlbmVyLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7XHJcbiAgT3JkZXIsXHJcbiAgVmFyaWFudCxcclxuICBDYWxjdWxhdGVUb3RhbENsYXNzUGlwZSxcclxuICBNZXJnZUFycnlCeUlkUGlwZSxcclxuICBBcnJheVJlbW92ZUl0ZW1QaXBlLFxyXG4gIE9yZGVyRGV0YWlscyxcclxuICBUYXhlcyxcclxufSBmcm9tICdAZW5leHVzL2ZsaXBwZXItY29tcG9uZW50cydcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcydcclxuaW1wb3J0IHsgRGlhbG9nU2VydmljZSwgRGlhbG9nU2l6ZSB9IGZyb20gJ0BlbmV4dXMvZmxpcHBlci1kaWFsb2cnXHJcbmltcG9ydCB7IFVwZGF0ZVByaWNlRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL3VwZGF0ZS1wcmljZS1kaWFsb2cvdXBkYXRlLXByaWNlLWRpYWxvZy5jb21wb25lbnQnXHJcbmltcG9ydCB7IEFkZENhcnRJdGVtRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2FkZC1jYXJ0LWl0ZW0tZGlhbG9nL2FkZC1jYXJ0LWl0ZW0tZGlhbG9nLmNvbXBvbmVudCdcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZmxpcHBlci1iYXNpYy1wb3MnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mbGlwcGVyLWJhc2ljLXBvcy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmxpcHBlci1iYXNpYy1wb3MuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByb3ZpZGVyczogW0NhbGN1bGF0ZVRvdGFsQ2xhc3NQaXBlLCBNZXJnZUFycnlCeUlkUGlwZSwgQXJyYXlSZW1vdmVJdGVtUGlwZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGlwcGVyQmFzaWNQb3NDb21wb25lbnQge1xyXG4gIEBPdXRwdXQoKSB1cGRhdGVRdHlFbWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxPcmRlckRldGFpbHM+KClcclxuICBAT3V0cHV0KCkgc2VhcmNoRW1pdFZhbHVlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KClcclxuICBAT3V0cHV0KCkgYWRkVG9DYXJ0RW1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8eyB2YXJpYW50OiBWYXJpYW50OyBxdWFudGl0eTogbnVtYmVyOyB0YXg6IHN0cmluZyB9PigpXHJcbiAgQE91dHB1dCgpIHNhdmVPcmRlclVwZGF0ZWRFbWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxPcmRlcj4oKVxyXG4gIEBPdXRwdXQoKSB1cGRhdGVPcmRlckRldGFpbHNFbWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KClcclxuICBAT3V0cHV0KCkgZGlkQ29sbGVjdENhc2hFbWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXHJcblxyXG4gIGFjdGlvbiA9ICcnXHJcbiAgb3JkZXJJdGVtcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9yZGVyRGV0YWlsc1tdPihbXSlcclxuXHJcbiAgcHJpdmF0ZSBjYW5mb3VuZFZhcmlhbnQ6IFZhcmlhbnRbXSA9IFtdXHJcbiAgcHJpdmF0ZSBpc0N1cnJlbnRPcmRlcjogT3JkZXIgPSBudWxsXHJcbiAgcHJpdmF0ZSB1c2VyQ2xvc2VkTW9kZWwgPSBmYWxzZVxyXG4gIHByaXZhdGUgc2V0VGF4ZXM6IFRheGVzW10gPSBbXVxyXG4gIEBJbnB1dCgpIGN1cnJlbmN5ID0gJ1JXRidcclxuXHJcbiAgQElucHV0KCdmb3VuZFZhcmlhbnQnKVxyXG4gIHNldCBmb3VuZFZhcmlhbnQodmFsdWU6IFZhcmlhbnRbXSkge1xyXG4gICAgdGhpcy5jYW5mb3VuZFZhcmlhbnQgPSB2YWx1ZVxyXG4gIH1cclxuICBnZXQgZm91bmRWYXJpYW50KCk6IFZhcmlhbnRbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYW5mb3VuZFZhcmlhbnRcclxuICB9XHJcbiAgLy90YXhlc1xyXG4gIEBJbnB1dCgndGF4ZXMnKVxyXG4gIHNldCB0YXhlcyh2YWx1ZTogVGF4ZXNbXSkge1xyXG4gICAgdGhpcy5zZXRUYXhlcyA9IHZhbHVlXHJcbiAgfVxyXG4gIGdldCB0YXhlcygpOiBUYXhlc1tdIHtcclxuICAgIHJldHVybiB0aGlzLnNldFRheGVzXHJcbiAgfVxyXG4gIEBJbnB1dCgnY3VycmVudE9yZGVyJylcclxuICBzZXQgY3VycmVudE9yZGVyKG9yZGVyOiBPcmRlcikge1xyXG4gICAgdGhpcy5pc0N1cnJlbnRPcmRlciA9IG9yZGVyXHJcbiAgICB0aGlzLmNhcnRGb2N1c2VkID0gb3JkZXIgJiYgb3JkZXIub3JkZXJJdGVtcy5sZW5ndGggPiAwID8gb3JkZXIub3JkZXJJdGVtc1swXSA6IG51bGxcclxuICB9XHJcblxyXG4gIGdldCBjdXJyZW50T3JkZXIoKTogT3JkZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNDdXJyZW50T3JkZXJcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0Q2FydEZvY3VzZWQ6IE9yZGVyRGV0YWlscyA9IG51bGxcclxuXHJcbiAgc2V0IGNhcnRGb2N1c2VkKGNhcnQ6IE9yZGVyRGV0YWlscykge1xyXG4gICAgdGhpcy5zZXRDYXJ0Rm9jdXNlZCA9IGNhcnRcclxuICB9XHJcbiAgZ2V0IGNhcnRGb2N1c2VkKCk6IE9yZGVyRGV0YWlscyB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXRDYXJ0Rm9jdXNlZFxyXG4gIH1cclxuXHJcbiAgLy8gZGlkQ2xvc2VNb2RlbFxyXG4gIHNldCB1c2VyRGlkQ2xvc2VNb2RlbChtOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnVzZXJDbG9zZWRNb2RlbCA9IG1cclxuICB9XHJcbiAgZ2V0IHVzZXJEaWRDbG9zZU1vZGVsKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlckNsb3NlZE1vZGVsXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRpZENvbGxlY3RDYXNoQ29tcGxldGVkOiBvYmplY3QgPSB7IGlzQ29tcGxldGVkOiBmYWxzZSwgY29sbGVjdGVkT3JkZXI6IG51bGwgfVxyXG4gIC8vIGNvbGxlY3RDYXNoQ29tcGxldGVkXHJcblxyXG4gIEBJbnB1dCgnY29sbGVjdENhc2hDb21wbGV0ZWQnKVxyXG4gIHNldCBjb2xsZWN0Q2FzaENvbXBsZXRlZChpbnB1dGVkOiBvYmplY3QpIHtcclxuICAgIHRoaXMuZGlkQ29sbGVjdENhc2hDb21wbGV0ZWQgPSBpbnB1dGVkXHJcbiAgfVxyXG4gIGdldCBjb2xsZWN0Q2FzaENvbXBsZXRlZCgpOiBvYmplY3Qge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlkQ29sbGVjdENhc2hDb21wbGV0ZWRcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24nLCBbJyRldmVudCddKVxyXG4gIG9uS2V5ZG93bkhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIC8vIGRlbGV0ZSBrZXlcclxuICAgIGlmICh0aGlzLmNhcnRGb2N1c2VkKSB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdEZWxldGUnKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVJdGVtKHRoaXMuY2FydEZvY3VzZWQpXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGV2ZW50LmtleSA9PT0gJysnKSB7XHJcbiAgICAgICAgLy8gc2hpZnQgKyAoKylcclxuICAgICAgICB0aGlzLnVwZGF0ZVF1YW50aXR5KHRoaXMuY2FydEZvY3VzZWQsICcrJylcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGV2ZW50LmtleSA9PT0gJy0nKSB7XHJcbiAgICAgICAgLy8gc2hpZnQgKyAoLSlcclxuICAgICAgICB0aGlzLnVwZGF0ZVF1YW50aXR5KHRoaXMuY2FydEZvY3VzZWQsICctJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGV2ZW50LmtleSA9PT0gJ0snKSB7XHJcbiAgICAgIC8vIHNoaWZ0ICsga1xyXG4gICAgICB0aGlzLmtleUJvYXJkU2hvcnRDdXRzKClcclxuICAgIH1cclxuICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LmtleSA9PT0gJ04nKSB7XHJcbiAgICAgIC8vIHNoaWZ0ICsga1xyXG4gICAgICB0aGlzLmFkZENhcnRJdGVtKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2c6IERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdG90YWxQaXBlOiBDYWxjdWxhdGVUb3RhbENsYXNzUGlwZSkge31cclxuXHJcbiAga2V5Qm9hcmRTaG9ydEN1dHMoKSB7XHJcbiAgICB0aGlzLmRpYWxvZy5rZXlCb2FyZFNob3J0Q3V0cygpXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VhcmNoUG9zUHJvZHVjdChldmVudCkge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIHRoaXMuc2VhcmNoRW1pdFZhbHVlLmVtaXQoZXZlbnQpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRUb0NhcnQoaXRlbSwgdXBkYXRlUHJvZHVjdCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodXBkYXRlUHJvZHVjdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kaWFsb2cub3BlbihVcGRhdGVQcmljZURpYWxvZ0NvbXBvbmVudCwgRGlhbG9nU2l6ZS5TSVpFX1NNLCBpdGVtLnByaWNlKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAocmVzdWx0ICE9PSAnY2xvc2UnKSB7XHJcbiAgICAgICAgICBpZiAocmVzdWx0LnByaWNlICYmIHJlc3VsdC5wcmljZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRUb0NhcnRFbWl0LmVtaXQocmVzdWx0KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWRkVG9DYXJ0RW1pdC5lbWl0KGl0ZW0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZVByaWNlKGl0ZW06IE9yZGVyRGV0YWlscykge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nLm9wZW4oVXBkYXRlUHJpY2VEaWFsb2dDb21wb25lbnQsIERpYWxvZ1NpemUuU0laRV9TTSwgaXRlbS5wcmljZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQgIT09ICdjbG9zZScpIHtcclxuICAgICAgICBpZiAocmVzdWx0LnByaWNlICYmIHJlc3VsdC5wcmljZSA+IDApIHtcclxuICAgICAgICAgIGl0ZW0ucHJpY2UgPSByZXN1bHQucHJpY2VcclxuICAgICAgICAgIGl0ZW0uc3ViVG90YWwgPSBpdGVtLnF1YW50aXR5ICogaXRlbS5wcmljZVxyXG4gICAgICAgICAgdGhpcy51cGRhdGVRdHkoaXRlbSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBhZGRDYXJ0SXRlbSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRpYWxvZy5vcGVuKEFkZENhcnRJdGVtRGlhbG9nQ29tcG9uZW50LCBEaWFsb2dTaXplLlNJWkVfTUQsIHRoaXMudGF4ZXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0ICE9PSAnY2xvc2UnIHx8IHJlc3VsdC5wcmljZSA+IDAgfHwgcmVzdWx0LnF1YW50aXR5ID4gMCkge1xyXG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0KHJlc3VsdClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHVwZGF0ZVF0eShpdGVtOiBPcmRlckRldGFpbHMpIHtcclxuICAgIHRoaXMudXBkYXRlT3JkZXJEZXRhaWxzRW1pdC5lbWl0KHsgYWN0aW9uOiAnVVBEQVRFJywgaXRlbSB9KVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlSXRlbShpdGVtOiBPcmRlckRldGFpbHMpIHtcclxuICAgIHRoaXMudXBkYXRlT3JkZXJEZXRhaWxzRW1pdC5lbWl0KHsgYWN0aW9uOiAnREVMRVRFJywgaXRlbSB9KVxyXG4gIH1cclxuXHJcbiAgc2F2ZU9yZGVyVXBkYXRlZChldmVudD86IE9yZGVyKSB7XHJcbiAgICBjb25zdCBvcmRlciA9IGV2ZW50ID8gZXZlbnQgOiB0aGlzLmN1cnJlbnRPcmRlclxyXG4gICAgdGhpcy5zYXZlT3JkZXJVcGRhdGVkRW1pdC5lbWl0KG9yZGVyKVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlUXVhbnRpdHkoaXRlbTogT3JkZXJEZXRhaWxzLCBhY3Rpb24gPSBudWxsKSB7XHJcbiAgICBjb25zdCBsYXN0UXR5ID0gaXRlbS5xdWFudGl0eVxyXG4gICAgdGhpcy5hY3Rpb24gPSBhY3Rpb25cclxuICAgIHRoaXMuY2FuU2V0Q2FydEZvY3VzZWQoaXRlbSlcclxuICAgIGlmICh0aGlzLmFjdGlvbiA9PT0gJy0nKSB7XHJcbiAgICAgIGl0ZW0ucXVhbnRpdHkgPSBpdGVtLnF1YW50aXR5IC0gMVxyXG4gICAgICBpZiAoaXRlbS5xdWFudGl0eSA8PSAwKSB7XHJcbiAgICAgICAgdGhpcy5kaWFsb2dcclxuICAgICAgICAgIC5tZXNzYWdlKCdGYWlsdXJlIE1lc3NhZ2UnLCAnTmVnYXRpdmUgcXVhbnRpdHkgaXMgbm90IGFsbG93ZWQuJywgJ0ZhaWx1cmUnLCAnU0laRV9TTScpXHJcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgaXRlbS5xdWFudGl0eSA9IGxhc3RRdHlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgaXRlbS5xdWFudGl0eSA9IGxhc3RRdHlcclxuICAgICAgfVxyXG4gICAgICBpdGVtLnN1YlRvdGFsID0gaXRlbS5wcmljZSAqIGl0ZW0ucXVhbnRpdHlcclxuICAgICAgdGhpcy51cGRhdGVRdHkoaXRlbSlcclxuICAgIH0gZWxzZSBpZiAodGhpcy5hY3Rpb24gPT09ICcrJykge1xyXG4gICAgICBpdGVtLnF1YW50aXR5ID0gaXRlbS5xdWFudGl0eSArIDFcclxuICAgICAgaXRlbS5zdWJUb3RhbCA9IGl0ZW0ucHJpY2UgKiBpdGVtLnF1YW50aXR5XHJcbiAgICAgIHRoaXMudXBkYXRlUXR5KGl0ZW0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIGNhblNldENhcnRGb2N1c2VkKGl0ZW0pIHtcclxuICAgIHRoaXMuY2FydEZvY3VzZWQgPSBpdGVtXHJcbiAgfVxyXG4gIGNvbGxlY3RDYXNoKGV2ZW50KSB7XHJcbiAgICB0aGlzLmRpZENvbGxlY3RDYXNoRW1pdC5lbWl0KGV2ZW50KVxyXG4gIH1cclxuICBjbG9zZU1vZGVsKGV2ZW50KSB7XHJcbiAgICB0aGlzLnVzZXJEaWRDbG9zZU1vZGVsID0gZXZlbnRcclxuICB9XHJcbn1cclxuIl19