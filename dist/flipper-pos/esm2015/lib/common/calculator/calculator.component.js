import { Component, Input, EventEmitter, Output, HostListener, ViewChild } from '@angular/core';
import { CalculateTotalClassPipe, FindKeyPipe, RoundNumberPipe } from '@enexus/flipper-components';
import { DialogService } from '@enexus/flipper-dialog';
export class CalculatorComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLXBvcy9zcmMvbGliL2NvbW1vbi9jYWxjdWxhdG9yL2NhbGN1bGF0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBYyxNQUFNLGVBQWUsQ0FBQTtBQUMzRyxPQUFPLEVBQVMsdUJBQXVCLEVBQUUsV0FBVyxFQUFnQixlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUN2SCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFRdEQsTUFBTSxPQUFPLG1CQUFtQjtJQW9COUIsWUFDVSxTQUFrQyxFQUNuQyxNQUFxQixFQUNwQixRQUF5QixFQUN6QixXQUF3QjtRQUh4QixjQUFTLEdBQVQsU0FBUyxDQUF5QjtRQUNuQyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQ3pCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTnhCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQTtRQVN0RCxrQkFBYSxHQUFHLEdBQUcsQ0FBQTtRQUVuQixxQkFBZ0IsR0FBRyxLQUFLLENBQUE7UUFFaEIsbUJBQWMsR0FBVSxJQUFJLENBQUE7UUFDMUIseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQTtRQUNoRCxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUE7UUFFOUMsYUFBUSxHQUFHLEtBQUssQ0FBQTtRQUVqQiw0QkFBdUIsR0FBVztZQUN4QyxXQUFXLEVBQUUsS0FBZ0I7WUFDN0IsY0FBYyxFQUFFLElBQWE7U0FDOUIsQ0FBQTtRQUNNLHdCQUFtQixHQUFHLEtBQUssQ0FBQTtRQUMzQixtQkFB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Q0FBQyxDQUFBO1FBQzNFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUVoQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFBO0lBQzFCLENBQUM7OztZQTdPRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIseWhKQUEwQztnQkFFMUMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQzs7YUFDbkU7OztZQVJlLHVCQUF1QjtZQUM5QixhQUFhO1lBRDhDLGVBQWU7WUFBMUMsV0FBVzs7OzJCQVdqRCxLQUFLLFNBQUMsY0FBYzttQ0FRcEIsS0FBSyxTQUFDLHNCQUFzQjs2QkFRNUIsTUFBTTttQ0FjTixNQUFNOzhCQUNOLE1BQU07dUJBRU4sS0FBSztpQ0FTTCxTQUFTLFNBQUMsZUFBZSxFQUFFO29CQUMxQixNQUFNLEVBQUUsS0FBSztpQkFDZDsrQkFtQkEsWUFBWSxTQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHsgT3JkZXIsIENhbGN1bGF0ZVRvdGFsQ2xhc3NQaXBlLCBGaW5kS2V5UGlwZSwgT3JkZXJEZXRhaWxzLCBSb3VuZE51bWJlclBpcGUgfSBmcm9tICdAZW5leHVzL2ZsaXBwZXItY29tcG9uZW50cydcclxuaW1wb3J0IHsgRGlhbG9nU2VydmljZSB9IGZyb20gJ0BlbmV4dXMvZmxpcHBlci1kaWFsb2cnXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ZsaXBwZXItY2FsY3VsYXRvcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGN1bGF0b3IuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NhbGN1bGF0b3IuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtDYWxjdWxhdGVUb3RhbENsYXNzUGlwZSwgRmluZEtleVBpcGUsIFJvdW5kTnVtYmVyUGlwZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdG9yQ29tcG9uZW50IHtcclxuICAvLyBjb2xsZWN0Q2FzaFxyXG4gIEBJbnB1dCgnY3VycmVudE9yZGVyJylcclxuICBzZXQgY3VycmVudE9yZGVyKG9yZGVyOiBPcmRlcikge1xyXG4gICAgdGhpcy5pc0N1cnJlbnRPcmRlciA9IG9yZGVyXHJcbiAgfVxyXG4gIGdldCBjdXJyZW50T3JkZXIoKTogT3JkZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNDdXJyZW50T3JkZXJcclxuICB9XHJcbiAgLy8gY29sbGVjdENhc2hDb21wbGV0ZWRcclxuICBASW5wdXQoJ2NvbGxlY3RDYXNoQ29tcGxldGVkJylcclxuICBzZXQgY29sbGVjdENhc2hDb21wbGV0ZWQoaW5wdXRlZDogb2JqZWN0KSB7XHJcbiAgICB0aGlzLmRpZENvbGxlY3RDYXNoQ29tcGxldGVkID0gaW5wdXRlZFxyXG4gICAgdGhpcy5nZXRDb2xsZWN0Q2FzaENvbXBsZXRlZChpbnB1dGVkKVxyXG4gIH1cclxuICBnZXQgY29sbGVjdENhc2hDb21wbGV0ZWQoKTogb2JqZWN0IHtcclxuICAgIHJldHVybiB0aGlzLmRpZENvbGxlY3RDYXNoQ29tcGxldGVkXHJcbiAgfVxyXG4gIEBPdXRwdXQoKSBjbG9zZU1vZGVsRW1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdG90YWxQaXBlOiBDYWxjdWxhdGVUb3RhbENsYXNzUGlwZSxcclxuICAgIHB1YmxpYyBkaWFsb2c6IERpYWxvZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJhbmRQaXBlOiBSb3VuZE51bWJlclBpcGUsXHJcbiAgICBwcml2YXRlIGZpbmRLZXlQaXBlOiBGaW5kS2V5UGlwZVxyXG4gICkge31cclxuXHJcbiAgY3VycmVudE51bWJlciA9ICcwJ1xyXG5cclxuICBpc05lZ2F0aXZlTnVtYmVyID0gZmFsc2VcclxuXHJcbiAgcHJpdmF0ZSBpc0N1cnJlbnRPcmRlcjogT3JkZXIgPSBudWxsXHJcbiAgQE91dHB1dCgpIHNhdmVPcmRlclVwZGF0ZWRFbWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxPcmRlcj4oKVxyXG4gIEBPdXRwdXQoKSBjb2xsZWN0Q2FzaEVtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcclxuXHJcbiAgQElucHV0KCkgY3VycmVuY3kgPSAnUldGJ1xyXG5cclxuICBwcml2YXRlIGRpZENvbGxlY3RDYXNoQ29tcGxldGVkOiBvYmplY3QgPSB7XHJcbiAgICBpc0NvbXBsZXRlZDogZmFsc2UgYXMgYm9vbGVhbixcclxuICAgIGNvbGxlY3RlZE9yZGVyOiBudWxsIGFzIE9yZGVyLFxyXG4gIH1cclxuICBwdWJsaWMgaXNDYWxjdWxhdG9yTnVtT3BlbiA9IGZhbHNlXHJcbiAgcHVibGljIGNhbGN1bGF0b3JOdW1zID0gW11cclxuXHJcbiAgQFZpZXdDaGlsZCgnbXlTZWFyY2hJbnB1dCcsIHtcclxuICAgIHN0YXRpYzogZmFsc2UsXHJcbiAgfSlcclxuICBwdWJsaWMgc2VhcmNoSW5wdXRFbGVtZW50OiBFbGVtZW50UmVmID0gbnVsbFxyXG5cclxuICBnZXRDb2xsZWN0Q2FzaENvbXBsZXRlZChpbnB1dGVkKSB7XHJcbiAgICBpZiAoaW5wdXRlZCAmJiBpbnB1dGVkLmlzQ29tcGxldGVkKSB7XHJcbiAgICAgIGNvbnN0IGNoYW5nZUR1ZSA9XHJcbiAgICAgICAgaW5wdXRlZC5jb2xsZWN0ZWRPcmRlci5jdXN0b21lckNoYW5nZUR1ZSA9PT0gMCB8fCBpbnB1dGVkLmNvbGxlY3RlZE9yZGVyLmN1c3RvbWVyQ2hhbmdlRHVlID09PSAnMC4wMCdcclxuICAgICAgICAgID8gJ05vJ1xyXG4gICAgICAgICAgOiB0aGlzLnJhbmRQaXBlLnRyYW5zZm9ybShpbnB1dGVkLmNvbGxlY3RlZE9yZGVyLmN1c3RvbWVyQ2hhbmdlRHVlKVxyXG4gICAgICBjb25zdCBjYWhzUmVjZWl2ZWQgPSB0aGlzLnJhbmRQaXBlLnRyYW5zZm9ybShpbnB1dGVkLmNvbGxlY3RlZE9yZGVyLmNhc2hSZWNlaXZlZClcclxuICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nXHJcbiAgICAgICAgLm1lc3NhZ2UoJ1N1Y2Nlc3MgTWVzc2FnZScsIGNoYW5nZUR1ZSArICcgY2hhbmdlIG91dCBvZiAnICsgY2Foc1JlY2VpdmVkLCAnU3VjY2VzcycsICdTSVpFX01EJylcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNDYWxjdWxhdG9yTnVtT3BlbiA9IGZhbHNlXHJcbiAgICAgICAgICB0aGlzLmNsb3NlTW9kZWxFbWl0LmVtaXQodHJ1ZSlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdjYXNoIGNvbGxlY3RlZCBzdWNjZXNzZnVsbHknKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24nLCBbJyRldmVudCddKSBvbktleWRvd25IYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudE9yZGVyKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgIShldmVudC50eXBlID09PSAnc2VhcmNoJyB8fCBldmVudC50eXBlID09PSAnbnVtYmVyJyB8fCBldmVudC50eXBlID09PSAndGV4dCcpICYmXHJcbiAgICAgIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnRW5kJylcclxuICAgICkge1xyXG4gICAgICB0aGlzLmNvbGxlY3RDYXNoKClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIChldmVudC5zaGlmdEtleSAmJiBldmVudC5rZXkgPT09ICdGJykgfHwgLy8gc2hpZnQgKyBzXHJcbiAgICAgIChldmVudC5zaGlmdEtleSAmJiBldmVudC5rZXkgPT09ICdLJykgfHwgLy8gc2hpZnQgKyBrXHJcbiAgICAgIChldmVudC5zaGlmdEtleSAmJiBldmVudC5rZXkgPT09ICdTJylcclxuICAgICkge1xyXG4gICAgICAvLyBzaGlmdCArIGZcclxuICAgICAgdGhpcy5pc0NhbGN1bGF0b3JOdW1PcGVuID0gZmFsc2VcclxuICAgIH1cclxuICAgIC8vIGlmIG5vdCBzZWFyY2hpbmcgb3Igbm90IGRlbGV0ZSBpdGVtIG9uIGNhcnRcclxuICAgIC8vIHRzbGludDpkaXNhYmxlXHJcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4gICAgaWYgKCEoZXZlbnQudGFyZ2V0Wyd0eXBlJ10gPT09ICdzZWFyY2gnIHx8IGV2ZW50LnRhcmdldFsndHlwZSddID09PSAnbnVtYmVyJyB8fCBldmVudC50YXJnZXRbJ3R5cGUnXSA9PT0gJ3RleHQnKSkge1xyXG4gICAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXHJcbiAgICAgIC8vIHRzbGludDplbmFibGVcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICAhKFxyXG4gICAgICAgICAgZXZlbnQua2V5ID09PSAnRGVsZXRlJyB8fCAvLyBkZWxldGUga2V5XHJcbiAgICAgICAgICAoZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQua2V5ID09PSAnKycpIHx8IC8vIHNoaWZ0ICsgKCspXHJcbiAgICAgICAgICAoZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQua2V5ID09PSAnSycpIHx8XHJcbiAgICAgICAgICAoZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQua2V5ID09PSAnUycpIHx8XHJcbiAgICAgICAgICAoZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQua2V5ID09PSAnRicpIHx8XHJcbiAgICAgICAgICAoZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQua2V5ID09PSAnLScpXHJcbiAgICAgICAgKSAvLyBzaGlmdCArICgtKVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmlzQ2FsY3VsYXRvck51bU9wZW4gPSB0cnVlXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzQ2FsY3VsYXRvck51bU9wZW4pIHtcclxuICAgICAgICAgIGNvbnN0IHJlID0gL15bMC05Ll0rJC9cclxuICAgICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleVxyXG4gICAgICAgICAgaWYgKGtleS5tYXRjaChyZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdG9yTnVtcy5wdXNoKGtleSlcclxuICAgICAgICAgICAgY29uc3QgbnVtcyA9IHRoaXMuY2FsY3VsYXRvck51bXMuam9pbignJylcclxuICAgICAgICAgICAgdGhpcy5nZXROdW1iZXJPbktleVByZXNzKG51bXMpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBjbGVhbiBjYWxjdWxhdG9yIGJ5IHByZXNzIGJhY2tzcGFjZVxyXG4gICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0JhY2tzcGFjZScpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdG9yTnVtcy5wb3AoKVxyXG4gICAgICAgICAgICBjb25zdCBudW1zID0gdGhpcy5jYWxjdWxhdG9yTnVtcy5qb2luKCcnKVxyXG4gICAgICAgICAgICB0aGlzLmdldE51bWJlck9uS2V5UHJlc3MobnVtcylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pc0NhbGN1bGF0b3JOdW1PcGVuID0gZmFsc2VcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ1NoaWZ0Jykge1xyXG4gICAgICAgIHRoaXMuaXNDYWxjdWxhdG9yTnVtT3BlbiA9ICF0aGlzLmlzQ2FsY3VsYXRvck51bU9wZW5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudE9yZGVyKSB7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRvck51bXMucG9wKClcclxuICAgICAgY29uc3QgbnVtcyA9IHRoaXMuY2FsY3VsYXRvck51bXMuam9pbignJylcclxuICAgICAgdGhpcy5nZXROdW1iZXJPbktleVByZXNzKG51bXMpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREZWNpbWFsKCkge1xyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnROdW1iZXIuaW5jbHVkZXMoJy4nKSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnROdW1iZXIgKz0gJy4nXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TnVtYmVyT25LZXlQcmVzcyh2OiBzdHJpbmcpIHtcclxuICAgIHRoaXMuY3VycmVudE51bWJlciA9IHYgPyB2IDogJzAnXHJcbiAgICB0aGlzLm1ha2VUb3RhbCgpXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TnVtYmVyKHY6IHN0cmluZykge1xyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRPcmRlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5kaWFsb2cubWVzc2FnZSgnRmFpbHVyZSBNZXNzYWdlJywgJ05vIGN1cnJlbnQgb3JkZXIgY3JlYXRlZCEnLCAnRmFpbHVyZScsICdTSVpFX1NNJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzQ2FsY3VsYXRvck51bU9wZW4gPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuY2xvc2VNb2RlbEVtaXQuZW1pdCh0cnVlKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgdGhpcy5pc0NhbGN1bGF0b3JOdW1PcGVuID0gdHJ1ZVxyXG4gICAgdGhpcy5jYWxjdWxhdG9yTnVtcy5wdXNoKHYpXHJcbiAgICBjb25zdCBudW1zID0gdGhpcy5jYWxjdWxhdG9yTnVtcy5qb2luKCcnKVxyXG4gICAgdGhpcy5nZXROdW1iZXJPbktleVByZXNzKG51bXMpXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbWFrZVRvdGFsKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudE9yZGVyKSB7XHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPcmRlci5zdWJUb3RhbCA8PSAwKSB7XHJcbiAgICAgICAgdGhpcy5pc0NhbGN1bGF0b3JOdW1PcGVuID0gZmFsc2VcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JOdW1zLnBvcCgpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nXHJcbiAgICAgICAgICAubWVzc2FnZSgnRmFpbHVyZSBNZXNzYWdlJywgJ05vIHNob3BwaW5nIGxpc3QgY291bGQgZm91bmQhJywgJ0ZhaWx1cmUnLCAnU0laRV9TTScpXHJcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0NhbGN1bGF0b3JOdW1PcGVuID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5jbG9zZU1vZGVsRW1pdC5lbWl0KHRydWUpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY3VycmVudE9yZGVyLnNhbGVUb3RhbCA9IHRoaXMuY3VycmVudE9yZGVyLnN1YlRvdGFsICsgdGhpcy5jdXJyZW50T3JkZXIudGF4QW1vdW50XHJcbiAgICAgICAgdGhpcy5jdXJyZW50T3JkZXIuY2FzaFJlY2VpdmVkID0gdGhpcy5jdXJyZW50TnVtYmVyXHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudE9yZGVyLmNhc2hSZWNlaXZlZCA9IHRoaXMuY3VycmVudE9yZGVyLmNhc2hSZWNlaXZlZFxyXG4gICAgICAgICAgPyB0aGlzLmN1cnJlbnRPcmRlci5jYXNoUmVjZWl2ZWRcclxuICAgICAgICAgIDogdGhpcy5jdXJyZW50T3JkZXIuc2FsZVRvdGFsXHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudE9yZGVyLmN1c3RvbWVyQ2hhbmdlRHVlID1cclxuICAgICAgICAgIHRoaXMuY3VycmVudE9yZGVyLmNhc2hSZWNlaXZlZCA+IDAgPyB0aGlzLmN1cnJlbnRPcmRlci5jYXNoUmVjZWl2ZWQgLSB0aGlzLmN1cnJlbnRPcmRlci5zYWxlVG90YWwgOiAwLjBcclxuXHJcbiAgICAgICAgdGhpcy5zYXZlT3JkZXJVcGRhdGVkRW1pdC5lbWl0KHRoaXMuY3VycmVudE9yZGVyKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbktleUZvY3VzZWQoa2V5KSB7XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudE9yZGVyKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZmluZEtleVBpcGUudHJhbnNmb3JtKHRoaXMuY2FsY3VsYXRvck51bXMsIGtleSlcclxuICB9XHJcblxyXG4gIGNvbGxlY3RDYXNoKCkge1xyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRPcmRlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5kaWFsb2cubWVzc2FnZSgnRmFpbHVyZSBNZXNzYWdlJywgJ05vIGN1cnJlbnQgb3JkZXIgY3JlYXRlZCEnLCAnRmFpbHVyZScsICdTSVpFX1NNJylcclxuICAgIH1cclxuICAgIHRoaXMuY3VycmVudE9yZGVyLm9yZGVySXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaWYgKGl0ZW0ucXVhbnRpdHkgPD0gMCkge1xyXG4gICAgICAgIHRoaXMuZGlhbG9nXHJcbiAgICAgICAgICAubWVzc2FnZSgnRmFpbHVyZSBNZXNzYWdlJywgJ05lZ2F0aXZlIHF1YW50aXR5IGlzIG5vdCBhbGxvd2VkLicsICdGYWlsdXJlJywgJ1NJWkVfU00nKVxyXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7fSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHRoaXMuY29sbGVjdENhc2hFbWl0LmVtaXQoZmFsc2UpXHJcbiAgICBpZiAodGhpcy5jdXJyZW50T3JkZXIuc3ViVG90YWwgPD0gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kaWFsb2dcclxuICAgICAgICAubWVzc2FnZSgnRmFpbHVyZSBNZXNzYWdlJywgJ1RvdGFsIHRvIGJlIHBhaWQgaXMgZXF1YWwgdG8gemVyby4nLCAnRmFpbHVyZScsICdTSVpFX1NNJylcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNDYWxjdWxhdG9yTnVtT3BlbiA9IGZhbHNlXHJcbiAgICAgICAgICB0aGlzLmNsb3NlTW9kZWxFbWl0LmVtaXQodHJ1ZSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY3VycmVudE9yZGVyLmN1c3RvbWVyQ2hhbmdlRHVlIDwgMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kaWFsb2cubWVzc2FnZSgnRmFpbHVyZSBNZXNzYWdlJywgXCJDYXNoIHJlY2VpdmVkIGNhbid0IGxlc3MgdGhhbiAwIVwiLCAnRmFpbHVyZScsICdTSVpFX1NNJylcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50T3JkZXIuY3VzdG9tZXJDaGFuZ2VEdWUgPT09IDApIHtcclxuICAgICAgdGhpcy5jdXJyZW50T3JkZXIuY2FzaFJlY2VpdmVkID0gcGFyc2VGbG9hdCh0aGlzLmN1cnJlbnRPcmRlci5zYWxlVG90YWwpXHJcbiAgICAgIHRoaXMuY3VycmVudE9yZGVyLmN1c3RvbWVyQ2hhbmdlRHVlID1cclxuICAgICAgICBwYXJzZUZsb2F0KHRoaXMuY3VycmVudE9yZGVyLmNhc2hSZWNlaXZlZCkgLSBwYXJzZUZsb2F0KHRoaXMuY3VycmVudE9yZGVyLnNhbGVUb3RhbClcclxuICAgIH1cclxuICAgIHRoaXMuY3VycmVudE9yZGVyLmNhc2hSZWNlaXZlZCA9IHBhcnNlRmxvYXQodGhpcy5jdXJyZW50T3JkZXIuY2FzaFJlY2VpdmVkKVxyXG4gICAgdGhpcy5jdXJyZW50T3JkZXIuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICB0aGlzLnNhdmVPcmRlclVwZGF0ZWRFbWl0LmVtaXQodGhpcy5jdXJyZW50T3JkZXIpXHJcbiAgICB0aGlzLmNvbGxlY3RDYXNoRW1pdC5lbWl0KHRydWUpXHJcbiAgICB0aGlzLmlzQ2FsY3VsYXRvck51bU9wZW4gPSBmYWxzZVxyXG4gICAgdGhpcy5jYWxjdWxhdG9yTnVtcyA9IFtdXHJcbiAgfVxyXG59XHJcbiJdfQ==