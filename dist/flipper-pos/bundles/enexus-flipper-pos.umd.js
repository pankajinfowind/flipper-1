(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@enexus/flipper-components'), require('rxjs'), require('@enexus/flipper-dialog'), require('@angular/forms'), require('@angular/material/dialog'), require('@enexus/flipper-vendors'), require('@angular/material/autocomplete'), require('@angular/common'), require('@angular/animations'), require('@angular/common/http'), require('@enexus/flipper-inventory'), require('@angular/platform-browser/animations'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@enexus/flipper-pos', ['exports', '@angular/core', '@enexus/flipper-components', 'rxjs', '@enexus/flipper-dialog', '@angular/forms', '@angular/material/dialog', '@enexus/flipper-vendors', '@angular/material/autocomplete', '@angular/common', '@angular/animations', '@angular/common/http', '@enexus/flipper-inventory', '@angular/platform-browser/animations', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.enexus = global.enexus || {}, global.enexus['flipper-pos'] = {}), global.ng.core, global.flipperComponents, global.rxjs, global['@enexus/flipper-dialog'], global.ng.forms, global.ng.material.dialog, global['@enexus/flipper-vendors'], global.ng.material.autocomplete, global.ng.common, global.ng.animations, global.ng.common.http, global.flipperInventory, global.ng.platformBrowser.animations, global.ng.platformBrowser));
}(this, (function (exports, i0, flipperComponents, rxjs, flipperDialog, forms, dialog, flipperVendors, autocomplete, common, animations, http, flipperInventory, animations$1, platformBrowser) { 'use strict';

    var FlipperPosService = /** @class */ (function () {
        function FlipperPosService() {
        }
        return FlipperPosService;
    }());
    FlipperPosService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FlipperPosService_Factory() { return new FlipperPosService(); }, token: FlipperPosService, providedIn: "root" });
    FlipperPosService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    FlipperPosService.ctorParameters = function () { return []; };

    var UpdatePriceDialogComponent = /** @class */ (function () {
        function UpdatePriceDialogComponent(dialogRef, price, formBuilder, notificationSvc) {
            this.dialogRef = dialogRef;
            this.price = price;
            this.formBuilder = formBuilder;
            this.notificationSvc = notificationSvc;
            this.submitted = false;
            this.isFocused = '';
        }
        Object.defineProperty(UpdatePriceDialogComponent.prototype, "formControl", {
            get: function () {
                return this.form.controls;
            },
            enumerable: false,
            configurable: true
        });
        UpdatePriceDialogComponent.prototype.onKeydownHandler = function (event) {
            if (event.key === 'Esc') {
                this.dialogRef.close('close');
            }
        };
        UpdatePriceDialogComponent.prototype.ngOnInit = function () {
            this.form = this.formBuilder.group({
                price: [!this.price ? this.price : 0.0, forms.Validators.required],
            });
        };
        UpdatePriceDialogComponent.prototype.onSubmit = function () {
            this.submitted = true;
            // stop here if form is invalid
            if (this.form.invalid) {
                this.notificationSvc.error('Add price', 'We need you to complete all of the required fields before we can continue');
                return;
            }
            else {
                this.dialogRef.close({ price: this.form.value.price });
            }
        };
        UpdatePriceDialogComponent.prototype.focusing = function (value) {
            this.isFocused = value;
            this.form.controls.price.setValue('');
        };
        UpdatePriceDialogComponent.prototype.focusingOut = function () {
            this.isFocused = '';
        };
        return UpdatePriceDialogComponent;
    }());
    UpdatePriceDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-update-price-dialog',
                    template: "<h1 mat-dialog-title>Add Price</h1>\r\n<form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\r\n\r\n\r\n<div>\r\n   \r\n  <mat-error *ngIf=\"submitted && formControl.price.errors\">\r\n    <div *ngIf=\"formControl.price.errors.required\">Price is required</div>\r\n</mat-error>\r\n        <table style=\"width: 100%;\">\r\n    \r\n            <tr class=\"tr\" [class.trIsFocused]=\"isFocused=='price'\" style=\"border-top: 1px #d5d9dc solid; border-right: 1px #d5d9dc solid; border-left: 1px #d5d9dc solid;\">\r\n                \r\n                <td class=\"td\"  [class.tdIsFocused]=\"isFocused=='price'\">\r\n                    Add Price\r\n                  </td>\r\n                  <td style=\"width:60%\">\r\n                    <input type=\"number\" class=\"input\" formControlName=\"price\"\r\n                    (focus)=\"focusing('price')\" (focusout)=\"focusingOut()\" autofocus placeholder=\"Add Price\" />\r\n                   \r\n                  </td>\r\n             </tr>\r\n        </table>    \r\n  \r\n\r\n</div>\r\n<div class=\"mt-3 mb-3\" style=\"float: right;\">\r\n    <button mat-button (click)=\"dialogRef.close('close')\" class=\"ml-3\" cdkFocusInitial>Cancel</button>\r\n    <button  type=\"submit\" class=\"button-default button--secondary ml-1\" cdkFocusInitial>Done</button>\r\n</div>\r\n</form>\r\n",
                    styles: [".toolbar{background-color:#211a36;color:#fff!important}input{background-color:initial!important;width:100%!important}input,mat-select{border:none!important;font-size:14px!important;line-height:1.715!important;padding:12px 16px!important}mat-select{background-color:#fff!important;width:100%!important;width:100%}.mat-select-placeholder,.mat-select-value,mat-select{color:#2996cc!important}textarea{background:0 0;border:0;height:120.03px;padding:12px 16px;resize:none;width:100%}.tr{border-bottom:1px solid #d5d9dc;color:#343b42;display:flex;font-size:14px;line-height:1.715;width:100%}.td{width:40%;width:200px}.td,.td-sm{background-color:#ebedef;cursor:default;display:flex;font-weight:500;justify-content:space-between;padding:12px 16px}.td-sm{width:25%;width:200px}.trIsFocused{border-bottom:1px solid #2996cc}.tdIsFocused{background-color:#d4eaf5}.invalid{border-bottom:1px solid #ad061c}.form-link-with-spacing{display:block;padding:12px 16px;width:100%}.hyperlink{color:#2996cc!important;cursor:pointer;font-size:14px;font-weight:500;line-height:1.715;text-decoration:none}.price{width:100%}.price .currency{display:inline-block;margin-bottom:6px;margin-left:5px;width:25%}.price .pinput{display:inline-block;width:50%}.table--flex .table-row,.table--flex tr{display:flex;line-height:1.715}.table-row,tr{border-bottom:1px solid #d5d9dc}.table--flex .table-cell,.table--flex .table-cell-header,.table--flex td,.table--flex th{align-items:center;display:flex;flex:1 1 100%}.table-cell-header:first-child,.table-cell:first-child,td:first-child,th:first-child{padding-left:16px}.editable-variation-table__header__cell{overflow:visible}.table-cell-header,th{border-top:1px solid #d5d9dc;color:#343b42;font-weight:500}.table-cell,.table-cell-header,td,th{height:48px;overflow:hidden;padding-left:8px;padding-right:8px;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap}.table-header,thead{background-color:#ebedef;text-align:left}.table--editable{border-left:1px solid #d5d9dc;border-right:1px solid #d5d9dc}.editable-variation-list__more-options-cell{align-items:center;display:flex;height:100%;justify-content:center;position:absolute;right:-40px;top:0;width:40px}.editable-variation-list__more-options-cell .dropdown{position:relative}.dropdown__trigger{cursor:pointer;outline:0}.more-actions-menu__trigger{align-items:center;display:flex;height:100%;justify-content:center;width:100%}svg:not(:root){overflow:hidden}.caret-down:after,.caret-left:after,.caret-right:after,.caret-up:after,.svg-icon{display:inline-block}"]
                },] }
    ];
    UpdatePriceDialogComponent.ctorParameters = function () { return [
        { type: dialog.MatDialogRef },
        { type: undefined, decorators: [{ type: i0.Inject, args: [dialog.MAT_DIALOG_DATA,] }] },
        { type: forms.FormBuilder },
        { type: flipperComponents.NotificationService }
    ]; };
    UpdatePriceDialogComponent.propDecorators = {
        onKeydownHandler: [{ type: i0.HostListener, args: ['document:keydown', ['$event'],] }]
    };

    var AddCartItemDialogComponent = /** @class */ (function () {
        function AddCartItemDialogComponent(dialogRef, formBuilder, notificationSvc, setting, taxes$) {
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
        Object.defineProperty(AddCartItemDialogComponent.prototype, "formControl", {
            get: function () {
                return this.form.controls;
            },
            enumerable: false,
            configurable: true
        });
        AddCartItemDialogComponent.prototype.onKeydownHandler = function (event) {
            if (event.key === 'Esc') {
                this.dialogRef.close('close');
            }
        };
        AddCartItemDialogComponent.prototype.ngOnInit = function () {
            this.form = this.formBuilder.group({
                price: ['', forms.Validators.required, forms.Validators.min(0)],
                name: 'Custom Amount',
                quantity: [1, forms.Validators.min(0)],
                tax: null,
                unit: '',
            });
        };
        AddCartItemDialogComponent.prototype.onSubmit = function () {
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
        };
        AddCartItemDialogComponent.prototype.focusing = function (value) {
            this.isFocused = value;
            // if (value === 'name') {
            //   this.form.controls.name.setValue('')
            // } else if (value === 'price') {
            //   this.form.controls.price.setValue('')
            // } else if (value === 'quantity') {
            //   this.form.controls.quantity.setValue('')
            // }
        };
        AddCartItemDialogComponent.prototype.focusingOut = function () {
            this.isFocused = '';
        };
        return AddCartItemDialogComponent;
    }());
    AddCartItemDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-add-cart-item-dialog',
                    template: "<h1 mat-dialog-title>Add Cart Item</h1>\r\n<form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\r\n      <div>\r\n            <mat-error *ngIf=\"submitted && formControl.price.errors\">\r\n                <div *ngIf=\"formControl.price.errors.required\">Price is required.</div>\r\n                <div *ngIf=\"formControl.price.errors.min\">Price entered is negative number. </div>\r\n            </mat-error>\r\n\r\n            <mat-error *ngIf=\"submitted && formControl.quantity.errors\">\r\n                <div *ngIf=\"formControl.quantity.errors.required\">Quantity is required  </div>\r\n                <div *ngIf=\"formControl.quantity.errors.min\">Quantity entered is negative number. </div>\r\n            </mat-error>\r\n        \r\n              <table style=\"width: 100%;\">\r\n          \r\n                  <tr class=\"tr\" [class.trIsFocused]=\"isFocused=='price'\" style=\"border-top: 1px #d5d9dc solid; border-right: 1px #d5d9dc solid; border-left: 1px #d5d9dc solid;\">\r\n                      \r\n                      <td class=\"td\"  [class.tdIsFocused]=\"isFocused=='price'\">\r\n                          Price\r\n                        </td>\r\n                        <td style=\"width:60%\">\r\n                          <input type=\"number\" class=\"input\" formControlName=\"price\"\r\n                          (focus)=\"focusing('price')\" (focusout)=\"focusingOut()\" autofocus placeholder=\"0.00\" />\r\n                          \r\n                        </td>\r\n                  </tr>\r\n                  <tr class=\"tr\" [class.trIsFocused]=\"isFocused=='quantity' || isFocused=='unit'\" style=\" border-right: 1px #d5d9dc solid; border-left: 1px #d5d9dc solid;\">\r\n                      \r\n                      <td class=\"td\"  [class.tdIsFocused]=\"isFocused=='quantity' || isFocused=='unit'\">\r\n                          Quantity/unit\r\n                        </td>\r\n                        <td style=\"width:60%\">\r\n                        <table style=\"width:100%\">\r\n                          <tr>\r\n                            <td style=\"width:50%\">\r\n                              <input type=\"number\" class=\"input\" formControlName=\"quantity\"\r\n                              (focus)=\"focusing('quantity')\" (focusout)=\"focusingOut()\" autofocus placeholder=\"0\" />\r\n                            </td>\r\n                          <td style=\"width:50%\">\r\n                            <mat-select class=\"select\" formControlName=\"unit\" placeholder=\"Choose Unit\"\r\n                            (focus)=\"focusing('unit')\"  (focusout)=\"focusingOut()\">\r\n                                    <mat-option *ngFor=\"let unit of units\" [value]=\"unit.value\">\r\n                                    {{unit.name}}\r\n                                    </mat-option>\r\n                          </mat-select>\r\n                          </td>\r\n                          </tr>\r\n                        </table>\r\n          \r\n                        </td>\r\n                  </tr>\r\n                  <tr class=\"tr\" [class.trIsFocused]=\"isFocused=='name'\" style=\"border-right: 1px #d5d9dc solid; border-left: 1px #d5d9dc solid;\">\r\n                      \r\n                      <td class=\"td\"  [class.tdIsFocused]=\"isFocused=='name'\">\r\n                        Description\r\n                        </td>\r\n                        <td style=\"width:60%\">\r\n                          <input type=\"text\" class=\"input\" formControlName=\"name\"\r\n                          (focus)=\"focusing('name')\" (focusout)=\"focusingOut()\" autofocus placeholder=\"Description(product or service name)\" />\r\n                        </td>\r\n                  </tr>\r\n\r\n                  <tr style=\" border-right: 1px #d5d9dc solid; border-left: 1px #d5d9dc solid;\" class=\"tr\" [class.trIsFocused]=\"isFocused=='taxes'\">\r\n                    <td class=\"td\" [class.tdIsFocused]=\"isFocused=='taxes'\">\r\n                      <label>Tax</label>\r\n                    </td>\r\n                    <td style=\"width: 60%;\">\r\n\r\n                      <mat-select class=\"select\" formControlName=\"tax\" placeholder=\"Choose Tax\"\r\n                        (focus)=\"focusing('taxes')\"\r\n                        (focusout)=\"focusingOut()\">\r\n                        <mat-option *ngFor=\"let tax of taxes$\" [value]=\"tax\">\r\n                          {{tax.name}} ({{tax.percentage}}%)\r\n                        </mat-option>\r\n                      </mat-select>\r\n\r\n                    </td>\r\n                  </tr>\r\n\r\n              </table>    \r\n        \r\n      </div>\r\n      <div class=\"mt-3 mb-3\" style=\"float: right;\">\r\n          <button mat-button (click)=\"dialogRef.close('close')\" class=\"ml-3\" cdkFocusInitial>Cancel</button>\r\n          <button  type=\"submit\" class=\"button-default button--success ml-1\" cdkFocusInitial>Add</button>\r\n      </div>\r\n</form>\r\n",
                    styles: [".toolbar{background-color:#211a36;color:#fff!important}input{background-color:initial!important;width:100%!important}input,mat-select{border:none!important;font-size:14px!important;line-height:1.715!important;padding:12px 16px!important}mat-select{background-color:#fff!important;width:100%!important;width:100%}.mat-select-placeholder,.mat-select-value,mat-select{color:#2996cc!important}textarea{background:0 0;border:0;height:120.03px;padding:12px 16px;resize:none;width:100%}.tr{border-bottom:1px solid #d5d9dc;color:#343b42;display:flex;font-size:14px;line-height:1.715;width:100%}.td{width:40%;width:200px}.td,.td-sm{background-color:#ebedef;cursor:default;display:flex;font-weight:500;justify-content:space-between;padding:12px 16px}.td-sm{width:25%;width:200px}.trIsFocused{border-bottom:1px solid #2996cc}.tdIsFocused{background-color:#d4eaf5}.invalid{border-bottom:1px solid #ad061c}.form-link-with-spacing{display:block;padding:12px 16px;width:100%}.hyperlink{color:#2996cc!important;cursor:pointer;font-size:14px;font-weight:500;line-height:1.715;text-decoration:none}.price{width:100%}.price .currency{display:inline-block;margin-bottom:6px;margin-left:5px;width:25%}.price .pinput{display:inline-block;width:50%}.table--flex .table-row,.table--flex tr{display:flex;line-height:1.715}.table-row,tr{border-bottom:1px solid #d5d9dc}.table--flex .table-cell,.table--flex .table-cell-header,.table--flex td,.table--flex th{align-items:center;display:flex;flex:1 1 100%}.table-cell-header:first-child,.table-cell:first-child,td:first-child,th:first-child{padding-left:16px}.editable-variation-table__header__cell{overflow:visible}.table-cell-header,th{border-top:1px solid #d5d9dc;color:#343b42;font-weight:500}.table-cell,.table-cell-header,td,th{height:48px;overflow:hidden;padding-left:8px;padding-right:8px;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap}.table-header,thead{background-color:#ebedef;text-align:left}.table--editable{border-left:1px solid #d5d9dc;border-right:1px solid #d5d9dc}.editable-variation-list__more-options-cell{align-items:center;display:flex;height:100%;justify-content:center;position:absolute;right:-40px;top:0;width:40px}.editable-variation-list__more-options-cell .dropdown{position:relative}.dropdown__trigger{cursor:pointer;outline:0}.more-actions-menu__trigger{align-items:center;display:flex;height:100%;justify-content:center;width:100%}svg:not(:root){overflow:hidden}.caret-down:after,.caret-left:after,.caret-right:after,.caret-up:after,.svg-icon{display:inline-block}"]
                },] }
    ];
    AddCartItemDialogComponent.ctorParameters = function () { return [
        { type: dialog.MatDialogRef },
        { type: forms.FormBuilder },
        { type: flipperComponents.NotificationService },
        { type: flipperComponents.SettingsService },
        { type: Array, decorators: [{ type: i0.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
    ]; };
    AddCartItemDialogComponent.propDecorators = {
        onKeydownHandler: [{ type: i0.HostListener, args: ['document:keydown', ['$event'],] }]
    };

    var FlipperBasicPosComponent = /** @class */ (function () {
        function FlipperBasicPosComponent(dialog, totalPipe) {
            this.dialog = dialog;
            this.totalPipe = totalPipe;
            this.updateQtyEmit = new i0.EventEmitter();
            this.searchEmitValue = new i0.EventEmitter();
            this.addToCartEmit = new i0.EventEmitter();
            this.saveOrderUpdatedEmit = new i0.EventEmitter();
            this.updateOrderDetailsEmit = new i0.EventEmitter();
            this.didCollectCashEmit = new i0.EventEmitter();
            this.action = '';
            this.orderItems$ = new rxjs.BehaviorSubject([]);
            this.canfoundVariant = [];
            this.isCurrentOrder = null;
            this.userClosedModel = false;
            this.setTaxes = [];
            this.currency = 'RWF';
            this.setCartFocused = null;
            this.didCollectCashCompleted = { isCompleted: false, collectedOrder: null };
        }
        Object.defineProperty(FlipperBasicPosComponent.prototype, "foundVariant", {
            get: function () {
                return this.canfoundVariant;
            },
            set: function (value) {
                this.canfoundVariant = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FlipperBasicPosComponent.prototype, "taxes", {
            get: function () {
                return this.setTaxes;
            },
            //taxes
            set: function (value) {
                this.setTaxes = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FlipperBasicPosComponent.prototype, "currentOrder", {
            get: function () {
                return this.isCurrentOrder;
            },
            set: function (order) {
                this.isCurrentOrder = order;
                this.cartFocused = order && order.orderItems.length > 0 ? order.orderItems[0] : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FlipperBasicPosComponent.prototype, "cartFocused", {
            get: function () {
                return this.setCartFocused;
            },
            set: function (cart) {
                this.setCartFocused = cart;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FlipperBasicPosComponent.prototype, "userDidCloseModel", {
            get: function () {
                return this.userClosedModel;
            },
            // didCloseModel
            set: function (m) {
                this.userClosedModel = m;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FlipperBasicPosComponent.prototype, "collectCashCompleted", {
            get: function () {
                return this.didCollectCashCompleted;
            },
            // collectCashCompleted
            set: function (inputed) {
                this.didCollectCashCompleted = inputed;
            },
            enumerable: false,
            configurable: true
        });
        FlipperBasicPosComponent.prototype.onKeydownHandler = function (event) {
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
        };
        FlipperBasicPosComponent.prototype.keyBoardShortCuts = function () {
            this.dialog.keyBoardShortCuts();
        };
        FlipperBasicPosComponent.prototype.searchPosProduct = function (event) {
            if (event) {
                this.searchEmitValue.emit(event);
            }
        };
        FlipperBasicPosComponent.prototype.addToCart = function (item, updateProduct) {
            var _this = this;
            if (updateProduct === void 0) { updateProduct = false; }
            if (updateProduct) {
                return this.dialog.open(UpdatePriceDialogComponent, flipperDialog.DialogSize.SIZE_SM, item.price).subscribe(function (result) {
                    if (result !== 'close') {
                        if (result.price && result.price > 0) {
                            _this.addToCartEmit.emit(result);
                        }
                    }
                });
            }
            else {
                this.addToCartEmit.emit(item);
            }
        };
        FlipperBasicPosComponent.prototype.updatePrice = function (item) {
            var _this = this;
            return this.dialog.open(UpdatePriceDialogComponent, flipperDialog.DialogSize.SIZE_SM, item.price).subscribe(function (result) {
                if (result !== 'close') {
                    if (result.price && result.price > 0) {
                        item.price = result.price;
                        item.subTotal = item.quantity * item.price;
                        _this.updateQty(item);
                    }
                }
            });
        };
        FlipperBasicPosComponent.prototype.addCartItem = function () {
            var _this = this;
            return this.dialog.open(AddCartItemDialogComponent, flipperDialog.DialogSize.SIZE_MD, this.taxes).subscribe(function (result) {
                if (result !== 'close' || result.price > 0 || result.quantity > 0) {
                    _this.addToCart(result);
                }
            });
        };
        FlipperBasicPosComponent.prototype.updateQty = function (item) {
            this.updateOrderDetailsEmit.emit({ action: 'UPDATE', item: item });
        };
        FlipperBasicPosComponent.prototype.removeItem = function (item) {
            this.updateOrderDetailsEmit.emit({ action: 'DELETE', item: item });
        };
        FlipperBasicPosComponent.prototype.saveOrderUpdated = function (event) {
            var order = event ? event : this.currentOrder;
            this.saveOrderUpdatedEmit.emit(order);
        };
        FlipperBasicPosComponent.prototype.updateQuantity = function (item, action) {
            if (action === void 0) { action = null; }
            var lastQty = item.quantity;
            this.action = action;
            this.canSetCartFocused(item);
            if (this.action === '-') {
                item.quantity = item.quantity - 1;
                if (item.quantity <= 0) {
                    this.dialog
                        .message('Failure Message', 'Negative quantity is not allowed.', 'Failure', 'SIZE_SM')
                        .subscribe(function () {
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
        };
        FlipperBasicPosComponent.prototype.canSetCartFocused = function (item) {
            this.cartFocused = item;
        };
        FlipperBasicPosComponent.prototype.collectCash = function (event) {
            this.didCollectCashEmit.emit(event);
        };
        FlipperBasicPosComponent.prototype.closeModel = function (event) {
            this.userDidCloseModel = event;
        };
        return FlipperBasicPosComponent;
    }());
    FlipperBasicPosComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-basic-pos',
                    template: "<div class=\"row\">\r\n\r\n  <div class=\"column-lg\">\r\n    <div class=\"search-card\">\r\n      <table>\r\n        <tr>\r\n          <td style=\"width:90%\">\r\n            <flipper-search-box [foundVariant]=\"foundVariant\" [currency]=\"currency\" (addToCartEmit)=\"addToCart($event)\"\r\n              (searchEmitValue)=\"searchPosProduct($event)\" [didUserCloseModel]=\"userDidCloseModel\">\r\n            </flipper-search-box>\r\n          </td>\r\n          <td style=\"width:10%\">\r\n            <button (click)=\"addCartItem()\" class=\"button-default button--secondary ml-3\">\r\n              <img [src]=\"'./assets/icons/plus.svg'\" alt=\"search\" class=\"icon-img\" style=\"position: relative;top: 5.5px;\">\r\n            </button>\r\n          </td>\r\n\r\n        </tr>\r\n      </table>\r\n      <button (click)=\"keyBoardShortCuts()\" class=\"kbd-hotkeys-button\"><svg class=\"svg-icon svg-icon-keyboard\"\r\n          viewBox=\"0 0 32 32\">\r\n          <path\r\n            d=\"M24.133 8C25.72 8 27 9.344 27 11v10c0 1.652-1.29 3-2.867 3H6.867C5.28 24 4 22.656 4 21V11c0-1.65 1.29-3 2.867-3h17.266zm-.075 2H6.942c-.51 0-.942.448-.942 1v10c0 .555.422 1 .942 1h17.116c.51 0 .942-.448.942-1V11c0-.555-.422-1-.942-1zM8.801 18c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2H7.2c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm15 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm-2.992 0c.106 0 .191.086.191.2v1.6c0 .11-.095.2-.19.2H10.19a.193.193 0 0 1-.19-.2v-1.6c0-.11.095-.2.19-.2h10.62zM9.801 15c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2H8.2c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm2-3c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm-3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm-3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm-3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm-6 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2H7.2c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6zm3 0c.11 0 .199.086.199.2v1.6c0 .11-.086.2-.2.2h-1.6c-.11 0-.2-.086-.2-.2v-1.6c0-.11.086-.2.2-.2h1.6z\">\r\n          </path>\r\n        </svg>\r\n      </button>\r\n    </div>\r\n\r\n\r\n\r\n    <div class=\"shoppinglist\" *ngIf=\"currentOrder && currentOrder.orderItems && currentOrder.orderItems.length > 0\">\r\n\r\n\r\n      <div class=\"item-lists\">\r\n\r\n        <mat-list *ngIf=\"currentOrder.orderItems.length > 0\">\r\n          <div mat-subheader>Items({{currentOrder.orderItems.length}})</div>\r\n\r\n          <!-- {{currentOrder.orderItems|json}} -->\r\n          <flipper-autocomplete *ngFor=\"let item of  currentOrder.orderItems; let i = index;\">\r\n            <mat-divider></mat-divider>\r\n            <mat-list-item (click)=\"canSetCartFocused(item)\" [class.setCartFocused]=\"cartFocused==item\">\r\n              <!-- <img [src]=\"'./assets/icons/archive-3.svg'\" style=\"width:48px\"> -->\r\n              <div mat-line>\r\n                <span>\r\n                  {{item.variantName=='Regular'?item.productName:item.variantName}} |  SKU:{{item.sku}}\r\n                </span>\r\n\r\n              </div>\r\n              <div mat-line>\r\n                <span *ngIf=\"item.canTrackingStock\">In stock({{item.currentStock}}) of </span>\r\n                &nbsp;\r\n                |&nbsp;\r\n                <a class=\"link\" (click)=\"updatePrice(item)\">\r\n                  {{currency}} {{item.price}}</a><span *ngIf=\"item.unit\">{{item.unit?'/'+item.unit:''}}</span>\r\n                  &nbsp;\r\n                |&nbsp;\r\n                <span class=\"details\" *ngIf=\"item.productName; else noProduct\">{{item.productName}}</span>\r\n                <ng-template #noProduct>\r\n                  <span class=\"details\">\r\n                    {{item.productName}}\r\n                  </span>\r\n                  </ng-template>\r\n\r\n                  &nbsp;\r\n                |&nbsp;\r\n                Quantity({{item.quantity}}<span *ngIf=\"item.unit\">{{item.unit?'/'+item.unit:''}}</span>)\r\n\r\n              </div>\r\n              <div style=\"float: right;position: relative;right: 0;margin-top:-5px\">\r\n                <table>\r\n                  <tr>\r\n                    <td>\r\n                      <button type=\"button\" class=\"update-qty\">\r\n                        <table>\r\n                          <tr>\r\n                            <td>\r\n                              <img [src]=\"'./assets/icons/minus.svg'\" alt=\"minus\" (click)=\"updateQuantity(item,'-')\">\r\n                            </td>\r\n                            <td>{{item.quantity}}</td>\r\n                            <td>\r\n                              <img [src]=\"'./assets/icons/plus.svg'\" alt=\"plus\" (click)=\"updateQuantity(item,'+')\">\r\n                            </td>\r\n                          </tr>\r\n                        </table>\r\n                      </button>\r\n                    </td>\r\n                    <td>\r\n                      <button class=\"remove-item\" type=\"button\">\r\n                        <img [src]=\"'./assets/icons/x.svg'\" alt=\"delete\" class=\"delete-icon\" (click)=\"removeItem(item)\">\r\n                      </button>\r\n                    </td>\r\n\r\n                  </tr>\r\n                </table>\r\n              </div>\r\n            </mat-list-item>\r\n\r\n\r\n          </flipper-autocomplete>\r\n          <mat-divider *ngIf=\"currentOrder.orderItems.length > 0\"></mat-divider>\r\n        </mat-list>\r\n\r\n        <!-- <flipper-autocomplete *ngFor=\"let item of  currentOrder.orderItems; let i = index;\">\r\n          <mat-option (click)=\"canSetCartFocused(item)\" [class.setCartFocused]=\"cartFocused==item\">\r\n\r\n\r\n\r\n            <div class=\"icon-2\">\r\n              <img [src]=\"'./assets/icons/archive-3.svg'\" class=\"icon-img\">\r\n            </div>\r\n            <div class=\"item\">\r\n              <span class=\"item-title\">\r\n                <span\r\n                  *ngIf=\"item.variant; else noVariant\">{{item.variant.name=='Regular'?item.product.name:item.variant.name}}\r\n                </span>\r\n                <ng-template #noVariant>\r\n                  <span>\r\n                    {{item.variantName}}\r\n                  </span>\r\n                </ng-template>\r\n              </span>\r\n              <div class=\"item-sub-title\">\r\n                <span class=\"details\">\r\n                  <span *ngIf=\"item.stock && item.stock.canTrackingStock\">In stock({{item.stock.currentStock}}) of\r\n                  </span>\r\n\r\n                  <span>\r\n                    <a class=\"link\" (click)=\"updatePrice(item)\">\r\n                      {{currency}} {{item.price}}</a><span *ngIf=\"item.unit\">{{item.unit?'/'+item.unit:''}}</span>\r\n                  </span>\r\n                </span>\r\n                <span class=\"details\" *ngIf=\"item.product; else noProduct\">{{item.product.name}}</span>\r\n                <ng-template #noProduct>\r\n                  <span class=\"details\">\r\n                    {{item.productName}}\r\n                  </span>\r\n                </ng-template>\r\n                <span class=\"details\">\r\n                  <div class=\"oval\"></div> &nbsp;&nbsp; Quantity({{item.quantity}}<span\r\n                    *ngIf=\"item.unit\">{{item.unit?'/'+item.unit:''}}</span>)\r\n                </span>\r\n              </div>\r\n\r\n\r\n            </div>\r\n            <div class=\"remove-item\">\r\n\r\n              <img [src]=\"'./assets/icons/x.svg'\" class=\"delete-icon\" (click)=\"removeItem(item)\">\r\n\r\n            </div>\r\n            <button type=\"button\" class=\"update-qty\">\r\n              <table>\r\n                <tr>\r\n                  <td>\r\n                    <img [src]=\"'./assets/icons/minus.svg'\" (click)=\"updateQuantity(item,'-')\">\r\n                  </td>\r\n                  <td>{{item.quantity}}</td>\r\n                  <td>\r\n                    <img [src]=\"'./assets/icons/plus.svg'\" (click)=\"updateQuantity(item,'+')\">\r\n                  </td>\r\n                </tr>\r\n              </table>\r\n            </button>\r\n\r\n          </mat-option>\r\n\r\n        </flipper-autocomplete> -->\r\n      </div>\r\n    </div>\r\n\r\n    <flipper-message (click)=\"addCartItem()\" *ngIf=\"currentOrder && currentOrder.orderItems.length===0\"\r\n      title=\"Search Product!\"\r\n      message=\"No Cart Item(s), Please search an item from inventory or click to + button to start shopping!\">\r\n    </flipper-message>\r\n\r\n    <flipper-message *ngIf=\"!currentOrder\" title=\"No Order!\" message=\"No current order created!\">\r\n    </flipper-message>\r\n  </div>\r\n  <div class=\"column-sm\">\r\n    <span *ngIf=\"currentOrder\" style=\"position: relative;left: 15px;top: 5px;\"><b>Order Number #\r\n        {{currentOrder.orderNumber}}</b></span><br />\r\n    <flipper-calculator [currentOrder]=\"currentOrder\" [currency]=\"currency\"\r\n      [collectCashCompleted]=\"collectCashCompleted\" (collectCashEmit)=\"collectCash($event)\"\r\n      (saveOrderUpdatedEmit)=saveOrderUpdated($event) (closeModelEmit)=\"closeModel($event)\">\r\n    </flipper-calculator>\r\n\r\n  </div>\r\n</div>\r\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [flipperComponents.CalculateTotalClassPipe, flipperComponents.MergeArryByIdPipe, flipperComponents.ArrayRemoveItemPipe],
                    styles: [".mat-divider{border-top-color:#3f5ec6!important;border-top-style:dotted;border-top-width:2px;color:#3f5ec6!important;display:block;margin:0}.remove-item{border:1px solid #3f5ec6;border-radius:2px;float:right;height:50px;margin-left:8px;position:relative;right:0;width:50.3px}.remove-item .delete-icon{color:#1b2125;font-family:Roboto;font-size:22px;font-stretch:normal;font-style:normal;font-weight:500;height:40px;letter-spacing:normal;line-height:normal;position:relative;text-align:center;width:16px}.update-qty{border:1px solid #3f5ec6;border-radius:2px;float:right;height:50px;margin-left:8px;position:relative;right:0;width:123.3px}.update-qty table{width:100%}.update-qty table tr td{color:#1b2125;font-family:Roboto;font-size:22px;font-stretch:normal;font-style:normal;font-weight:500;height:40px;letter-spacing:normal;line-height:normal;position:relative;text-align:center;width:16px}.oval{background-color:#53be6d;border-radius:50px;bottom:0;height:8px;left:0;position:absolute;right:0;top:5px;width:8px}.details{color:#202124;display:inline-block;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:19px;letter-spacing:-.05px;line-height:normal;position:relative;width:auto}.row:after{clear:both;content:\"\";display:table}.row{display:flex;flex-wrap:wrap;list-style:none;margin:0}.row .row:after{clear:both;content:\"\";display:table}.row .column-sm{border-radius:.25rem;box-shadow:0 20px 40px -14px rgba(0,0,0,.25);float:right;padding:10px;width:35%}.row .column-sm flipper-calculator{display:flex;height:96vh;padding:.8rem}.row .column-lg{border-radius:.25rem;box-shadow:0 5px 4px -4px rgba(0,0,0,.25);display:flex;flex-direction:column;float:left;height:100vh;overflow:hidden;padding:10px;width:65%}.row .column-lg .search-card{display:flex}.row .column-lg .search-card flipper-search-box{display:flex;width:100%}.row .column-lg .search-card .kbd-hotkeys-button{background-color:#d6e8fa;border:1px solid #d6e8fa;border-radius:2px;bottom:0;color:#1b2733;font-stretch:normal;font-style:normal;font-weight:500;height:40px;left:0;letter-spacing:1.25px;line-height:1.14;opacity:.95;padding:4px;position:relative;text-align:center;top:9px;width:70px}.row .column-lg .search-card .kbd-hotkeys-button .svg-icon-keyboard{bottom:12px;position:relative}.row .column-lg flipper-message{display:flex;flex-direction:column;overflow:hidden;position:relative;top:50px;width:100%}.row .column-lg .shoppinglist{display:flex;height:100vh;position:relative;top:35px;width:94%}.row .column-lg .shoppinglist .item-lists{height:78vh;overflow:auto;width:100%}.row .column-lg .shoppinglist .item-lists flipper-autocomplete{position:relative;width:100%}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .setCartFocused{border-left-color:#3f5ec6!important;border-left-style:dotted;border-left-width:2px;border-right-color:#3f5ec6!important;border-right-style:dotted;border-right-width:2px;box-shadow:0 1px 1px 1px #3f5ec6;color:#3f5ec6!important}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option{background-color:#fff;border-top:4px solid #fcfeff;height:83px}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .item{display:inline-table;position:relative}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .item .item-sub-title{display:block;position:relative}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .item .item-sub-title .details{bottom:12px;color:#202124;display:inline-block;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:19px;letter-spacing:-.05px;line-height:normal;margin-right:18px;position:relative;width:auto}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .item .item-sub-title .details .oval{background-color:#53be6d;border-radius:50px;bottom:0;height:8px;left:0;position:absolute;right:0;top:5px;width:8px}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .item .item-title{color:#2575ec;font-family:Roboto;font-size:20px;font-stretch:normal;font-style:normal;font-weight:400;height:26px;letter-spacing:-.07px;line-height:normal;position:relative;top:10px;width:240px}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .icon-2{background-color:#fff;border:1px solid #d6daff;border-radius:4px;display:inline-block;height:53px;left:11px;position:relative;top:22px;width:53px}.row .column-lg .shoppinglist .item-lists flipper-autocomplete .mat-option .icon-2 .icon-img{height:36px;left:4px;position:relative;top:7px;width:47px}.link{color:#2996cc!important;cursor:pointer;text-decoration:none}"]
                },] }
    ];
    FlipperBasicPosComponent.ctorParameters = function () { return [
        { type: flipperDialog.DialogService },
        { type: flipperComponents.CalculateTotalClassPipe }
    ]; };
    FlipperBasicPosComponent.propDecorators = {
        updateQtyEmit: [{ type: i0.Output }],
        searchEmitValue: [{ type: i0.Output }],
        addToCartEmit: [{ type: i0.Output }],
        saveOrderUpdatedEmit: [{ type: i0.Output }],
        updateOrderDetailsEmit: [{ type: i0.Output }],
        didCollectCashEmit: [{ type: i0.Output }],
        currency: [{ type: i0.Input }],
        foundVariant: [{ type: i0.Input, args: ['foundVariant',] }],
        taxes: [{ type: i0.Input, args: ['taxes',] }],
        currentOrder: [{ type: i0.Input, args: ['currentOrder',] }],
        collectCashCompleted: [{ type: i0.Input, args: ['collectCashCompleted',] }],
        onKeydownHandler: [{ type: i0.HostListener, args: ['document:keydown', ['$event'],] }]
    };

    var SearchBoxComponent = /** @class */ (function () {
        function SearchBoxComponent(cd) {
            this.cd = cd;
            this.userClosedModel = false;
            this.searchEmitValue = new i0.EventEmitter();
            this.addToCartEmit = new i0.EventEmitter();
            this.debounce = 1000;
            this.loading = false;
            this.isSearching = false;
            this.canfoundVariant = [];
            this.currency = 'RWF';
            this.timer = null;
        }
        Object.defineProperty(SearchBoxComponent.prototype, "foundVariant", {
            get: function () {
                return this.canfoundVariant;
            },
            set: function (value) {
                this.canfoundVariant = value;
                this.loading = false;
                this.addToCartOnGotSingleItem(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SearchBoxComponent.prototype, "didUserCloseModel", {
            get: function () {
                return this.userClosedModel;
            },
            set: function (bol) {
                this.userClosedModel = bol;
                if (bol === true) {
                    this.clearSearchBox();
                }
            },
            enumerable: false,
            configurable: true
        });
        SearchBoxComponent.prototype.onKeydownHandler = function (event) {
            var _this = this;
            this.event = event;
            if ((this.event.shiftKey && this.event.key === 'F') || (this.event.shiftKey && this.event.key === 'S')) {
                setTimeout(function () {
                    _this.clearSearchBox();
                }, 2);
            }
            if (this.event.key === 'Shift') {
                setTimeout(function () {
                    _this.searchInputElement.nativeElement.blur();
                    _this.close();
                }, 2);
            }
        };
        SearchBoxComponent.prototype.close = function () {
            this.autoComplete.closePanel();
        };
        SearchBoxComponent.prototype.startSearching = function (event) {
            var _this = this;
            if (event.target.value === '' || event.target.value === null) {
                this.foundVariant = [];
                this.clearSearchBox();
                return;
            }
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                _this.foundVariant = [];
                _this.searching(event.target.value);
            }, 1000);
        };
        SearchBoxComponent.prototype.searching = function (query) {
            this.loading = true;
            this.isSearching = true;
            this.searchEmitValue.emit(query);
        };
        SearchBoxComponent.prototype.ngOnInit = function () {
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
        };
        SearchBoxComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () {
                _this.searchInputElement.nativeElement.focus();
            });
            this.cd.detectChanges();
        };
        SearchBoxComponent.prototype.addToCartOnGotSingleItem = function (variants) {
            if (variants.length === 1) {
                this.addToCart(variants[0]);
                this.clearSearchBox();
            }
        };
        SearchBoxComponent.prototype.addToCart = function (variant) {
            variant.quantity = 1;
            this.addToCartEmit.emit(variant);
            this.clearSearchBox();
        };
        SearchBoxComponent.prototype.focusing = function () {
            this.clearSearchBox();
        };
        SearchBoxComponent.prototype.clearSearchBox = function () {
            if (this.searchInputElement !== undefined) {
                this.searchInputElement.nativeElement.value = '';
                this.searchInputElement.nativeElement.focus();
                this.isSearching = false;
                this.close();
            }
        };
        return SearchBoxComponent;
    }());
    SearchBoxComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-search-box',
                    template: "<div class=\"icon-card\"><svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" stroke=\"#607d8b\" stroke-width=\"2\" fill=\"none\"\r\n    stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"search-icon\">\r\n    <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n    <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>\r\n  </svg>\r\n</div>\r\n\r\n<input type=\"search\" \r\n(focus)=\"focusing()\" #autoCompleteInput [matAutocomplete]=\"auto\"\r\n(keydown)=\"startSearching($event)\"\r\naria-label=\"Search\" #mySearchInput placeholder=\"Search product code to retreive\" class=\"search-box\">\r\n\r\n<mat-autocomplete #auto=\"matAutocomplete\" class=\"autocomplete\">\r\n\r\n      <flipper-autocomplete [loading]=\"false\" *ngIf=\"isSearching || foundVariant.length > 0\">\r\n        <div *ngFor=\"let variant of foundVariant; let i = index;\">\r\n          <mat-option (click)=\"addToCart(variant)\">\r\n              <div class=\"icon-1\">\r\n                <img [src]=\"'./assets/icons/search.svg'\" class=\"icon-img\">\r\n              </div>\r\n\r\n              <div class=\"item\">\r\n                  <span class=\"item-title\">\r\n                    {{variant.sku}} / {{variant.name}}\r\n                  </span>\r\n                  \r\n                  <div class=\"item-sub-title\">\r\n\r\n                      <span class=\"details\">\r\n                        {{currency}} {{variant.retailPrice}}\r\n                        {{variant.unit?'/ '+variant.unit:''}}\r\n                      </span>\r\n\r\n                      <span class=\"details\">\r\n                        {{variant.productName}}\r\n                      </span>\r\n\r\n                      <span class=\"details\" *ngIf=\"variant && variant.canTrackingStock\">\r\n                            <div class=\"oval\"> </div> &nbsp;&nbsp; In stock({{variant.currentStock}})\r\n                      </span>\r\n\r\n                  </div>\r\n              </div>\r\n\r\n          </mat-option>\r\n        </div>\r\n      </flipper-autocomplete>\r\n\r\n      <flipper-autocomplete [loading]=\"false\" *ngIf=\"foundVariant.length == 0\">\r\n        <mat-option>\r\n              <div class=\"item\">\r\n                    <span class=\"item-title\">\r\n                      Sorry! There is no item(s) found.\r\n                    </span>\r\n              </div>\r\n        </mat-option>\r\n      </flipper-autocomplete>\r\n\r\n</mat-autocomplete>\r\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".icon-card{align-items:center;display:flex;left:25px;position:absolute;top:25px}.search-icon{color:#959da5;vertical-align:text-bottom}.search-box{-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:#fff;border:0;border-radius:6px;box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);color:#515151;font-family:inherit;font-family:Roboto;font-size:inherit;font-size:22px;font-stretch:normal;font-style:normal;letter-spacing:normal;line-height:1;line-height:normal;margin:0;outline:0;padding:16px 16px 16px 52px;width:100%}.autocomplete.mat-autocomplete-panel{background-color:#fcfeff;border:1px solid #e2e9ed;position:relative}.autocomplete.mat-autocomplete-panel flipper-autocomplete{width:100%}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option{background-color:#fff;border-top:4px solid #fcfeff;height:83px}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .add-button{background-color:#1174b6;border:1px solid #1174b6;border-radius:2px;color:#fff;float:right;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:45px;letter-spacing:1.25px;line-height:1.14;position:relative;right:0;text-align:center;top:34.7px;width:99px}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .item{bottom:3px;display:inline-table;left:30px;position:relative}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .item .item-sub-title{display:block;position:relative}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .item .item-sub-title .details{bottom:12px;color:#202124;display:inline-block;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:19px;letter-spacing:-.05px;line-height:normal;margin-right:18px;position:relative;width:auto}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .item .item-sub-title .details .oval{background-color:#53be6d;border-radius:50px;bottom:0;height:8px;left:0;position:absolute;right:0;top:5px;width:8px}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .item .item-title{color:#2575ec;font-family:Roboto;font-size:20px;font-stretch:normal;font-style:normal;font-weight:400;height:26px;letter-spacing:-.07px;line-height:normal;width:240px}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .icon-1{background-color:#fff;border:1px solid #d6daff;border-radius:4px;display:inline-block;height:53px;left:11px;position:relative;top:22px;width:53px}.autocomplete.mat-autocomplete-panel flipper-autocomplete .mat-option .icon-1 .icon-img{height:36px;left:4px;position:relative;top:7px;width:47px}"]
                },] }
    ];
    SearchBoxComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };
    SearchBoxComponent.propDecorators = {
        foundVariant: [{ type: i0.Input, args: ['foundVariant',] }],
        didUserCloseModel: [{ type: i0.Input, args: ['didUserCloseModel',] }],
        searchEmitValue: [{ type: i0.Output }],
        addToCartEmit: [{ type: i0.Output }],
        searchInputElement: [{ type: i0.ViewChild, args: ['mySearchInput', {
                        static: false,
                    },] }],
        autoComplete: [{ type: i0.ViewChild, args: ['autoCompleteInput', { read: autocomplete.MatAutocompleteTrigger, static: false },] }],
        currency: [{ type: i0.Input }],
        onKeydownHandler: [{ type: i0.HostListener, args: ['document:keydown', ['$event'],] }]
    };

    var AutocompleteComponent = /** @class */ (function () {
        function AutocompleteComponent() {
        }
        Object.defineProperty(AutocompleteComponent.prototype, "loading", {
            get: function () {
                return this.load;
            },
            set: function (value) {
                this.load = value;
            },
            enumerable: false,
            configurable: true
        });
        return AutocompleteComponent;
    }());
    AutocompleteComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-autocomplete',
                    template: "<ng-container *ngIf=\"!loading\"><ng-content></ng-content></ng-container>\r\n<div *ngIf=\"loading\" class=\"loading-spinner\">\r\n   <flipper-loading-icon [loading]=\"loading\">\r\n      <span>Loading data!</span>\r\n    </flipper-loading-icon>\r\n</div>\r\n",
                    styles: [".loading-spinner{bottom:0;left:0;padding:8px;position:relative;right:0;text-align:center;top:0}"]
                },] }
    ];
    AutocompleteComponent.propDecorators = {
        loading: [{ type: i0.Input, args: ['loading',] }]
    };

    var ShoppingListsComponent = /** @class */ (function () {
        function ShoppingListsComponent() {
        }
        return ShoppingListsComponent;
    }());
    ShoppingListsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-shopping-lists',
                    template: "<ng-content></ng-content>",
                    styles: [""]
                },] }
    ];

    var BasicShoppingListComponent = /** @class */ (function () {
        function BasicShoppingListComponent() {
            this.loading = false;
            this.action = '';
            this.getOrderItems = [];
            this.updateQtyEmit = new i0.EventEmitter();
            this.removeItemEmit = new i0.EventEmitter();
        }
        Object.defineProperty(BasicShoppingListComponent.prototype, "orderItems", {
            get: function () {
                return this.getOrderItems;
            },
            set: function (value) {
                this.getOrderItems = value;
            },
            enumerable: false,
            configurable: true
        });
        BasicShoppingListComponent.prototype.updateQuantity = function (item, action) {
            if (action === void 0) { action = null; }
            var lastQty = item.quantity;
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
        };
        BasicShoppingListComponent.prototype.removeItem = function (item) {
            this.removeItemEmit.emit(item);
        };
        BasicShoppingListComponent.prototype.ngOnChanges = function (changes) {
            console.log(changes);
        };
        return BasicShoppingListComponent;
    }());
    BasicShoppingListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-basic-shopping-list',
                    template: "<div class=\"shoppinglist\">\r\n\r\n  <div class=\"divider\">\r\n    <div class=\"title\">Selected Items</div>\r\n    <div class=\"line\"></div>\r\n  </div>\r\n\r\n  <flipper-autocomplete *ngFor=\"let item of orderItems; let i = index;\">\r\n    <mat-option>\r\n      <div class=\"icon\">\r\n        <img [src]=\"'./assets/icons/search.svg'\" alt=\"search\" class=\"icon-img\">\r\n      </div>\r\n      <div class=\"item\">\r\n        <span class=\"item-title\">\r\n          {{item.orderId}} / {{item.variantName}}\r\n        </span>\r\n        <div class=\"item-sub-title\">\r\n          <span class=\"details\">RWF {{item.price}}</span>\r\n          <span class=\"details\">Lotion</span>\r\n          <span class=\"details\">\r\n            <div class=\"oval\"></div> &nbsp;&nbsp; In stock({{item.quantity}})\r\n          </span>\r\n        </div>\r\n\r\n      </div>\r\n      <div class=\"remove-item\">\r\n\r\n        <img [src]=\"'./assets/icons/x.svg'\" alt=\"search\" class=\"delete-icon\" (click)=\"removeItem(item)\">\r\n\r\n      </div>\r\n      <div class=\"update-qty\">\r\n        <table>\r\n          <tr>\r\n            <td>\r\n              <img [src]=\"'./assets/icons/minus.svg'\" alt=\"search\" (click)=\"updateQuantity(item,'-')\">\r\n            </td>\r\n            <td>{{item.quantity}}</td>\r\n            <td>\r\n              <img [src]=\"'./assets/icons/plus.svg'\" alt=\"search\" (click)=\"updateQuantity(item,'+')\">\r\n            </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n\r\n    </mat-option>\r\n\r\n  </flipper-autocomplete>\r\n</div>\r\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".shoppinglist{height:90vh;position:relative;top:25px}.shoppinglist .divider .title{color:#3a3b3f;display:inline-block;font-family:Roboto;font-size:16px;font-stretch:normal;font-style:normal;font-weight:500;height:20px;letter-spacing:-.06px;line-height:1.25;width:107px}.shoppinglist .divider .line{background-color:#f9fafb;display:inline-table}.shoppinglist flipper-autocomplete{position:relative;top:25px;width:100%}.shoppinglist flipper-autocomplete .mat-option{background-color:#fff;border-top:4px solid #fcfeff;height:83px}.shoppinglist flipper-autocomplete .mat-option .remove-item{border:1px solid #3f5ec6;border-radius:2px;float:right;height:50px;margin-left:8px;position:relative;right:0;top:34.7px;width:50.3px}.shoppinglist flipper-autocomplete .mat-option .remove-item .delete-icon{color:#1b2125;font-family:Roboto;font-size:22px;font-stretch:normal;font-style:normal;font-weight:500;height:40px;left:15px;letter-spacing:normal;line-height:normal;position:relative;text-align:center;top:4px;width:16px}.shoppinglist flipper-autocomplete .mat-option .update-qty{border:1px solid #3f5ec6;border-radius:2px;float:right;height:50px;margin-left:8px;position:relative;right:0;top:34.7px;width:123.3px}.shoppinglist flipper-autocomplete .mat-option .update-qty table{width:100%}.shoppinglist flipper-autocomplete .mat-option .update-qty table tr td{color:#1b2125;font-family:Roboto;font-size:22px;font-stretch:normal;font-style:normal;font-weight:500;height:40px;letter-spacing:normal;line-height:normal;position:relative;text-align:center;top:4px;width:16px}.shoppinglist flipper-autocomplete .mat-option .item{bottom:3px;display:inline-table;left:30px;position:relative}.shoppinglist flipper-autocomplete .mat-option .item .item-sub-title{display:block;position:relative}.shoppinglist flipper-autocomplete .mat-option .item .item-sub-title .details{bottom:12px;color:#202124;display:inline-block;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:19px;letter-spacing:-.05px;line-height:normal;margin-right:18px;position:relative;width:auto}.shoppinglist flipper-autocomplete .mat-option .item .item-sub-title .details .oval{background-color:#53be6d;border-radius:50px;bottom:0;height:8px;left:0;position:absolute;right:0;top:5px;width:8px}.shoppinglist flipper-autocomplete .mat-option .item .item-title{color:#2575ec;font-family:Roboto;font-size:20px;font-stretch:normal;font-style:normal;font-weight:400;height:26px;letter-spacing:-.07px;line-height:normal;width:240px}.shoppinglist flipper-autocomplete .mat-option .icon{background-color:#fff;border:1px solid #d6daff;border-radius:4px;display:inline-block;height:53px;left:11px;position:relative;top:32px;width:53px}.shoppinglist flipper-autocomplete .mat-option .icon .icon-img{height:36px;left:4px;position:relative;top:7px;width:47px}"]
                },] }
    ];
    BasicShoppingListComponent.propDecorators = {
        updateQtyEmit: [{ type: i0.Output }],
        removeItemEmit: [{ type: i0.Output }],
        orderItems: [{ type: i0.Input, args: ['orderItems',] }]
    };

    var StandardShoppingListComponent = /** @class */ (function () {
        function StandardShoppingListComponent() {
        }
        StandardShoppingListComponent.prototype.ngOnInit = function () { };
        return StandardShoppingListComponent;
    }());
    StandardShoppingListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-standard-shopping-list',
                    template: "<p>standard-shopping-list works!</p>\r\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    StandardShoppingListComponent.ctorParameters = function () { return []; };

    var CalculatorComponent = /** @class */ (function () {
        function CalculatorComponent(totalPipe, dialog, randPipe, findKeyPipe) {
            this.totalPipe = totalPipe;
            this.dialog = dialog;
            this.randPipe = randPipe;
            this.findKeyPipe = findKeyPipe;
            this.closeModelEmit = new i0.EventEmitter();
            this.currentNumber = '0';
            this.isNegativeNumber = false;
            this.isCurrentOrder = null;
            this.saveOrderUpdatedEmit = new i0.EventEmitter();
            this.collectCashEmit = new i0.EventEmitter();
            this.currency = 'RWF';
            this.didCollectCashCompleted = {
                isCompleted: false,
                collectedOrder: null,
            };
            this.isCalculatorNumOpen = false;
            this.calculatorNums = [];
            this.searchInputElement = null;
        }
        Object.defineProperty(CalculatorComponent.prototype, "currentOrder", {
            get: function () {
                return this.isCurrentOrder;
            },
            // collectCash
            set: function (order) {
                this.isCurrentOrder = order;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CalculatorComponent.prototype, "collectCashCompleted", {
            get: function () {
                return this.didCollectCashCompleted;
            },
            // collectCashCompleted
            set: function (inputed) {
                this.didCollectCashCompleted = inputed;
                this.getCollectCashCompleted(inputed);
            },
            enumerable: false,
            configurable: true
        });
        CalculatorComponent.prototype.getCollectCashCompleted = function (inputed) {
            var _this = this;
            if (inputed && inputed.isCompleted) {
                var changeDue = inputed.collectedOrder.customerChangeDue === 0 || inputed.collectedOrder.customerChangeDue === '0.00'
                    ? 'No'
                    : this.randPipe.transform(inputed.collectedOrder.customerChangeDue);
                var cahsReceived = this.randPipe.transform(inputed.collectedOrder.cashReceived);
                return this.dialog
                    .message('Success Message', changeDue + ' change out of ' + cahsReceived, 'Success', 'SIZE_MD')
                    .subscribe(function () {
                    _this.isCalculatorNumOpen = false;
                    _this.closeModelEmit.emit(true);
                    console.log('cash collected successfully');
                });
            }
        };
        CalculatorComponent.prototype.onKeydownHandler = function (event) {
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
                        var re = /^[0-9.]+$/;
                        var key = event.key;
                        if (key.match(re)) {
                            this.calculatorNums.push(key);
                            var nums = this.calculatorNums.join('');
                            this.getNumberOnKeyPress(nums);
                        }
                        // clean calculator by press backspace
                        if (event.key === 'Backspace') {
                            this.calculatorNums.pop();
                            var nums = this.calculatorNums.join('');
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
        };
        CalculatorComponent.prototype.clear = function () {
            if (this.currentOrder) {
                this.calculatorNums.pop();
                var nums = this.calculatorNums.join('');
                this.getNumberOnKeyPress(nums);
            }
        };
        CalculatorComponent.prototype.getDecimal = function () {
            if (!this.currentNumber.includes('.')) {
                this.currentNumber += '.';
            }
        };
        CalculatorComponent.prototype.getNumberOnKeyPress = function (v) {
            this.currentNumber = v ? v : '0';
            this.makeTotal();
        };
        CalculatorComponent.prototype.getNumber = function (v) {
            var _this = this;
            if (!this.currentOrder) {
                return this.dialog.message('Failure Message', 'No current order created!', 'Failure', 'SIZE_SM').subscribe(function () {
                    _this.isCalculatorNumOpen = false;
                    _this.closeModelEmit.emit(true);
                });
            }
            this.isCalculatorNumOpen = true;
            this.calculatorNums.push(v);
            var nums = this.calculatorNums.join('');
            this.getNumberOnKeyPress(nums);
        };
        CalculatorComponent.prototype.makeTotal = function () {
            var _this = this;
            if (this.currentOrder) {
                if (this.currentOrder.subTotal <= 0) {
                    this.isCalculatorNumOpen = false;
                    this.calculatorNums.pop();
                    return this.dialog
                        .message('Failure Message', 'No shopping list could found!', 'Failure', 'SIZE_SM')
                        .subscribe(function () {
                        _this.isCalculatorNumOpen = false;
                        _this.closeModelEmit.emit(true);
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
        };
        CalculatorComponent.prototype.onKeyFocused = function (key) {
            if (!this.currentOrder) {
                return;
            }
            return this.findKeyPipe.transform(this.calculatorNums, key);
        };
        CalculatorComponent.prototype.collectCash = function () {
            var _this = this;
            if (!this.currentOrder) {
                return this.dialog.message('Failure Message', 'No current order created!', 'Failure', 'SIZE_SM');
            }
            this.currentOrder.orderItems.forEach(function (item) {
                if (item.quantity <= 0) {
                    _this.dialog
                        .message('Failure Message', 'Negative quantity is not allowed.', 'Failure', 'SIZE_SM')
                        .subscribe(function () { });
                }
            });
            this.collectCashEmit.emit(false);
            if (this.currentOrder.subTotal <= 0) {
                return this.dialog
                    .message('Failure Message', 'Total to be paid is equal to zero.', 'Failure', 'SIZE_SM')
                    .subscribe(function () {
                    _this.isCalculatorNumOpen = false;
                    _this.closeModelEmit.emit(true);
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
        };
        return CalculatorComponent;
    }());
    CalculatorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-calculator',
                    template: "<div class=\"calculator\" [class.calculatorNumOpen]=\"isCalculatorNumOpen\">\r\n  <div class=\"keys\">\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('7')\" (click)=\"getNumber('7')\"><span class=\"value\">7</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('8')\" (click)=\"getNumber('8')\"><span class=\"value\">8</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('9')\" (click)=\"getNumber('9')\"><span class=\"value\">9</span>\r\n    </div>\r\n\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('4')\" (click)=\"getNumber('4')\"><span class=\"value\">4</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('5')\" (click)=\"getNumber('5')\"><span class=\"value\">5</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('6')\" (click)=\"getNumber('6')\"><span class=\"value\">6</span>\r\n    </div>\r\n\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('1')\" (click)=\"getNumber('1')\"><span class=\"value\">1</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('2')\" (click)=\"getNumber('2')\"><span class=\"value\">2</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('3')\" (click)=\"getNumber('3')\"><span class=\"value\">3</span>\r\n    </div>\r\n\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('.')\" (click)=\"getNumber('.')\"><span class=\"value\">.</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('0')\" (click)=\"getNumber('0')\"><span class=\"value\">0</span>\r\n    </div>\r\n    <div class=\"key\" [class.calculatorKeyOpen]=\"onKeyFocused('00')\" (click)=\"getNumber('00')\"><span\r\n        class=\"value\">00</span></div>\r\n  </div>\r\n  <div class=\"results-area\">\r\n    <div class=\"row results\" *ngIf=\"currentOrder\">\r\n      <div class=\"col-4\">\r\n        <div class=\"amounts\">\r\n          {{currency}} {{currentOrder.cashReceived | roundNumber}}\r\n        </div>\r\n      </div>\r\n      <div class=\"col-1\">\r\n        <div class=\"btn-clear\">\r\n          <button type=\"button\" class=\"clear\" (click)=\"clear()\">CLEAR</button>\r\n        </div>\r\n\r\n      </div>\r\n\r\n    </div>\r\n    <div>\r\n      <div class=\"row\" *ngIf=\"currentOrder\">\r\n        <div class=\"col\">\r\n          <table>\r\n            <tr *ngIf=\"currentOrder.subTotal\">\r\n              <td>\r\n                <span class=\"amount-title1\" style=\"font-size:11px!important\">SUB-TOTAL</span>\r\n              </td>\r\n              <td>\r\n                <span class=\"amount-number1\" style=\"font-size:11px!important\">{{currency}} {{currentOrder.subTotal | roundNumber}}</span>\r\n              </td>\r\n\r\n            </tr>\r\n            <tr *ngIf=\"currentOrder.taxAmount\">\r\n              <td>\r\n                <span class=\"amount-title1\" style=\"font-size:11px!important\">VAT</span>\r\n              </td>\r\n              <td>\r\n                <span class=\"amount-number1\" style=\"font-size:11px!important\">{{currency}} {{currentOrder.taxAmount | roundNumber}}</span>\r\n              </td>\r\n\r\n            </tr>\r\n            <tr *ngIf=\"currentOrder.saleTotal\" style=\"margin-top:1px; border-top: 2px #000 solid!important\">\r\n              <td>\r\n                <span class=\"amount-title1\">TOTAL TO BE PAID</span>\r\n              </td>\r\n              <td>\r\n                <span class=\"amount-number1\">{{currency}} {{currentOrder.saleTotal | roundNumber}}</span>\r\n              </td>\r\n\r\n            </tr>\r\n            <tr *ngIf=\"currentOrder.customerChangeDue\">\r\n              <td>\r\n                <span class=\"amount-title1\">CHANGE</span>\r\n              </td>\r\n              <td>\r\n                <span class=\"amount-number1\"\r\n                  [ngClass]=\"currentOrder && currentOrder.customerChangeDue < 0?'colorToRed':'colorToBack'\">{{currency}}\r\n                  {{currentOrder.customerChangeDue | roundNumber}}\r\n                </span>\r\n              </td>\r\n            </tr>\r\n          </table>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\" *ngIf=\"currentOrder\">\r\n        <div class=\"col\">\r\n          <button type=\"button\" *ngIf=\"currentOrder\" class=\"cash-btn\" (click)=\"collectCash()\">\r\n            <span class=\"cash-btn-Text\">Collect Cash</span>\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n",
                    providers: [flipperComponents.CalculateTotalClassPipe, flipperComponents.FindKeyPipe, flipperComponents.RoundNumberPipe],
                    styles: [".calculatorNumOpen{border:2px solid #3f5ec6!important}.calculatorKeyOpen{border:1px solid #3f5ec6!important}*{box-sizing:border-box}.row:after{clear:both;content:\"\";display:table}.row{margin:3px 3px 15px}.row .row:after{clear:both;content:\"\";display:table}.row .col{padding:5px;width:100%}.row .col-1{padding:5px;width:25%}.row .col-4{padding:5px;width:75%}.row .col-3{padding:5px;width:50%}.row .col-2{padding:5px;width:33.3%}.calculator{-webkit-touch-callout:none;-webkit-user-select:none;background-color:#fcfeff;border:1px solid #e2e9ed;border-radius:6px;overflow:auto;padding:5px;user-select:none;width:100vh}.calculator .results-area{margin:2px}.calculator .results-area .results{background-color:#f0f5fb;border:1px solid rgba(95,147,255,.06);height:82px}.calculator .results-area .results .amounts{color:#1b2125;font-family:Roboto;font-size:30px;font-stretch:normal;font-style:normal;font-weight:400;height:66px;left:8px;letter-spacing:normal;line-height:normal;position:relative;top:28%;width:100%}.calculator .results-area .results .btn-clear{position:relative;right:8px;top:20%}.calculator .results-area .results .btn-clear .clear{background-color:#ee4e5c;border:1px solid #ee4e5c;border-radius:2px;color:#fff;font-stretch:normal;font-style:normal;font-weight:500;height:45px;letter-spacing:1.25px;line-height:1.14;text-align:center;width:100%}.calculator .results-area .totalAmounts{background-color:rgba(95,147,255,.06);border:1px solid #5f93ff;height:90px}.calculator .results-area .totalAmounts .colorToRed{color:red!important}.calculator .results-area .totalAmounts .colorToBack{color:#1b2125!important}.calculator .results-area .totalAmounts .amount-title{font-size:14px;font-weight:500;height:19px;top:12px;width:117px}.calculator .results-area .totalAmounts .amount-number,.calculator .results-area .totalAmounts .amount-title{color:#1b2125;font-family:Roboto;font-stretch:normal;font-style:normal;left:13px;letter-spacing:normal;line-height:normal;position:relative}.calculator .results-area .totalAmounts .amount-number{display:block;font-size:16px;font-weight:400;height:66px;top:30px;width:123px}.calculator .results-area .cash-btn{background-color:#48b332;border:1px solid #48b332;border-radius:2px;height:45px;position:relative;width:100%}.calculator .results-area .cash-btn .cash-btn-Text{color:#fff;font-family:Roboto;font-size:14px;font-stretch:normal;font-style:normal;font-weight:500;height:16px;letter-spacing:1.25px;line-height:1.14;text-align:center;width:114px}.calculator .keys{margin:3px 3px 15px}.calculator .key{background-color:#f0f5fb;border:1px solid rgba(95,147,255,.06);cursor:pointer;display:inline-block;height:82px;overflow:hidden;vertical-align:middle;width:33.3%}.calculator .key .value{bottom:18px;color:#202124;font-family:Roboto;font-size:34px;font-stretch:normal;font-style:normal;font-weight:500;height:45px;left:44%;letter-spacing:3.04px;line-height:normal;position:relative;right:0;text-align:center;top:22px;width:23px}.amount-title1{font-size:15px;font-weight:600}.amount-number1,.amount-title1{color:#1b2125;font-family:Roboto;font-stretch:normal;font-style:normal;letter-spacing:normal;line-height:normal;position:relative}.amount-number1{display:block;font-size:20px;font-weight:700;font-weight:400}"]
                },] }
    ];
    CalculatorComponent.ctorParameters = function () { return [
        { type: flipperComponents.CalculateTotalClassPipe },
        { type: flipperDialog.DialogService },
        { type: flipperComponents.RoundNumberPipe },
        { type: flipperComponents.FindKeyPipe }
    ]; };
    CalculatorComponent.propDecorators = {
        currentOrder: [{ type: i0.Input, args: ['currentOrder',] }],
        collectCashCompleted: [{ type: i0.Input, args: ['collectCashCompleted',] }],
        closeModelEmit: [{ type: i0.Output }],
        saveOrderUpdatedEmit: [{ type: i0.Output }],
        collectCashEmit: [{ type: i0.Output }],
        currency: [{ type: i0.Input }],
        searchInputElement: [{ type: i0.ViewChild, args: ['mySearchInput', {
                        static: false,
                    },] }],
        onKeydownHandler: [{ type: i0.HostListener, args: ['document:keydown', ['$event'],] }]
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var flipperUrl = 'http://localhost:8082';

    var FlipperPosComponent = /** @class */ (function () {
        function FlipperPosComponent(database, stock, http, variant, product, totalPipe) {
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
            this.database.connect(flipperComponents.PouchConfig.bucket, localStorage.getItem('channel'));
            this.database.sync([flipperComponents.PouchConfig.syncUrl]);
        }
        Object.defineProperty(FlipperPosComponent.prototype, "theVariantFiltered", {
            get: function () {
                return this.seTheVariantFiltered;
            },
            set: function (value) {
                this.seTheVariantFiltered = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FlipperPosComponent.prototype, "currentOrder", {
            get: function () {
                return this.setCurrentOrder;
            },
            set: function (value) {
                this.setCurrentOrder = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FlipperPosComponent.prototype, "stockVariant", {
            get: function () {
                return this.setStockVariant;
            },
            set: function (value) {
                this.setStockVariant = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FlipperPosComponent.prototype, "taxes", {
            get: function () {
                return this.setTaxes;
            },
            set: function (value) {
                this.setTaxes = value;
            },
            enumerable: false,
            configurable: true
        });
        FlipperPosComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0: return [4 /*yield*/, this.getTaxes()];
                        case 1:
                            _g.sent();
                            return [4 /*yield*/, this.currentBusiness()];
                        case 2:
                            _g.sent();
                            return [4 /*yield*/, this.currentBranches()];
                        case 3:
                            _g.sent();
                            return [4 /*yield*/, this.newOrder()];
                        case 4:
                            _g.sent();
                            return [4 /*yield*/, this.hasDraftOrder()];
                        case 5:
                            _g.sent();
                            return [4 /*yield*/, this.stockVariants()];
                        case 6:
                            _g.sent();
                            _f = this.currentOrder;
                            return [4 /*yield*/, this.currentOrder];
                        case 7:
                            _f.orderItems =
                                (_g.sent()) && this.currentOrder.orderItems && this.currentOrder.orderItems.length > 0
                                    ? this.currentOrder.orderItems
                                    : [];
                            this.updateOrder([]);
                            this.currency = this.defaultBusiness$ ? this.defaultBusiness$.currency : 'RWF';
                            return [2 /*return*/];
                    }
                });
            });
        };
        FlipperPosComponent.prototype.currentBusiness = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.http
                                .get(flipperUrl + '/api/business')
                                .toPromise()
                                .then(function (business) {
                                _this.defaultBusiness$ = business;
                            })];
                        case 1:
                            _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        FlipperPosComponent.prototype.getTaxes = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.http
                                .get(flipperUrl + '/api/taxes')
                                .toPromise()
                                .then(function (taxes) {
                                _this.taxes = taxes;
                            })];
                        case 1:
                            _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        FlipperPosComponent.prototype.currentBranches = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.http
                                .get(flipperUrl + '/api/branches/' + this.defaultBusiness$.id)
                                .toPromise()
                                .then(function (branches) {
                                var e_1, _f;
                                try {
                                    for (var branches_1 = __values(branches), branches_1_1 = branches_1.next(); !branches_1_1.done; branches_1_1 = branches_1.next()) {
                                        var branch = branches_1_1.value;
                                        if (branch.active) {
                                            _this.defaultBranch = branch;
                                        }
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (branches_1_1 && !branches_1_1.done && (_f = branches_1.return)) _f.call(branches_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                            })];
                        case 1:
                            _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        FlipperPosComponent.prototype.makeid = function (length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };
        FlipperPosComponent.prototype.generateCode = function () {
            return this.makeid(5);
        };
        FlipperPosComponent.prototype.newOrder = function () {
            return __awaiter(this, void 0, void 0, function () {
                var formOrder;
                var _this = this;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (!!this.currentOrder) return [3 /*break*/, 2];
                            formOrder = {
                                reference: 'SO' + this.generateCode(),
                                orderNumber: 'SO' + this.generateCode(),
                                branchId: this.defaultBranch.id,
                                status: flipperComponents.STATUS.OPEN,
                                orderType: flipperComponents.ORDERTYPE.SALES,
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
                            return [4 /*yield*/, this.http
                                    .post(flipperUrl + '/api/order', formOrder)
                                    .toPromise()
                                    .then(function (order) {
                                    _this.currentOrder = order;
                                })];
                        case 1:
                            // create a draft order to be used.
                            _f.sent();
                            _f.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        FlipperPosComponent.prototype.hasDraftOrder = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.draftOrder(this.defaultBranch)];
                        case 1:
                            _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        FlipperPosComponent.prototype.draftOrder = function (branchId) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.http
                                .post(flipperUrl + '/api/order', {})
                                .toPromise()
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _f;
                                return __generator(this, function (_g) {
                                    switch (_g.label) {
                                        case 0:
                                            this.currentOrder = res;
                                            _f = this.currentOrder;
                                            return [4 /*yield*/, this.currentOrder];
                                        case 1:
                                            _f.orderItems =
                                                (_g.sent()) && this.currentOrder.orderItems && this.currentOrder.orderItems.length > 0
                                                    ? this.currentOrder.orderItems
                                                    : [];
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1:
                            _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        FlipperPosComponent.prototype.stockVariants = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.http
                                .get(flipperUrl + '/api/stock-variant')
                                .toPromise()
                                .then(function (orders) {
                                if (orders.length > 0) {
                                    _this.stockVariant = orders;
                                }
                                else {
                                    _this.stockVariant = [];
                                }
                            })];
                        case 1:
                            _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        FlipperPosComponent.prototype.loadVariants = function (param) {
            if (param === void 0) { param = null; }
            var variantsArray = [];
            if (this.stockVariant.length > 0) {
                this.stockVariant.forEach(function (variant) {
                    var form = {
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
        };
        FlipperPosComponent.prototype.iWantToSearchVariant = function (event) {
            if (event && event != undefined && event != null) {
                var results = this.loadVariants(event);
                console.log(this.loadVariants(event));
                if (results.length > 0) {
                    this.theVariantFiltered = this.filterByValue(results, event);
                }
            }
        };
        FlipperPosComponent.prototype.filterByValue = function (arrayOfObject, term) {
            var query = term.toString().toLowerCase();
            return arrayOfObject.filter(function (v, i) {
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
        };
        FlipperPosComponent.prototype.updateOrderDetails = function (details) {
            return __awaiter(this, void 0, void 0, function () {
                var taxRate, subTotal, orderDetails;
                return __generator(this, function (_f) {
                    if (details.action === 'DELETE') {
                        this.currentOrder.orderItems = this.currentOrder.orderItems.filter(function (el) {
                            return el.id != details.item.id;
                        });
                    }
                    if (details.action === 'UPDATE') {
                        details.item.price = parseFloat(details.item.price);
                        taxRate = details.item.taxRate ? details.item.taxRate : 0;
                        subTotal = details.item.price * details.item.quantity;
                        details.item.taxAmount = (subTotal * taxRate) / 100;
                        details.item.subTotal = subTotal;
                        this.currentOrder.orderItems = this.currentOrder.orderItems.filter(function (el) {
                            return el.id != details.item.id;
                        });
                        this.currentOrder.orderItems.push(details.item);
                    }
                    orderDetails = this.currentOrder.orderItems;
                    this.updateOrder(orderDetails);
                    return [2 /*return*/];
                });
            });
        };
        FlipperPosComponent.prototype.updateOrder = function (orderDetail) {
            return __awaiter(this, void 0, void 0, function () {
                var orderDetails, subtotal, taxAmount;
                var _this = this;
                return __generator(this, function (_f) {
                    orderDetails = [];
                    if (orderDetail.length == 0) {
                        orderDetails = this.currentOrder.orderItems.filter(function (order) { return order.orderId == _this.currentOrder.id; });
                    }
                    else {
                        orderDetails = orderDetail;
                    }
                    if (orderDetails.length > 0) {
                        subtotal = parseFloat(this.totalPipe.transform(orderDetails, 'subTotal'));
                        taxAmount = parseFloat(this.totalPipe.transform(orderDetails, 'taxAmount'));
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
                    return [2 /*return*/];
                });
            });
        };
        FlipperPosComponent.prototype.addToCart = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var taxRate, subTotal, orderDetails;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            event.id = this.database.uid();
                            event.orderId = this.currentOrder.id;
                            taxRate = event.taxRate ? event.taxRate : 0;
                            subTotal = event.price * event.quantity;
                            event.taxAmount = (subTotal * taxRate) / 100;
                            event.subTotal = subTotal;
                            this.currentOrder.orderItems.push(event);
                            orderDetails = this.currentOrder.orderItems;
                            if (!(orderDetails.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.updateOrder(orderDetails)];
                        case 1:
                            _f.sent();
                            _f.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        FlipperPosComponent.prototype.didCollectCash = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            this.collectCashCompleted = { isCompleted: false, collectedOrder: this.currentOrder };
                            if (!(event === true)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.createStockHistory()];
                        case 1:
                            _f.sent();
                            this.currentOrder.isDraft = false;
                            this.currentOrder.status = flipperComponents.STATUS.COMPLETE;
                            this.currentOrder.createdAt = new Date().toISOString();
                            this.currentOrder.updatedAt = new Date().toISOString();
                            this.currentOrder.active = false;
                            this.currentOrder['draft'] = false;
                            this.currentOrder['orderItems'];
                            return [4 /*yield*/, this.http
                                    .put(flipperUrl + '/api/order/' + this.currentOrder.id, this.currentOrder)
                                    .toPromise()
                                    .then(function (order) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_f) {
                                        switch (_f.label) {
                                            case 0:
                                                this.collectCashCompleted = { isCompleted: true, collectedOrder: order };
                                                this.currentOrder = null;
                                                return [4 /*yield*/, this.newOrder()];
                                            case 1:
                                                _f.sent();
                                                return [4 /*yield*/, this.hasDraftOrder()];
                                            case 2:
                                                _f.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _f.sent();
                            _f.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        FlipperPosComponent.prototype.createStockHistory = function () {
            return __awaiter(this, void 0, void 0, function () {
                var odetails;
                var _this = this;
                return __generator(this, function (_f) {
                    odetails = this.currentOrder.orderItems;
                    if (odetails.length) {
                        odetails.forEach(function (details) { return __awaiter(_this, void 0, void 0, function () {
                            var stockHistories;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        if (!(details.currentStock > 0)) return [3 /*break*/, 2];
                                        stockHistories = {
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
                                        return [4 /*yield*/, this.http
                                                .post(flipperUrl + '/api/stock-histories', stockHistories)
                                                .toPromise()
                                                .then()];
                                    case 1:
                                        _f.sent();
                                        _f.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [2 /*return*/];
                });
            });
        };
        FlipperPosComponent.prototype.saveOrderUpdated = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.updateOrder([])];
                        case 1:
                            _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return FlipperPosComponent;
    }());
    FlipperPosComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lib-flipper-pos',
                    template: "<div @insertPos>\r\n  <flipper-basic-pos\r\n\r\n  [currentOrder]=\"currentOrder\"\r\n  [collectCashCompleted]=\"collectCashCompleted\"\r\n  [taxes]=\"taxes\"\r\n  [currency]=\"currency\"\r\n  (addToCartEmit)=\"addToCart($event)\"\r\n  [foundVariant]=\"theVariantFiltered\"\r\n  (searchEmitValue)=\"iWantToSearchVariant($event)\"\r\n  (saveOrderUpdatedEmit)=\"saveOrderUpdated($event)\"\r\n  (updateOrderDetailsEmit)=\"updateOrderDetails($event)\"\r\n  (didCollectCashEmit)=\"didCollectCash($event)\">\r\n  </flipper-basic-pos>\r\n\r\n</div>\r\n",
                    animations: [
                        animations.trigger('insertPos', [animations.transition(':enter', animations.useAnimation(flipperComponents.fadeInAnimation, { params: { duration: '1s' } }))]),
                    ],
                    styles: ["section{background-color:#29282e;font-family:sans-serif;height:100vh;position:absolute;text-align:center;top:0;width:100vw}h1{color:#66d9ef}span{color:#fff;font-size:18px;margin-top:50px}.btns-container{display:flex;flex-direction:row;justify-content:space-around;margin:50px auto;width:350px}.copyright{bottom:30px;color:#fff;position:absolute;width:100%}span{display:block;margin:10px auto;padding:0;width:100%}"]
                },] }
    ];
    FlipperPosComponent.ctorParameters = function () { return [
        { type: flipperComponents.PouchDBService },
        { type: flipperInventory.StockService },
        { type: http.HttpClient },
        { type: flipperInventory.VariationService },
        { type: flipperInventory.ProductService },
        { type: flipperComponents.CalculateTotalClassPipe }
    ]; };

    var FlipperPosModule = /** @class */ (function () {
        function FlipperPosModule() {
        }
        return FlipperPosModule;
    }());
    FlipperPosModule.decorators = [
        { type: i0.NgModule, args: [{
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
                        common.CommonModule,
                        http.HttpClientModule,
                        flipperComponents.FlipperComponentsModule,
                        animations$1.BrowserAnimationsModule,
                        platformBrowser.BrowserModule,
                        flipperVendors.VendorsModule,
                        flipperDialog.DialogModule,
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

    exports.AutocompleteComponent = AutocompleteComponent;
    exports.BasicShoppingListComponent = BasicShoppingListComponent;
    exports.CalculatorComponent = CalculatorComponent;
    exports.FlipperBasicPosComponent = FlipperBasicPosComponent;
    exports.FlipperPosComponent = FlipperPosComponent;
    exports.FlipperPosModule = FlipperPosModule;
    exports.FlipperPosService = FlipperPosService;
    exports.SearchBoxComponent = SearchBoxComponent;
    exports.ShoppingListsComponent = ShoppingListsComponent;
    exports.StandardShoppingListComponent = StandardShoppingListComponent;
    exports.ɵa = UpdatePriceDialogComponent;
    exports.ɵb = AddCartItemDialogComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=enexus-flipper-pos.umd.js.map
