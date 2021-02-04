import { ɵɵdefineInjectable, Injectable, Component, Inject, HostListener, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, Output, Input, ChangeDetectorRef, ViewChild, NgModule } from '@angular/core';
import { NotificationService, SettingsService, CalculateTotalClassPipe, MergeArryByIdPipe, ArrayRemoveItemPipe, FindKeyPipe, RoundNumberPipe, PouchConfig, STATUS, ORDERTYPE, fadeInAnimation, PouchDBService, FlipperComponentsModule } from '@enexus/flipper-components';
import { BehaviorSubject } from 'rxjs';
import { DialogSize, DialogService, DialogModule } from '@enexus/flipper-dialog';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorsModule } from '@enexus/flipper-vendors';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { __awaiter } from 'tslib';
import { trigger, transition, useAnimation } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StockService, VariationService, ProductService } from '@enexus/flipper-inventory';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

class FlipperPosService {
    constructor() { }
}
FlipperPosService.ɵprov = ɵɵdefineInjectable({ factory: function FlipperPosService_Factory() { return new FlipperPosService(); }, token: FlipperPosService, providedIn: "root" });
FlipperPosService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
FlipperPosService.ctorParameters = () => [];

class UpdatePriceDialogComponent {
    constructor(dialogRef, price, formBuilder, notificationSvc) {
        this.dialogRef = dialogRef;
        this.price = price;
        this.formBuilder = formBuilder;
        this.notificationSvc = notificationSvc;
        this.submitted = false;
        this.isFocused = '';
    }
    get formControl() {
        return this.form.controls;
    }
    onKeydownHandler(event) {
        if (event.key === 'Esc') {
            this.dialogRef.close('close');
        }
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            price: [!this.price ? this.price : 0.0, Validators.required],
        });
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            this.notificationSvc.error('Add price', 'We need you to complete all of the required fields before we can continue');
            return;
        }
        else {
            this.dialogRef.close({ price: this.form.value.price });
        }
    }
    focusing(value) {
        this.isFocused = value;
        this.form.controls.price.setValue('');
    }
    focusingOut() {
        this.isFocused = '';
    }
}
UpdatePriceDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-update-price-dialog',
                template: "<h1 mat-dialog-title>Add Price</h1>\r\n<form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\r\n\r\n\r\n<div>\r\n   \r\n  <mat-error *ngIf=\"submitted && formControl.price.errors\">\r\n    <div *ngIf=\"formControl.price.errors.required\">Price is required</div>\r\n</mat-error>\r\n        <table style=\"width: 100%;\">\r\n    \r\n            <tr class=\"tr\" [class.trIsFocused]=\"isFocused=='price'\" style=\"border-top: 1px #d5d9dc solid; border-right: 1px #d5d9dc solid; border-left: 1px #d5d9dc solid;\">\r\n                \r\n                <td class=\"td\"  [class.tdIsFocused]=\"isFocused=='price'\">\r\n                    Add Price\r\n                  </td>\r\n                  <td style=\"width:60%\">\r\n                    <input type=\"number\" class=\"input\" formControlName=\"price\"\r\n                    (focus)=\"focusing('price')\" (focusout)=\"focusingOut()\" autofocus placeholder=\"Add Price\" />\r\n                   \r\n                  </td>\r\n             </tr>\r\n        </table>    \r\n  \r\n\r\n</div>\r\n<div class=\"mt-3 mb-3\" style=\"float: right;\">\r\n    <button mat-button (click)=\"dialogRef.close('close')\" class=\"ml-3\" cdkFocusInitial>Cancel</button>\r\n    <button  type=\"submit\" class=\"button-default button--secondary ml-1\" cdkFocusInitial>Done</button>\r\n</div>\r\n</form>\r\n",
                styles: [".toolbar{background-color:#211a36;color:#fff!important}input{background-color:initial!important;width:100%!important}input,mat-select{border:none!important;font-size:14px!important;line-height:1.715!important;padding:12px 16px!important}mat-select{background-color:#fff!important;width:100%!important;width:100%}.mat-select-placeholder,.mat-select-value,mat-select{color:#2996cc!important}textarea{background:0 0;border:0;height:120.03px;padding:12px 16px;resize:none;width:100%}.tr{border-bottom:1px solid #d5d9dc;color:#343b42;display:flex;font-size:14px;line-height:1.715;width:100%}.td{width:40%;width:200px}.td,.td-sm{background-color:#ebedef;cursor:default;display:flex;font-weight:500;justify-content:space-between;padding:12px 16px}.td-sm{width:25%;width:200px}.trIsFocused{border-bottom:1px solid #2996cc}.tdIsFocused{background-color:#d4eaf5}.invalid{border-bottom:1px solid #ad061c}.form-link-with-spacing{display:block;padding:12px 16px;width:100%}.hyperlink{color:#2996cc!important;cursor:pointer;font-size:14px;font-weight:500;line-height:1.715;text-decoration:none}.price{width:100%}.price .currency{display:inline-block;margin-bottom:6px;margin-left:5px;width:25%}.price .pinput{display:inline-block;width:50%}.table--flex .table-row,.table--flex tr{display:flex;line-height:1.715}.table-row,tr{border-bottom:1px solid #d5d9dc}.table--flex .table-cell,.table--flex .table-cell-header,.table--flex td,.table--flex th{align-items:center;display:flex;flex:1 1 100%}.table-cell-header:first-child,.table-cell:first-child,td:first-child,th:first-child{padding-left:16px}.editable-variation-table__header__cell{overflow:visible}.table-cell-header,th{border-top:1px solid #d5d9dc;color:#343b42;font-weight:500}.table-cell,.table-cell-header,td,th{height:48px;overflow:hidden;padding-left:8px;padding-right:8px;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap}.table-header,thead{background-color:#ebedef;text-align:left}.table--editable{border-left:1px solid #d5d9dc;border-right:1px solid #d5d9dc}.editable-variation-list__more-options-cell{align-items:center;display:flex;height:100%;justify-content:center;position:absolute;right:-40px;top:0;width:40px}.editable-variation-list__more-options-cell .dropdown{position:relative}.dropdown__trigger{cursor:pointer;outline:0}.more-actions-menu__trigger{align-items:center;display:flex;height:100%;justify-content:center;width:100%}svg:not(:root){overflow:hidden}.caret-down:after,.caret-left:after,.caret-right:after,.caret-up:after,.svg-icon{display:inline-block}"]
            },] }
];
UpdatePriceDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
    { type: FormBuilder },
    { type: NotificationService }
];
UpdatePriceDialogComponent.propDecorators = {
    onKeydownHandler: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};

class AddCartItemDialogComponent {
    constructor(dialogRef, formBuilder, notificationSvc, setting, taxes$) {
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.notificationSvc = notificationSvc;
        this.setting = setting;
        this.taxes$ = taxes$;
        this.units = [];
        this.submitted = false;
        this.isFocused = '';
        this.units = this.setting.units();
    }
    get formControl() {
        return this.form.controls;
    }
    onKeydownHandler(event) {
        if (event.key === 'Esc') {
            this.dialogRef.close('close');
        }
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            price: ['', Validators.required, Validators.min(0)],
            name: 'Custom Amount',
            quantity: [1, Validators.min(0)],
            tax: null,
            unit: '',
        });
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            this.notificationSvc.error('Add Cart item', 'We need you to complete all of the required fields before we can continue');
            return;
        }
        else {
            this.dialogRef.close({
                price: this.form.value.price,
                quantity: this.form.value.quantity && this.form.value.quantity > 0 ? this.form.value.quantity : 1,
                variantName: this.form.value.name ? this.form.value.name : 'No prduct name',
                productName: this.form.value.name ? this.form.value.name : '--',
                taxName: this.form.value.tax ? this.form.value.tax.name : 0,
                taxRate: this.form.value.tax ? this.form.value.tax.percentage : 0,
                unit: this.form.value.unit,
                canTrackingStock: false,
                currentStock: 0,
                sku: '00',
            });
        }
    }
    focusing(value) {
        this.isFocused = value;
        // if (value === 'name') {
        //   this.form.controls.name.setValue('')
        // } else if (value === 'price') {
        //   this.form.controls.price.setValue('')
        // } else if (value === 'quantity') {
        //   this.form.controls.quantity.setValue('')
        // }
    }
    focusingOut() {
        this.isFocused = '';
    }
}
AddCartItemDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-add-cart-item-dialog',
                template: "<h1 mat-dialog-title>Add Cart Item</h1>\r\n<form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\r\n      <div>\r\n            <mat-error *ngIf=\"submitted && formControl.price.errors\">\r\n                <div *ngIf=\"formControl.price.errors.required\">Price is required.</div>\r\n                <div *ngIf=\"formControl.price.errors.min\">Price entered is negative number. </div>\r\n            </mat-error>\r\n\r\n            <mat-error *ngIf=\"submitted && formControl.quantity.errors\">\r\n                <div *ngIf=\"formControl.quantity.errors.required\">Quantity is required  </div>\r\n                <div *ngIf=\"formControl.quantity.errors.min\">Quantity entered is negative number. </div>\r\n            </mat-error>\r\n        \r\n              <table style=\"width: 100%;\">\r\n          \r\n                  <tr class=\"tr\" [class.trIsFocused]=\"isFocused=='price'\" style=\"border-top: 1px #d5d9dc solid; border-right: 1px #d5d9dc solid; border-left: 1px #d5d9dc solid;\">\r\n                      \r\n                      <td class=\"td\"  [class.tdIsFocused]=\"isFocused=='price'\">\r\n                          Price\r\n                        </td>\r\n                        <td style=\"width:60%\">\r\n                          <input type=\"number\" class=\"input\" formControlName=\"price\"\r\n                          (focus)=\"focusing('price')\" (focusout)=\"focusingOut()\" autofocus placeholder=\"0.00\" />\r\n                          \r\n                        </td>\r\n                  </tr>\r\n                  <tr class=\"tr\" [class.trIsFocused]=\"isFocused=='quantity' || isFocused=='unit'\" style=\" border-right: 1px #d5d9dc solid; border-left: 1px #d5d9dc solid;\">\r\n                      \r\n                      <td class=\"td\"  [class.tdIsFocused]=\"isFocused=='quantity' || isFocused=='unit'\">\r\n                          Quantity/unit\r\n                        </td>\r\n                        <td style=\"width:60%\">\r\n                        <table style=\"width:100%\">\r\n                          <tr>\r\n                            <td style=\"width:50%\">\r\n                              <input type=\"number\" class=\"input\" formControlName=\"quantity\"\r\n                              (focus)=\"focusing('quantity')\" (focusout)=\"focusingOut()\" autofocus placeholder=\"0\" />\r\n                            </td>\r\n                          <td style=\"width:50%\">\r\n                            <mat-select class=\"select\" formControlName=\"unit\" placeholder=\"Choose Unit\"\r\n                            (focus)=\"focusing('unit')\"  (focusout)=\"focusingOut()\">\r\n                                    <mat-option *ngFor=\"let unit of units\" [value]=\"unit.value\">\r\n                                    {{unit.name}}\r\n                                    </mat-option>\r\n                          </mat-select>\r\n                          </td>\r\n                          </tr>\r\n                        </table>\r\n          \r\n                        </td>\r\n                  </tr>\r\n                  <tr class=\"tr\" [class.trIsFocused]=\"isFocused=='name'\" style=\"border-right: 1px #d5d9dc solid; border-left: 1px #d5d9dc solid;\">\r\n                      \r\n                      <td class=\"td\"  [class.tdIsFocused]=\"isFocused=='name'\">\r\n                        Description\r\n                        </td>\r\n                        <td style=\"width:60%\">\r\n                          <input type=\"text\" class=\"input\" formControlName=\"name\"\r\n                          (focus)=\"focusing('name')\" (focusout)=\"focusingOut()\" autofocus placeholder=\"Description(product or service name)\" />\r\n                        </td>\r\n                  </tr>\r\n\r\n                  <tr style=\" border-right: 1px #d5d9dc solid; border-left: 1px #d5d9dc solid;\" class=\"tr\" [class.trIsFocused]=\"isFocused=='taxes'\">\r\n                    <td class=\"td\" [class.tdIsFocused]=\"isFocused=='taxes'\">\r\n                      <label>Tax</label>\r\n                    </td>\r\n                    <td style=\"width: 60%;\">\r\n\r\n                      <mat-select class=\"select\" formControlName=\"tax\" placeholder=\"Choose Tax\"\r\n                        (focus)=\"focusing('taxes')\"\r\n                        (focusout)=\"focusingOut()\">\r\n                        <mat-option *ngFor=\"let tax of taxes$\" [value]=\"tax\">\r\n                          {{tax.name}} ({{tax.percentage}}%)\r\n                        </mat-option>\r\n                      </mat-select>\r\n\r\n                    </td>\r\n                  </tr>\r\n\r\n              </table>    \r\n        \r\n      </div>\r\n      <div class=\"mt-3 mb-3\" style=\"float: right;\">\r\n          <button mat-button (click)=\"dialogRef.close('close')\" class=\"ml-3\" cdkFocusInitial>Cancel</button>\r\n          <button  type=\"submit\" class=\"button-default button--success ml-1\" cdkFocusInitial>Add</button>\r\n      </div>\r\n</form>\r\n",
                styles: [".toolbar{background-color:#211a36;color:#fff!important}input{background-color:initial!important;width:100%!important}input,mat-select{border:none!important;font-size:14px!important;line-height:1.715!important;padding:12px 16px!important}mat-select{background-color:#fff!important;width:100%!important;width:100%}.mat-select-placeholder,.mat-select-value,mat-select{color:#2996cc!important}textarea{background:0 0;border:0;height:120.03px;padding:12px 16px;resize:none;width:100%}.tr{border-bottom:1px solid #d5d9dc;color:#343b42;display:flex;font-size:14px;line-height:1.715;width:100%}.td{width:40%;width:200px}.td,.td-sm{background-color:#ebedef;cursor:default;display:flex;font-weight:500;justify-content:space-between;padding:12px 16px}.td-sm{width:25%;width:200px}.trIsFocused{border-bottom:1px solid #2996cc}.tdIsFocused{background-color:#d4eaf5}.invalid{border-bottom:1px solid #ad061c}.form-link-with-spacing{display:block;padding:12px 16px;width:100%}.hyperlink{color:#2996cc!important;cursor:pointer;font-size:14px;font-weight:500;line-height:1.715;text-decoration:none}.price{width:100%}.price .currency{display:inline-block;margin-bottom:6px;margin-left:5px;width:25%}.price .pinput{display:inline-block;width:50%}.table--flex .table-row,.table--flex tr{display:flex;line-height:1.715}.table-row,tr{border-bottom:1px solid #d5d9dc}.table--flex .table-cell,.table--flex .table-cell-header,.table--flex td,.table--flex th{align-items:center;display:flex;flex:1 1 100%}.table-cell-header:first-child,.table-cell:first-child,td:first-child,th:first-child{padding-left:16px}.editable-variation-table__header__cell{overflow:visible}.table-cell-header,th{border-top:1px solid #d5d9dc;color:#343b42;font-weight:500}.table-cell,.table-cell-header,td,th{height:48px;overflow:hidden;padding-left:8px;padding-right:8px;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap}.table-header,thead{background-color:#ebedef;text-align:left}.table--editable{border-left:1px solid #d5d9dc;border-right:1px solid #d5d9dc}.editable-variation-list__more-options-cell{align-items:center;display:flex;height:100%;justify-content:center;position:absolute;right:-40px;top:0;width:40px}.editable-variation-list__more-options-cell .dropdown{position:relative}.dropdown__trigger{cursor:pointer;outline:0}.more-actions-menu__trigger{align-items:center;display:flex;height:100%;justify-content:center;width:100%}svg:not(:root){overflow:hidden}.caret-down:after,.caret-left:after,.caret-right:after,.caret-up:after,.svg-icon{display:inline-block}"]
            },] }
];
AddCartItemDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: FormBuilder },
    { type: NotificationService },
    { type: SettingsService },
    { type: Array, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
AddCartItemDialogComponent.propDecorators = {
    onKeydownHandler: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};

class FlipperBasicPosComponent {
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

class SearchBoxComponent {
    constructor(cd) {
        this.cd = cd;
        this.userClosedModel = false;
        this.searchEmitValue = new EventEmitter();
        this.addToCartEmit = new EventEmitter();
        this.debounce = 1000;
        this.loading = false;
        this.isSearching = false;
        this.canfoundVariant = [];
        this.currency = 'RWF';
        this.timer = null;
    }
    set foundVariant(value) {
        this.canfoundVariant = value;
        this.loading = false;
        this.addToCartOnGotSingleItem(value);
    }
    get foundVariant() {
        return this.canfoundVariant;
    }
    set didUserCloseModel(bol) {
        this.userClosedModel = bol;
        if (bol === true) {
            this.clearSearchBox();
        }
    }
    get didUserCloseModel() {
        return this.userClosedModel;
    }
    onKeydownHandler(event) {
        this.event = event;
        if ((this.event.shiftKey && this.event.key === 'F') || (this.event.shiftKey && this.event.key === 'S')) {
            setTimeout(() => {
                this.clearSearchBox();
            }, 2);
        }
        if (this.event.key === 'Shift') {
            setTimeout(() => {
                this.searchInputElement.nativeElement.blur();
                this.close();
            }, 2);
        }
    }
    close() {
        this.autoComplete.closePanel();
    }
    startSearching(event) {
        if (event.target.value === '' || event.target.value === null) {
            this.foundVariant = [];
            this.clearSearchBox();
            return;
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.foundVariant = [];
            this.searching(event.target.value);
        }, 1000);
    }
    searching(query) {
        this.loading = true;
        this.isSearching = true;
        this.searchEmitValue.emit(query);
    }
    ngOnInit() {
        // this.searchControl = new FormControl('');
        // this.searchControl.valueChanges
        //   .pipe(debounceTime(this.debounce),
        //         distinctUntilChanged()
        //         )
        //       .subscribe(query => {
        //         if (query === '' || query === null) {
        //           this.isSearching = false;
        //           return;
        //         }
        //         this.loading = true;
        //         this.isSearching = true;
        //         this.searchEmitValue.emit(query);
        //   });
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.searchInputElement.nativeElement.focus();
        });
        this.cd.detectChanges();
    }
    addToCartOnGotSingleItem(variants) {
        if (variants.length === 1) {
            this.addToCart(variants[0]);
            this.clearSearchBox();
        }
    }
    addToCart(variant) {
        variant.quantity = 1;
        this.addToCartEmit.emit(variant);
        this.clearSearchBox();
    }
    focusing() {
        this.clearSearchBox();
    }
    clearSearchBox() {
        if (this.searchInputElement !== undefined) {
            this.searchInputElement.nativeElement.value = '';
            this.searchInputElement.nativeElement.focus();
            this.isSearching = false;
            this.close();
        }
    }
}
SearchBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-search-box',
                template: "<div class=\"icon-card\"><svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" stroke=\"#607d8b\" stroke-width=\"2\" fill=\"none\"\r\n    stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"search-icon\">\r\n    <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n    <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>\r\n  </svg>\r\n</div>\r\n\r\n<input type=\"search\" \r\n(focus)=\"focusing()\" #autoCompleteInput [matAutocomplete]=\"auto\"\r\n(keydown)=\"startSearching($event)\"\r\naria-label=\"Search\" #mySearchInput placeholder=\"Search product code to retreive\" class=\"search-box\">\r\n\r\n<mat-autocomplete #auto=\"matAutocomplete\" class=\"autocomplete\">\r\n\r\n      <flipper-autocomplete [loading]=\"false\" *ngIf=\"isSearching || foundVariant.length > 0\">\r\n        <div *ngFor=\"let variant of foundVariant; let i = index;\">\r\n          <mat-option (click)=\"addToCart(variant)\">\r\n              <div class=\"icon-1\">\r\n                <img [src]=\"'./assets/icons/search.svg'\" class=\"icon-img\">\r\n              </div>\r\n\r\n              <div class=\"item\">\r\n                  <span class=\"item-title\">\r\n                    {{variant.sku}} / {{variant.name}}\r\n                  </span>\r\n                  \r\n                  <div class=\"item-sub-title\">\r\n\r\n                      <span class=\"details\">\r\n                        {{currency}} {{variant.retailPrice}}\r\n                        {{variant.unit?'/ '+variant.unit:''}}\r\n                      </span>\r\n\r\n                      <span class=\"details\">\r\n                        {{variant.productName}}\r\n                      </span>\r\n\r\n                      <span class=\"details\" *ngIf=\"variant && variant.canTrackingStock\">\r\n                            <div class=\"oval\"> </div> &nbsp;&nbsp; In stock({{variant.currentStock}})\r\n                      </span>\r\n\r\n                  </div>\r\n              </div>\r\n\r\n          </mat-option>\r\n        </div>\r\n      </flipper-autocomplete>\r\n\r\n      <flipper-autocomplete [loading]=\"false\" *ngIf=\"foundVariant.length == 0\">\r\n        <mat-option>\r\n              <div class=\"item\">\r\n                    <span class=\"item-title\">\r\n                      Sorry! There is no item(s) found.\r\n                    </span>\r\n              </div>\r\n        </mat-option>\r\n      </flipper-autocomplete>\r\n\r\n</mat-autocomplete>\r\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".icon-card{align-items:center;display:flex;left:25px;position:absolute;top:25px}.search-icon{color:#959da5;vertical-align:text-bottom}.search-box{-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:#fff;border:0;border-radius:6px;box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);color:#515151;font-family:inherit;font-family:Roboto;font-size:inherit;font-size:22px;font-stretch:normal;font-style:normal;letter-spacing:normal;line-height:1;line-height:normal;margin:0;outline:0;padding:16px 16px 16px 52px;width:100%}.autocomplete.mat-autocomplete-panel{background-color:#fcfeff;border:1px solid #e2e9ed;position:relative}.autocomplete.mat-autocomplete-panel flipper-autocomplete{width:100%}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option{background-color:#fff;border-top:4px solid #fcfeff;height:83px}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .add-button{background-color:#1174b6;border:1px solid #1174b6;border-radius:2px;color:#fff;float:right;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:45px;letter-spacing:1.25px;line-height:1.14;position:relative;right:0;text-align:center;top:34.7px;width:99px}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .item{bottom:3px;display:inline-table;left:30px;position:relative}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .item .item-sub-title{display:block;position:relative}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .item .item-sub-title .details{bottom:12px;color:#202124;display:inline-block;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:19px;letter-spacing:-.05px;line-height:normal;margin-right:18px;position:relative;width:auto}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .item .item-sub-title .details .oval{background-color:#53be6d;border-radius:50px;bottom:0;height:8px;left:0;position:absolute;right:0;top:5px;width:8px}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .item .item-title{color:#2575ec;font-family:Roboto;font-size:20px;font-stretch:normal;font-style:normal;font-weight:400;height:26px;letter-spacing:-.07px;line-height:normal;width:240px}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .icon-1{background-color:#fff;border:1px solid #d6daff;border-radius:4px;display:inline-block;height:53px;left:11px;position:relative;top:22px;width:53px}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .icon-1 .icon-img{height:36px;left:4px;position:relative;top:7px;width:47px}"]
            },] }
];
SearchBoxComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
SearchBoxComponent.propDecorators = {
    foundVariant: [{ type: Input, args: ['foundVariant',] }],
    didUserCloseModel: [{ type: Input, args: ['didUserCloseModel',] }],
    searchEmitValue: [{ type: Output }],
    addToCartEmit: [{ type: Output }],
    searchInputElement: [{ type: ViewChild, args: ['mySearchInput', {
                    static: false,
                },] }],
    autoComplete: [{ type: ViewChild, args: ['autoCompleteInput', { read: MatAutocompleteTrigger, static: false },] }],
    currency: [{ type: Input }],
    onKeydownHandler: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};

class AutocompleteComponent {
    set loading(value) {
        this.load = value;
    }
    get loading() {
        return this.load;
    }
}
AutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-autocomplete',
                template: "<ng-container *ngIf=\"!loading\"><ng-content></ng-content></ng-container>\r\n<div *ngIf=\"loading\" class=\"loading-spinner\">\r\n   <flipper-loading-icon [loading]=\"loading\">\r\n      <span>Loading data!</span>\r\n    </flipper-loading-icon>\r\n</div>\r\n",
                styles: [".loading-spinner{bottom:0;left:0;padding:8px;position:relative;right:0;text-align:center;top:0}"]
            },] }
];
AutocompleteComponent.propDecorators = {
    loading: [{ type: Input, args: ['loading',] }]
};

class ShoppingListsComponent {
}
ShoppingListsComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-shopping-lists',
                template: "<ng-content></ng-content>",
                styles: [""]
            },] }
];

class BasicShoppingListComponent {
    constructor() {
        this.loading = false;
        this.action = '';
        this.getOrderItems = [];
        this.updateQtyEmit = new EventEmitter();
        this.removeItemEmit = new EventEmitter();
    }
    set orderItems(value) {
        this.getOrderItems = value;
    }
    get orderItems() {
        return this.getOrderItems;
    }
    updateQuantity(item, action = null) {
        const lastQty = item.quantity;
        this.action = action;
        if (this.action === '-') {
            item.quantity = item.quantity - 1;
            if (item.quantity < 0) {
                alert('Negative quantity is not allowed.');
                item.quantity = lastQty;
            }
        }
        else if (this.action === '+') {
            item.quantity = item.quantity + 1;
        }
        item.subTotal = item.price * item.quantity;
        this.updateQtyEmit.emit(item);
    }
    removeItem(item) {
        this.removeItemEmit.emit(item);
    }
    ngOnChanges(changes) {
        console.log(changes);
    }
}
BasicShoppingListComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-basic-shopping-list',
                template: "<div class=\"shoppinglist\">\r\n\r\n  <div class=\"divider\">\r\n    <div class=\"title\">Selected Items</div>\r\n    <div class=\"line\"></div>\r\n  </div>\r\n\r\n  <flipper-autocomplete *ngFor=\"let item of orderItems; let i = index;\">\r\n    <mat-option>\r\n      <div class=\"icon\">\r\n        <img [src]=\"'./assets/icons/search.svg'\" alt=\"search\" class=\"icon-img\">\r\n      </div>\r\n      <div class=\"item\">\r\n        <span class=\"item-title\">\r\n          {{item.orderId}} / {{item.variantName}}\r\n        </span>\r\n        <div class=\"item-sub-title\">\r\n          <span class=\"details\">RWF {{item.price}}</span>\r\n          <span class=\"details\">Lotion</span>\r\n          <span class=\"details\">\r\n            <div class=\"oval\"></div> &nbsp;&nbsp; In stock({{item.quantity}})\r\n          </span>\r\n        </div>\r\n\r\n      </div>\r\n      <div class=\"remove-item\">\r\n\r\n        <img [src]=\"'./assets/icons/x.svg'\" alt=\"search\" class=\"delete-icon\" (click)=\"removeItem(item)\">\r\n\r\n      </div>\r\n      <div class=\"update-qty\">\r\n        <table>\r\n          <tr>\r\n            <td>\r\n              <img [src]=\"'./assets/icons/minus.svg'\" alt=\"search\" (click)=\"updateQuantity(item,'-')\">\r\n            </td>\r\n            <td>{{item.quantity}}</td>\r\n            <td>\r\n              <img [src]=\"'./assets/icons/plus.svg'\" alt=\"search\" (click)=\"updateQuantity(item,'+')\">\r\n            </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n\r\n    </mat-option>\r\n\r\n  </flipper-autocomplete>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".shoppinglist{height:90vh;position:relative;top:25px}.shoppinglist .divider .title{color:#3a3b3f;display:inline-block;font-family:Roboto;font-size:16px;font-stretch:normal;font-style:normal;font-weight:500;height:20px;letter-spacing:-.06px;line-height:1.25;width:107px}.shoppinglist .divider .line{background-color:#f9fafb;display:inline-table}.shoppinglist flipper-autocomplete{position:relative;top:25px;width:100%}.shoppinglist flipper-autocomplete .mat-option{background-color:#fff;border-top:4px solid #fcfeff;height:83px}.shoppinglist flipper-autocomplete .mat-option .remove-item{border:1px solid #3f5ec6;border-radius:2px;float:right;height:50px;margin-left:8px;position:relative;right:0;top:34.7px;width:50.3px}.shoppinglist flipper-autocomplete .mat-option .remove-item .delete-icon{color:#1b2125;font-family:Roboto;font-size:22px;font-stretch:normal;font-style:normal;font-weight:500;height:40px;left:15px;letter-spacing:normal;line-height:normal;position:relative;text-align:center;top:4px;width:16px}.shoppinglist flipper-autocomplete .mat-option .update-qty{border:1px solid #3f5ec6;border-radius:2px;float:right;height:50px;margin-left:8px;position:relative;right:0;top:34.7px;width:123.3px}.shoppinglist flipper-autocomplete .mat-option .update-qty table{width:100%}.shoppinglist flipper-autocomplete .mat-option .update-qty table tr td{color:#1b2125;font-family:Roboto;font-size:22px;font-stretch:normal;font-style:normal;font-weight:500;height:40px;letter-spacing:normal;line-height:normal;position:relative;text-align:center;top:4px;width:16px}.shoppinglist flipper-autocomplete .mat-option .item{bottom:3px;display:inline-table;left:30px;position:relative}.shoppinglist flipper-autocomplete .mat-option .item .item-sub-title{display:block;position:relative}.shoppinglist flipper-autocomplete .mat-option .item .item-sub-title .details{bottom:12px;color:#202124;display:inline-block;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:19px;letter-spacing:-.05px;line-height:normal;margin-right:18px;position:relative;width:auto}.shoppinglist flipper-autocomplete .mat-option .item .item-sub-title .details .oval{background-color:#53be6d;border-radius:50px;bottom:0;height:8px;left:0;position:absolute;right:0;top:5px;width:8px}.shoppinglist flipper-autocomplete .mat-option .item .item-title{color:#2575ec;font-family:Roboto;font-size:20px;font-stretch:normal;font-style:normal;font-weight:400;height:26px;letter-spacing:-.07px;line-height:normal;width:240px}.shoppinglist flipper-autocomplete .mat-option .icon{background-color:#fff;border:1px solid #d6daff;border-radius:4px;display:inline-block;height:53px;left:11px;position:relative;top:32px;width:53px}.shoppinglist flipper-autocomplete .mat-option .icon .icon-img{height:36px;left:4px;position:relative;top:7px;width:47px}"]
            },] }
];
BasicShoppingListComponent.propDecorators = {
    updateQtyEmit: [{ type: Output }],
    removeItemEmit: [{ type: Output }],
    orderItems: [{ type: Input, args: ['orderItems',] }]
};

class StandardShoppingListComponent {
    constructor() { }
    ngOnInit() { }
}
StandardShoppingListComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-standard-shopping-list',
                template: "<p>standard-shopping-list works!</p>\r\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
StandardShoppingListComponent.ctorParameters = () => [];

class CalculatorComponent {
    constructor(totalPipe, dialog, randPipe, findKeyPipe) {
        this.totalPipe = totalPipe;
        this.dialog = dialog;
        this.randPipe = randPipe;
        this.findKeyPipe = findKeyPipe;
        this.closeModelEmit = new EventEmitter();
        this.currentNumber = '0';
        this.isNegativeNumber = false;
        this.isCurrentOrder = null;
        this.saveOrderUpdatedEmit = new EventEmitter();
        this.collectCashEmit = new EventEmitter();
        this.currency = 'RWF';
        this.didCollectCashCompleted = {
            isCompleted: false,
            collectedOrder: null,
        };
        this.isCalculatorNumOpen = false;
        this.calculatorNums = [];
        this.searchInputElement = null;
    }
    // collectCash
    set currentOrder(order) {
        this.isCurrentOrder = order;
    }
    get currentOrder() {
        return this.isCurrentOrder;
    }
    // collectCashCompleted
    set collectCashCompleted(inputed) {
        this.didCollectCashCompleted = inputed;
        this.getCollectCashCompleted(inputed);
    }
    get collectCashCompleted() {
        return this.didCollectCashCompleted;
    }
    getCollectCashCompleted(inputed) {
        if (inputed && inputed.isCompleted) {
            const changeDue = inputed.collectedOrder.customerChangeDue === 0 || inputed.collectedOrder.customerChangeDue === '0.00'
                ? 'No'
                : this.randPipe.transform(inputed.collectedOrder.customerChangeDue);
            const cahsReceived = this.randPipe.transform(inputed.collectedOrder.cashReceived);
            return this.dialog
                .message('Success Message', changeDue + ' change out of ' + cahsReceived, 'Success', 'SIZE_MD')
                .subscribe(() => {
                this.isCalculatorNumOpen = false;
                this.closeModelEmit.emit(true);
                console.log('cash collected successfully');
            });
        }
    }
    onKeydownHandler(event) {
        if (!this.currentOrder) {
            return;
        }
        if (!(event.type === 'search' || event.type === 'number' || event.type === 'text') &&
            (event.key === 'Enter' || event.key === 'End')) {
            this.collectCash();
        }
        if ((event.shiftKey && event.key === 'F') || // shift + s
            (event.shiftKey && event.key === 'K') || // shift + k
            (event.shiftKey && event.key === 'S')) {
            // shift + f
            this.isCalculatorNumOpen = false;
        }
        // if not searching or not delete item on cart
        // tslint:disable
        /* tslint:disable */
        if (!(event.target['type'] === 'search' || event.target['type'] === 'number' || event.target['type'] === 'text')) {
            /* tslint:enable */
            // tslint:enable
            if (!(event.key === 'Delete' || // delete key
                (event.shiftKey && event.key === '+') || // shift + (+)
                (event.shiftKey && event.key === 'K') ||
                (event.shiftKey && event.key === 'S') ||
                (event.shiftKey && event.key === 'F') ||
                (event.shiftKey && event.key === '-')) // shift + (-)
            ) {
                this.isCalculatorNumOpen = true;
                if (this.isCalculatorNumOpen) {
                    const re = /^[0-9.]+$/;
                    const key = event.key;
                    if (key.match(re)) {
                        this.calculatorNums.push(key);
                        const nums = this.calculatorNums.join('');
                        this.getNumberOnKeyPress(nums);
                    }
                    // clean calculator by press backspace
                    if (event.key === 'Backspace') {
                        this.calculatorNums.pop();
                        const nums = this.calculatorNums.join('');
                        this.getNumberOnKeyPress(nums);
                    }
                }
            }
            else {
                this.isCalculatorNumOpen = false;
            }
        }
        else {
            if (event.key === 'Shift') {
                this.isCalculatorNumOpen = !this.isCalculatorNumOpen;
            }
        }
    }
    clear() {
        if (this.currentOrder) {
            this.calculatorNums.pop();
            const nums = this.calculatorNums.join('');
            this.getNumberOnKeyPress(nums);
        }
    }
    getDecimal() {
        if (!this.currentNumber.includes('.')) {
            this.currentNumber += '.';
        }
    }
    getNumberOnKeyPress(v) {
        this.currentNumber = v ? v : '0';
        this.makeTotal();
    }
    getNumber(v) {
        if (!this.currentOrder) {
            return this.dialog.message('Failure Message', 'No current order created!', 'Failure', 'SIZE_SM').subscribe(() => {
                this.isCalculatorNumOpen = false;
                this.closeModelEmit.emit(true);
            });
        }
        this.isCalculatorNumOpen = true;
        this.calculatorNums.push(v);
        const nums = this.calculatorNums.join('');
        this.getNumberOnKeyPress(nums);
    }
    makeTotal() {
        if (this.currentOrder) {
            if (this.currentOrder.subTotal <= 0) {
                this.isCalculatorNumOpen = false;
                this.calculatorNums.pop();
                return this.dialog
                    .message('Failure Message', 'No shopping list could found!', 'Failure', 'SIZE_SM')
                    .subscribe(() => {
                    this.isCalculatorNumOpen = false;
                    this.closeModelEmit.emit(true);
                });
            }
            else {
                this.currentOrder.saleTotal = this.currentOrder.subTotal + this.currentOrder.taxAmount;
                this.currentOrder.cashReceived = this.currentNumber;
                this.currentOrder.cashReceived = this.currentOrder.cashReceived
                    ? this.currentOrder.cashReceived
                    : this.currentOrder.saleTotal;
                this.currentOrder.customerChangeDue =
                    this.currentOrder.cashReceived > 0 ? this.currentOrder.cashReceived - this.currentOrder.saleTotal : 0.0;
                this.saveOrderUpdatedEmit.emit(this.currentOrder);
            }
        }
    }
    onKeyFocused(key) {
        if (!this.currentOrder) {
            return;
        }
        return this.findKeyPipe.transform(this.calculatorNums, key);
    }
    collectCash() {
        if (!this.currentOrder) {
            return this.dialog.message('Failure Message', 'No current order created!', 'Failure', 'SIZE_SM');
        }
        this.currentOrder.orderItems.forEach(item => {
            if (item.quantity <= 0) {
                this.dialog
                    .message('Failure Message', 'Negative quantity is not allowed.', 'Failure', 'SIZE_SM')
                    .subscribe(() => { });
            }
        });
        this.collectCashEmit.emit(false);
        if (this.currentOrder.subTotal <= 0) {
            return this.dialog
                .message('Failure Message', 'Total to be paid is equal to zero.', 'Failure', 'SIZE_SM')
                .subscribe(() => {
                this.isCalculatorNumOpen = false;
                this.closeModelEmit.emit(true);
            });
        }
        if (this.currentOrder.customerChangeDue < 0) {
            return this.dialog.message('Failure Message', "Cash received can't less than 0!", 'Failure', 'SIZE_SM');
        }
        if (this.currentOrder.customerChangeDue === 0) {
            this.currentOrder.cashReceived = parseFloat(this.currentOrder.saleTotal);
            this.currentOrder.customerChangeDue =
                parseFloat(this.currentOrder.cashReceived) - parseFloat(this.currentOrder.saleTotal);
        }
        this.currentOrder.cashReceived = parseFloat(this.currentOrder.cashReceived);
        this.currentOrder.active = false;
        this.saveOrderUpdatedEmit.emit(this.currentOrder);
        this.collectCashEmit.emit(true);
        this.isCalculatorNumOpen = false;
        this.calculatorNums = [];
    }
}
CalculatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-calculator',
                template: "<div class=\"calculator\" [class.calculatorNumOpen]=\"isCalculatorNumOpen\">\r\n  <div class=\"keys\">\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('7')\" (click)=\"getNumber('7')\"><span class=\"value\">7</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('8')\" (click)=\"getNumber('8')\"><span class=\"value\">8</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('9')\" (click)=\"getNumber('9')\"><span class=\"value\">9</span>\r\n    </div>\r\n\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('4')\" (click)=\"getNumber('4')\"><span class=\"value\">4</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('5')\" (click)=\"getNumber('5')\"><span class=\"value\">5</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('6')\" (click)=\"getNumber('6')\"><span class=\"value\">6</span>\r\n    </div>\r\n\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('1')\" (click)=\"getNumber('1')\"><span class=\"value\">1</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('2')\" (click)=\"getNumber('2')\"><span class=\"value\">2</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('3')\" (click)=\"getNumber('3')\"><span class=\"value\">3</span>\r\n    </div>\r\n\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('.')\" (click)=\"getNumber('.')\"><span class=\"value\">.</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('0')\" (click)=\"getNumber('0')\"><span class=\"value\">0</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('00')\" (click)=\"getNumber('00')\"><span\r\n        class=\"value\">00</span></div>\r\n  </div>\r\n  <div class=\"results-area\">\r\n    <div class=\"row results\" *ngIf=\"currentOrder\">\r\n      <div class=\"col-4\">\r\n        <div class=\"amounts\">\r\n          {{currency}} {{currentOrder.cashReceived | roundNumber}}\r\n        </div>\r\n      </div>\r\n      <div class=\"col-1\">\r\n        <div class=\"btn-clear\">\r\n          <button type=\"button\" class=\"clear\" (click)=\"clear()\">CLEAR</button>\r\n        </div>\r\n\r\n      </div>\r\n\r\n    </div>\r\n    <div>\r\n      <div class=\"row\" *ngIf=\"currentOrder\">\r\n        <div class=\"col\">\r\n          <table>\r\n            <tr *ngIf=\"currentOrder.subTotal\">\r\n              <td>\r\n                <span class=\"amount-title1\" style=\"font-size:11px!important\">SUB-TOTAL</span>\r\n              </td>\r\n              <td>\r\n                <span class=\"amount-number1\" style=\"font-size:11px!important\">{{currency}} {{currentOrder.subTotal | roundNumber}}</span>\r\n              </td>\r\n\r\n            </tr>\r\n            <tr *ngIf=\"currentOrder.taxAmount\">\r\n              <td>\r\n                <span class=\"amount-title1\" style=\"font-size:11px!important\">VAT</span>\r\n              </td>\r\n              <td>\r\n                <span class=\"amount-number1\" style=\"font-size:11px!important\">{{currency}} {{currentOrder.taxAmount | roundNumber}}</span>\r\n              </td>\r\n\r\n            </tr>\r\n            <tr *ngIf=\"currentOrder.saleTotal\" style=\"margin-top:1px; border-top: 2px #000 solid!important\">\r\n              <td>\r\n                <span class=\"amount-title1\">TOTAL TO BE PAID</span>\r\n              </td>\r\n              <td>\r\n                <span class=\"amount-number1\">{{currency}} {{currentOrder.saleTotal | roundNumber}}</span>\r\n              </td>\r\n\r\n            </tr>\r\n            <tr *ngIf=\"currentOrder.customerChangeDue\">\r\n              <td>\r\n                <span class=\"amount-title1\">CHANGE</span>\r\n              </td>\r\n              <td>\r\n                <span class=\"amount-number1\"\r\n                  [ngClass]=\"currentOrder && currentOrder.customerChangeDue < 0?'colorToRed':'colorToBack'\">{{currency}}\r\n                  {{currentOrder.customerChangeDue | roundNumber}}\r\n                </span>\r\n              </td>\r\n            </tr>\r\n          </table>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\" *ngIf=\"currentOrder\">\r\n        <div class=\"col\">\r\n          <button type=\"button\" *ngIf=\"currentOrder\" class=\"cash-btn\" (click)=\"collectCash()\">\r\n            <span class=\"cash-btn-Text\">Collect Cash</span>\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n",
                providers: [CalculateTotalClassPipe, FindKeyPipe, RoundNumberPipe],
                styles: [".calculatorNumOpen{border:2px solid #3f5ec6!important}.calculatorKeyOpen{border:1px solid #3f5ec6!important}*{box-sizing:border-box}.row:after{clear:both;content:\"\";display:table}.row{margin:3px 3px 15px}.row .row:after{clear:both;content:\"\";display:table}.row .col{padding:5px;width:100%}.row .col-1{padding:5px;width:25%}.row .col-4{padding:5px;width:75%}.row .col-3{padding:5px;width:50%}.row .col-2{padding:5px;width:33.3%}.calculator{-webkit-touch-callout:none;-webkit-user-select:none;background-color:#fcfeff;border:1px solid #e2e9ed;border-radius:6px;overflow:auto;padding:5px;user-select:none;width:100vh}.calculator .results-area{margin:2px}.calculator .results-area .results{background-color:#f0f5fb;border:1px solid rgba(95,147,255,.06);height:82px}.calculator .results-area .results .amounts{color:#1b2125;font-family:Roboto;font-size:30px;font-stretch:normal;font-style:normal;font-weight:400;height:66px;left:8px;letter-spacing:normal;line-height:normal;position:relative;top:28%;width:100%}.calculator .results-area .results .btn-clear{position:relative;right:8px;top:20%}.calculator .results-area .results .btn-clear .clear{background-color:#ee4e5c;border:1px solid #ee4e5c;border-radius:2px;color:#fff;font-stretch:normal;font-style:normal;font-weight:500;height:45px;letter-spacing:1.25px;line-height:1.14;text-align:center;width:100%}.calculator .results-area .totalAmounts{background-color:rgba(95,147,255,.06);border:1px solid #5f93ff;height:90px}.calculator .results-area .totalAmounts .colorToRed{color:red!important}.calculator .results-area .totalAmounts .colorToBack{color:#1b2125!important}.calculator .results-area .totalAmounts .amount-title{font-size:14px;font-weight:500;height:19px;top:12px;width:117px}.calculator .results-area .totalAmounts .amount-number,.calculator .results-area .totalAmounts .amount-title{color:#1b2125;font-family:Roboto;font-stretch:normal;font-style:normal;left:13px;letter-spacing:normal;line-height:normal;position:relative}.calculator .results-area .totalAmounts .amount-number{display:block;font-size:16px;font-weight:400;height:66px;top:30px;width:123px}.calculator .results-area .cash-btn{background-color:#48b332;border:1px solid #48b332;border-radius:2px;height:45px;position:relative;width:100%}.calculator .results-area .cash-btn .cash-btn-Text{color:#fff;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:16px;letter-spacing:1.25px;line-height:1.14;text-align:center;width:114px}.calculator .keys{margin:3px 3px 15px}.calculator .key{background-color:#f0f5fb;border:1px solid rgba(95,147,255,.06);cursor:pointer;display:inline-block;height:82px;overflow:hidden;vertical-align:middle;width:33.3%}.calculator .key .value{bottom:18px;color:#202124;font-family:Roboto;font-size:34px;font-stretch:normal;font-style:normal;font-weight:500;height:45px;left:44%;letter-spacing:3.04px;line-height:normal;position:relative;right:0;text-align:center;top:22px;width:23px}.amount-title1{font-size:15px;font-weight:600}.amount-number1,.amount-title1{color:#1b2125;font-family:Roboto;font-stretch:normal;font-style:normal;letter-spacing:normal;line-height:normal;position:relative}.amount-number1{display:block;font-size:20px;font-weight:700;font-weight:400}"]
            },] }
];
CalculatorComponent.ctorParameters = () => [
    { type: CalculateTotalClassPipe },
    { type: DialogService },
    { type: RoundNumberPipe },
    { type: FindKeyPipe }
];
CalculatorComponent.propDecorators = {
    currentOrder: [{ type: Input, args: ['currentOrder',] }],
    collectCashCompleted: [{ type: Input, args: ['collectCashCompleted',] }],
    closeModelEmit: [{ type: Output }],
    saveOrderUpdatedEmit: [{ type: Output }],
    collectCashEmit: [{ type: Output }],
    currency: [{ type: Input }],
    searchInputElement: [{ type: ViewChild, args: ['mySearchInput', {
                    static: false,
                },] }],
    onKeydownHandler: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};

const flipperUrl = 'http://localhost:8082';

class FlipperPosComponent {
    constructor(database, stock, http, variant, product, totalPipe) {
        this.database = database;
        this.stock = stock;
        this.http = http;
        this.variant = variant;
        this.product = product;
        this.totalPipe = totalPipe;
        this.defaultBusiness$ = null;
        this.defaultBranch = null;
        this.defaultTax$ = null;
        this.orderDetails = [];
        this.currency = null;
        this.variants = [];
        this.seTheVariantFiltered = [];
        this.collectCashCompleted = {};
        this.date = new Date().toISOString();
        this.database.connect(PouchConfig.bucket, localStorage.getItem('channel'));
        this.database.sync([PouchConfig.syncUrl]);
    }
    get theVariantFiltered() {
        return this.seTheVariantFiltered;
    }
    set theVariantFiltered(value) {
        this.seTheVariantFiltered = value;
    }
    get currentOrder() {
        return this.setCurrentOrder;
    }
    set currentOrder(value) {
        this.setCurrentOrder = value;
    }
    get stockVariant() {
        return this.setStockVariant;
    }
    set stockVariant(value) {
        this.setStockVariant = value;
    }
    get taxes() {
        return this.setTaxes;
    }
    set taxes(value) {
        this.setTaxes = value;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getTaxes();
            yield this.currentBusiness();
            yield this.currentBranches();
            yield this.newOrder();
            yield this.hasDraftOrder();
            yield this.stockVariants();
            this.currentOrder.orderItems =
                (yield this.currentOrder) && this.currentOrder.orderItems && this.currentOrder.orderItems.length > 0
                    ? this.currentOrder.orderItems
                    : [];
            this.updateOrder([]);
            this.currency = this.defaultBusiness$ ? this.defaultBusiness$.currency : 'RWF';
        });
    }
    currentBusiness() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.http
                .get(flipperUrl + '/api/business')
                .toPromise()
                .then(business => {
                this.defaultBusiness$ = business;
            });
        });
    }
    getTaxes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.http
                .get(flipperUrl + '/api/taxes')
                .toPromise()
                .then(taxes => {
                this.taxes = taxes;
            });
        });
    }
    currentBranches() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.http
                .get(flipperUrl + '/api/branches/' + this.defaultBusiness$.id)
                .toPromise()
                .then(branches => {
                for (let branch of branches) {
                    if (branch.active) {
                        this.defaultBranch = branch;
                    }
                }
            });
        });
    }
    makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    generateCode() {
        return this.makeid(5);
    }
    newOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.currentOrder) {
                const formOrder = {
                    reference: 'SO' + this.generateCode(),
                    orderNumber: 'SO' + this.generateCode(),
                    branchId: this.defaultBranch.id,
                    status: STATUS.OPEN,
                    orderType: ORDERTYPE.SALES,
                    active: true,
                    orderItems: [],
                    subTotal: 0.0,
                    draft: true,
                    cashReceived: 0.0,
                    customerChangeDue: 0.0,
                    table: 'orders',
                    channels: [this.defaultBusiness$.userId],
                    createdAt: this.date,
                    updatedAt: this.date,
                };
                // create a draft order to be used.
                yield this.http
                    .post(flipperUrl + '/api/order', formOrder)
                    .toPromise()
                    .then(order => {
                    this.currentOrder = order;
                });
            }
        });
    }
    hasDraftOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.draftOrder(this.defaultBranch);
        });
    }
    draftOrder(branchId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.http
                .post(flipperUrl + '/api/order', {})
                .toPromise()
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                this.currentOrder = res;
                this.currentOrder.orderItems =
                    (yield this.currentOrder) && this.currentOrder.orderItems && this.currentOrder.orderItems.length > 0
                        ? this.currentOrder.orderItems
                        : [];
            }));
        });
    }
    stockVariants() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.http
                .get(flipperUrl + '/api/stock-variant')
                .toPromise()
                .then(orders => {
                if (orders.length > 0) {
                    this.stockVariant = orders;
                }
                else {
                    this.stockVariant = [];
                }
            });
        });
    }
    loadVariants(param = null) {
        let variantsArray = [];
        if (this.stockVariant.length > 0) {
            this.stockVariant.forEach(variant => {
                const form = {
                    id: variant.id,
                    variantId: variant.variantId,
                    price: variant.retailPrice,
                    sku: variant.sku ? variant.sku : '00',
                    variantName: variant.variantName ? variant.variantName : 'no item',
                    productName: variant.productName ? variant.productName : 'no item',
                    taxName: variant.taxName,
                    taxRate: variant.taxPercentage,
                    unit: variant.unit,
                    currentStock: variant.currentStock,
                    canTrackingStock: variant.canTrackingStock,
                    lowStock: variant.lowStock,
                    branchId: variant.branchId,
                };
                if (form.currentStock > 0) {
                    // Todo: niba stock irimo koko this should be true if(form.canTrackingStock && form.currentStock > 0){
                    variantsArray.push(form);
                }
            });
        }
        return variantsArray;
    }
    iWantToSearchVariant(event) {
        if (event && event != undefined && event != null) {
            let results = this.loadVariants(event);
            console.log(this.loadVariants(event));
            if (results.length > 0) {
                this.theVariantFiltered = this.filterByValue(results, event);
            }
        }
    }
    filterByValue(arrayOfObject, term) {
        const query = term.toString().toLowerCase();
        return arrayOfObject.filter((v, i) => {
            var _a, _b, _c, _d, _e;
            if (v.variantName.toString().toLowerCase().indexOf(query) >= 0 ||
                ((_a = v.sku) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().includes(query)) >= 0 ||
                ((_b = v.retailPrice) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase().includes(query)) >= 0 ||
                ((_c = v.unit) === null || _c === void 0 ? void 0 : _c.toString().toLowerCase().includes(query)) >= 0 ||
                ((_d = v.unit) === null || _d === void 0 ? void 0 : _d.toString().toLowerCase().includes(query)) >= 0 ||
                ((_e = v.productName) === null || _e === void 0 ? void 0 : _e.toString().toLowerCase().indexOf(query)) >= 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    updateOrderDetails(details) {
        return __awaiter(this, void 0, void 0, function* () {
            if (details.action === 'DELETE') {
                this.currentOrder.orderItems = this.currentOrder.orderItems.filter(el => {
                    return el.id != details.item.id;
                });
            }
            if (details.action === 'UPDATE') {
                details.item.price = parseFloat(details.item.price);
                const taxRate = details.item.taxRate ? details.item.taxRate : 0;
                const subTotal = details.item.price * details.item.quantity;
                details.item.taxAmount = (subTotal * taxRate) / 100;
                details.item.subTotal = subTotal;
                this.currentOrder.orderItems = this.currentOrder.orderItems.filter(el => {
                    return el.id != details.item.id;
                });
                this.currentOrder.orderItems.push(details.item);
            }
            const orderDetails = this.currentOrder.orderItems;
            this.updateOrder(orderDetails);
        });
    }
    updateOrder(orderDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            let orderDetails = [];
            if (orderDetail.length == 0) {
                orderDetails = this.currentOrder.orderItems.filter(order => order.orderId == this.currentOrder.id);
            }
            else {
                orderDetails = orderDetail;
            }
            if (orderDetails.length > 0) {
                const subtotal = parseFloat(this.totalPipe.transform(orderDetails, 'subTotal'));
                const taxAmount = parseFloat(this.totalPipe.transform(orderDetails, 'taxAmount'));
                this.currentOrder.subTotal = subtotal;
                this.currentOrder.taxAmount = taxAmount;
                this.currentOrder.saleTotal = subtotal + taxAmount;
                this.currentOrder.customerChangeDue =
                    this.currentOrder.cashReceived > 0
                        ? parseFloat(this.currentOrder.cashReceived) - this.currentOrder.saleTotal
                        : 0.0;
                this.currentOrder.customerChangeDue = parseFloat(this.currentOrder.customerChangeDue);
                this.currentOrder = this.currentOrder;
            }
        });
    }
    addToCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.id = this.database.uid();
            event.orderId = this.currentOrder.id;
            const taxRate = event.taxRate ? event.taxRate : 0;
            const subTotal = event.price * event.quantity;
            event.taxAmount = (subTotal * taxRate) / 100;
            event.subTotal = subTotal;
            this.currentOrder.orderItems.push(event);
            const orderDetails = this.currentOrder.orderItems;
            if (orderDetails.length > 0) {
                yield this.updateOrder(orderDetails);
            }
        });
    }
    didCollectCash(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.collectCashCompleted = { isCompleted: false, collectedOrder: this.currentOrder };
            if (event === true) {
                yield this.createStockHistory();
                this.currentOrder.isDraft = false;
                this.currentOrder.status = STATUS.COMPLETE;
                this.currentOrder.createdAt = new Date().toISOString();
                this.currentOrder.updatedAt = new Date().toISOString();
                this.currentOrder.active = false;
                this.currentOrder['draft'] = false;
                this.currentOrder['orderItems'];
                yield this.http
                    .put(flipperUrl + '/api/order/' + this.currentOrder.id, this.currentOrder)
                    .toPromise()
                    .then((order) => __awaiter(this, void 0, void 0, function* () {
                    this.collectCashCompleted = { isCompleted: true, collectedOrder: order };
                    this.currentOrder = null;
                    yield this.newOrder();
                    yield this.hasDraftOrder();
                }));
            }
        });
    }
    createStockHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            const odetails = this.currentOrder.orderItems;
            if (odetails.length) {
                odetails.forEach((details) => __awaiter(this, void 0, void 0, function* () {
                    if (details.currentStock > 0) {
                        const stockHistories = {
                            id: this.database.uid(),
                            orderId: details.orderId,
                            variantId: details.variantId,
                            variantName: details.variantName,
                            stockId: details.id,
                            reason: 'Sold',
                            quantity: details.quantity,
                            isDraft: false,
                            note: 'Customer sales',
                            table: 'stockHistories',
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            channels: [this.defaultBusiness$.userId],
                        };
                        yield this.http
                            .post(flipperUrl + '/api/stock-histories', stockHistories)
                            .toPromise()
                            .then();
                    }
                }));
            }
        });
    }
    saveOrderUpdated(event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateOrder([]);
        });
    }
}
FlipperPosComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-flipper-pos',
                template: "<div @insertPos>\r\n  <flipper-basic-pos\r\n\r\n  [currentOrder]=\"currentOrder\"\r\n  [collectCashCompleted]=\"collectCashCompleted\"\r\n  [taxes]=\"taxes\"\r\n  [currency]=\"currency\"\r\n  (addToCartEmit)=\"addToCart($event)\"\r\n  [foundVariant]=\"theVariantFiltered\"\r\n  (searchEmitValue)=\"iWantToSearchVariant($event)\"\r\n  (saveOrderUpdatedEmit)=\"saveOrderUpdated($event)\"\r\n  (updateOrderDetailsEmit)=\"updateOrderDetails($event)\"\r\n  (didCollectCashEmit)=\"didCollectCash($event)\">\r\n  </flipper-basic-pos>\r\n\r\n</div>\r\n",
                animations: [
                    trigger('insertPos', [transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))]),
                ],
                styles: ["section{background-color:#29282e;font-family:sans-serif;height:100vh;position:absolute;text-align:center;top:0;width:100vw}h1{color:#66d9ef}span{color:#fff;font-size:18px;margin-top:50px}.btns-container{display:flex;flex-direction:row;justify-content:space-around;margin:50px auto;width:350px}.copyright{bottom:30px;color:#fff;position:absolute;width:100%}span{display:block;margin:10px auto;padding:0;width:100%}"]
            },] }
];
FlipperPosComponent.ctorParameters = () => [
    { type: PouchDBService },
    { type: StockService },
    { type: HttpClient },
    { type: VariationService },
    { type: ProductService },
    { type: CalculateTotalClassPipe }
];

class FlipperPosModule {
}
FlipperPosModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FlipperBasicPosComponent,
                    SearchBoxComponent,
                    AutocompleteComponent,
                    ShoppingListsComponent,
                    BasicShoppingListComponent,
                    StandardShoppingListComponent,
                    CalculatorComponent,
                    UpdatePriceDialogComponent,
                    AddCartItemDialogComponent,
                    FlipperPosComponent,
                ],
                imports: [
                    CommonModule,
                    HttpClientModule,
                    FlipperComponentsModule,
                    BrowserAnimationsModule,
                    BrowserModule,
                    VendorsModule,
                    DialogModule,
                ],
                entryComponents: [UpdatePriceDialogComponent, AddCartItemDialogComponent],
                exports: [
                    FlipperBasicPosComponent,
                    SearchBoxComponent,
                    AutocompleteComponent,
                    ShoppingListsComponent,
                    BasicShoppingListComponent,
                    StandardShoppingListComponent,
                    CalculatorComponent,
                    FlipperPosComponent,
                ],
            },] }
];

/*
 * Public API Surface of flipper-pos
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AutocompleteComponent, BasicShoppingListComponent, CalculatorComponent, FlipperBasicPosComponent, FlipperPosComponent, FlipperPosModule, FlipperPosService, SearchBoxComponent, ShoppingListsComponent, StandardShoppingListComponent, UpdatePriceDialogComponent as ɵa, AddCartItemDialogComponent as ɵb };
//# sourceMappingURL=enexus-flipper-pos.js.map
