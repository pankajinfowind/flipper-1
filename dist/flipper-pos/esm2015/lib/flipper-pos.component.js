import { __awaiter } from "tslib";
import { transition, trigger, useAnimation } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CalculateTotalClassPipe, STATUS, ORDERTYPE, PouchDBService, PouchConfig, fadeInAnimation, } from '@enexus/flipper-components';
import { ProductService, StockService, VariationService } from '@enexus/flipper-inventory';
import { flipperUrl } from './constants';
export class FlipperPosComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcHBlci1wb3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZmxpcHBlci1wb3Mvc3JjL2xpYi9mbGlwcGVyLXBvcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFBO0FBQ2pELE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsTUFBTSxFQUNOLFNBQVMsRUFRVCxjQUFjLEVBQ2QsV0FBVyxFQUVYLGVBQWUsR0FDaEIsTUFBTSw0QkFBNEIsQ0FBQTtBQUVuQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBQzFGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFVeEMsTUFBTSxPQUFPLG1CQUFtQjtJQXdDOUIsWUFDVSxRQUF3QixFQUN4QixLQUFtQixFQUNuQixJQUFnQixFQUNqQixPQUF5QixFQUN6QixPQUF1QixFQUN0QixTQUFrQztRQUxsQyxhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQVk7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBeUI7UUFackMscUJBQWdCLEdBQWEsSUFBSSxDQUFBO1FBQ2pDLGtCQUFhLEdBQVcsSUFBSSxDQUFBO1FBQzVCLGdCQUFXLEdBQVUsSUFBSSxDQUFBO1FBQ3pCLGlCQUFZLEdBQW1CLEVBQUUsQ0FBQTtRQUVqQyxhQUFRLEdB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RUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM1Rzs7YUFDRjs7O1lBaEJDLGNBQWM7WUFNUyxZQUFZO1lBcEI1QixVQUFVO1lBb0JvQixnQkFBZ0I7WUFBOUMsY0FBYztZQWpCckIsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHJhbnNpdGlvbiwgdHJpZ2dlciwgdXNlQW5pbWF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucydcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7XHJcbiAgQ2FsY3VsYXRlVG90YWxDbGFzc1BpcGUsXHJcbiAgT3JkZXIsXHJcbiAgU1RBVFVTLFxyXG4gIE9SREVSVFlQRSxcclxuICBCcmFuY2gsXHJcbiAgU3RvY2ssXHJcbiAgUHJvZHVjdCxcclxuICBPcmRlckRldGFpbHMsXHJcbiAgU3RvY2tIaXN0b3J5LFxyXG4gIEJ1c2luZXNzLFxyXG4gIFRheGVzLFxyXG4gIFBvdWNoREJTZXJ2aWNlLFxyXG4gIFBvdWNoQ29uZmlnLFxyXG4gIFZhcmlhbnQsXHJcbiAgZmFkZUluQW5pbWF0aW9uLFxyXG59IGZyb20gJ0BlbmV4dXMvZmxpcHBlci1jb21wb25lbnRzJ1xyXG5cclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UsIFN0b2NrU2VydmljZSwgVmFyaWF0aW9uU2VydmljZSB9IGZyb20gJ0BlbmV4dXMvZmxpcHBlci1pbnZlbnRvcnknXHJcbmltcG9ydCB7IGZsaXBwZXJVcmwgfSBmcm9tICcuL2NvbnN0YW50cydcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGliLWZsaXBwZXItcG9zJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmxpcHBlci5wb3MuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ZsaXBwZXIucG9zLmNvbXBvbmVudC5jc3MnXSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdpbnNlcnRQb3MnLCBbdHJhbnNpdGlvbignOmVudGVyJywgdXNlQW5pbWF0aW9uKGZhZGVJbkFuaW1hdGlvbiwgeyBwYXJhbXM6IHsgZHVyYXRpb246ICcxcycgfSB9KSldKSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxpcHBlclBvc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgZ2V0IHRoZVZhcmlhbnRGaWx0ZXJlZCgpOiBWYXJpYW50W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VUaGVWYXJpYW50RmlsdGVyZWRcclxuICB9XHJcblxyXG4gIHNldCB0aGVWYXJpYW50RmlsdGVyZWQodmFsdWU6IFZhcmlhbnRbXSkge1xyXG4gICAgdGhpcy5zZVRoZVZhcmlhbnRGaWx0ZXJlZCA9IHZhbHVlXHJcbiAgfVxyXG5cclxuICBnZXQgY3VycmVudE9yZGVyKCk6IE9yZGVyIHtcclxuICAgIHJldHVybiB0aGlzLnNldEN1cnJlbnRPcmRlclxyXG4gIH1cclxuXHJcbiAgc2V0IGN1cnJlbnRPcmRlcih2YWx1ZTogT3JkZXIpIHtcclxuICAgIHRoaXMuc2V0Q3VycmVudE9yZGVyID0gdmFsdWVcclxuICB9XHJcblxyXG4gIGdldCBzdG9ja1ZhcmlhbnQoKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0U3RvY2tWYXJpYW50XHJcbiAgfVxyXG5cclxuICBzZXQgc3RvY2tWYXJpYW50KHZhbHVlOiBhbnlbXSkge1xyXG4gICAgdGhpcy5zZXRTdG9ja1ZhcmlhbnQgPSB2YWx1ZVxyXG4gIH1cclxuXHJcbiAgZ2V0IHRheGVzKCk6IFRheGVzW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0VGF4ZXNcclxuICB9XHJcblxyXG4gIHNldCB0YXhlcyh2YWx1ZTogVGF4ZXNbXSkge1xyXG4gICAgdGhpcy5zZXRUYXhlcyA9IHZhbHVlXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYnJhbmNoOiBCcmFuY2ggfCBudWxsXHJcbiAgcHVibGljIGRlZmF1bHRCdXNpbmVzcyQ6IEJ1c2luZXNzID0gbnVsbFxyXG4gIHB1YmxpYyBkZWZhdWx0QnJhbmNoOiBCcmFuY2ggPSBudWxsXHJcbiAgcHVibGljIGRlZmF1bHRUYXgkOiBUYXhlcyA9IG51bGxcclxuICBwdWJsaWMgb3JkZXJEZXRhaWxzOiBPcmRlckRldGFpbHNbXSA9IFtdXHJcblxyXG4gIHB1YmxpYyBjdXJyZW5jeSA9IG51bGxcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGF0YWJhc2U6IFBvdWNoREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdG9jazogU3RvY2tTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHVibGljIHZhcmlhbnQ6IFZhcmlhdGlvblNlcnZpY2UsXHJcbiAgICBwdWJsaWMgcHJvZHVjdDogUHJvZHVjdFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRvdGFsUGlwZTogQ2FsY3VsYXRlVG90YWxDbGFzc1BpcGVcclxuICApIHtcclxuICAgIHRoaXMuZGF0YWJhc2UuY29ubmVjdChQb3VjaENvbmZpZy5idWNrZXQsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGFubmVsJykpXHJcblxyXG4gICAgdGhpcy5kYXRhYmFzZS5zeW5jKFtQb3VjaENvbmZpZy5zeW5jVXJsXSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YXJpYW50czogVmFyaWFudFtdID0gW11cclxuICBwcml2YXRlIHNlVGhlVmFyaWFudEZpbHRlcmVkOiBWYXJpYW50W10gPSBbXVxyXG4gIHB1YmxpYyBjb2xsZWN0Q2FzaENvbXBsZXRlZDogb2JqZWN0ID0ge31cclxuXHJcbiAgcHJpdmF0ZSBzZXRDdXJyZW50T3JkZXI6IE9yZGVyXHJcbiAgcHJpdmF0ZSBzZXRTdG9ja1ZhcmlhbnQ6IGFueVtdXHJcbiAgcHJpdmF0ZSBzZXRUYXhlczogVGF4ZXNbXVxyXG5cclxuICBkYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpXHJcblxyXG4gIGFzeW5jIG5nT25Jbml0KCkge1xyXG4gICAgYXdhaXQgdGhpcy5nZXRUYXhlcygpXHJcbiAgICBhd2FpdCB0aGlzLmN1cnJlbnRCdXNpbmVzcygpXHJcbiAgICBhd2FpdCB0aGlzLmN1cnJlbnRCcmFuY2hlcygpXHJcbiAgICBhd2FpdCB0aGlzLm5ld09yZGVyKClcclxuICAgIGF3YWl0IHRoaXMuaGFzRHJhZnRPcmRlcigpXHJcblxyXG4gICAgYXdhaXQgdGhpcy5zdG9ja1ZhcmlhbnRzKClcclxuICAgIHRoaXMuY3VycmVudE9yZGVyLm9yZGVySXRlbXMgPVxyXG4gICAgICAoYXdhaXQgdGhpcy5jdXJyZW50T3JkZXIpICYmIHRoaXMuY3VycmVudE9yZGVyLm9yZGVySXRlbXMgJiYgdGhpcy5jdXJyZW50T3JkZXIub3JkZXJJdGVtcy5sZW5ndGggPiAwXHJcbiAgICAgICAgPyB0aGlzLmN1cnJlbnRPcmRlci5vcmRlckl0ZW1zXHJcbiAgICAgICAgOiBbXVxyXG4gICAgdGhpcy51cGRhdGVPcmRlcihbXSlcclxuXHJcbiAgICB0aGlzLmN1cnJlbmN5ID0gdGhpcy5kZWZhdWx0QnVzaW5lc3MkID8gdGhpcy5kZWZhdWx0QnVzaW5lc3MkLmN1cnJlbmN5IDogJ1JXRidcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBjdXJyZW50QnVzaW5lc3MoKSB7XHJcbiAgICBhd2FpdCB0aGlzLmh0dHBcclxuICAgICAgLmdldDxCdXNpbmVzcz4oZmxpcHBlclVybCArICcvYXBpL2J1c2luZXNzJylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKGJ1c2luZXNzID0+IHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRCdXNpbmVzcyQgPSBidXNpbmVzc1xyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGdldFRheGVzKCkge1xyXG4gICAgYXdhaXQgdGhpcy5odHRwXHJcbiAgICAgIC5nZXQ8VGF4ZXNbXT4oZmxpcHBlclVybCArICcvYXBpL3RheGVzJylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHRheGVzID0+IHtcclxuICAgICAgICB0aGlzLnRheGVzID0gdGF4ZXNcclxuICAgICAgfSlcclxuICB9XHJcbiAgYXN5bmMgY3VycmVudEJyYW5jaGVzKCkge1xyXG4gICAgYXdhaXQgdGhpcy5odHRwXHJcbiAgICAgIC5nZXQ8W0JyYW5jaF0+KGZsaXBwZXJVcmwgKyAnL2FwaS9icmFuY2hlcy8nICsgdGhpcy5kZWZhdWx0QnVzaW5lc3MkLmlkKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oYnJhbmNoZXMgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGJyYW5jaCBvZiBicmFuY2hlcykge1xyXG4gICAgICAgICAgaWYgKGJyYW5jaC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0QnJhbmNoID0gYnJhbmNoXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgbWFrZWlkKGxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gJydcclxuICAgIGNvbnN0IGNoYXJhY3RlcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknXHJcbiAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGhcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVDb2RlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5tYWtlaWQoNSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBuZXdPcmRlcigpIHtcclxuICAgIGlmICghdGhpcy5jdXJyZW50T3JkZXIpIHtcclxuICAgICAgY29uc3QgZm9ybU9yZGVyID0ge1xyXG4gICAgICAgIHJlZmVyZW5jZTogJ1NPJyArIHRoaXMuZ2VuZXJhdGVDb2RlKCksXHJcbiAgICAgICAgb3JkZXJOdW1iZXI6ICdTTycgKyB0aGlzLmdlbmVyYXRlQ29kZSgpLFxyXG4gICAgICAgIGJyYW5jaElkOiB0aGlzLmRlZmF1bHRCcmFuY2guaWQsXHJcbiAgICAgICAgc3RhdHVzOiBTVEFUVVMuT1BFTixcclxuICAgICAgICBvcmRlclR5cGU6IE9SREVSVFlQRS5TQUxFUyxcclxuICAgICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgICAgb3JkZXJJdGVtczogW10sXHJcbiAgICAgICAgc3ViVG90YWw6IDAuMCxcclxuICAgICAgICBkcmFmdDogdHJ1ZSxcclxuICAgICAgICBjYXNoUmVjZWl2ZWQ6IDAuMCxcclxuICAgICAgICBjdXN0b21lckNoYW5nZUR1ZTogMC4wLFxyXG4gICAgICAgIHRhYmxlOiAnb3JkZXJzJyxcclxuICAgICAgICBjaGFubmVsczogW3RoaXMuZGVmYXVsdEJ1c2luZXNzJC51c2VySWRdLFxyXG4gICAgICAgIGNyZWF0ZWRBdDogdGhpcy5kYXRlLFxyXG4gICAgICAgIHVwZGF0ZWRBdDogdGhpcy5kYXRlLFxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjcmVhdGUgYSBkcmFmdCBvcmRlciB0byBiZSB1c2VkLlxyXG4gICAgICBhd2FpdCB0aGlzLmh0dHBcclxuICAgICAgICAucG9zdChmbGlwcGVyVXJsICsgJy9hcGkvb3JkZXInLCBmb3JtT3JkZXIpXHJcbiAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgLnRoZW4ob3JkZXIgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50T3JkZXIgPSBvcmRlciBhcyBPcmRlclxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBoYXNEcmFmdE9yZGVyKCkge1xyXG4gICAgYXdhaXQgdGhpcy5kcmFmdE9yZGVyKHRoaXMuZGVmYXVsdEJyYW5jaClcclxuICB9XHJcbiAgcHVibGljIGFzeW5jIGRyYWZ0T3JkZXIoYnJhbmNoSWQpIHtcclxuICAgIGF3YWl0IHRoaXMuaHR0cFxyXG4gICAgICAucG9zdChmbGlwcGVyVXJsICsgJy9hcGkvb3JkZXInLCB7fSlcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKGFzeW5jIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50T3JkZXIgPSByZXMgYXMgT3JkZXJcclxuICAgICAgICB0aGlzLmN1cnJlbnRPcmRlci5vcmRlckl0ZW1zID1cclxuICAgICAgICAgIChhd2FpdCB0aGlzLmN1cnJlbnRPcmRlcikgJiYgdGhpcy5jdXJyZW50T3JkZXIub3JkZXJJdGVtcyAmJiB0aGlzLmN1cnJlbnRPcmRlci5vcmRlckl0ZW1zLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgPyB0aGlzLmN1cnJlbnRPcmRlci5vcmRlckl0ZW1zXHJcbiAgICAgICAgICAgIDogW11cclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBzdG9ja1ZhcmlhbnRzKCkge1xyXG4gICAgYXdhaXQgdGhpcy5odHRwXHJcbiAgICAgIC5nZXQ8W2FueV0+KGZsaXBwZXJVcmwgKyAnL2FwaS9zdG9jay12YXJpYW50JylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKG9yZGVycyA9PiB7XHJcbiAgICAgICAgaWYgKG9yZGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLnN0b2NrVmFyaWFudCA9IG9yZGVyc1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0b2NrVmFyaWFudCA9IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvYWRWYXJpYW50cyhwYXJhbSA9IG51bGwpIHtcclxuICAgIGxldCB2YXJpYW50c0FycmF5OiBhbnlbXSA9IFtdXHJcblxyXG4gICAgaWYgKHRoaXMuc3RvY2tWYXJpYW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5zdG9ja1ZhcmlhbnQuZm9yRWFjaCh2YXJpYW50ID0+IHtcclxuICAgICAgICBjb25zdCBmb3JtID0ge1xyXG4gICAgICAgICAgaWQ6IHZhcmlhbnQuaWQsXHJcbiAgICAgICAgICB2YXJpYW50SWQ6IHZhcmlhbnQudmFyaWFudElkLFxyXG4gICAgICAgICAgcHJpY2U6IHZhcmlhbnQucmV0YWlsUHJpY2UsXHJcbiAgICAgICAgICBza3U6IHZhcmlhbnQuc2t1ID8gdmFyaWFudC5za3UgOiAnMDAnLFxyXG4gICAgICAgICAgdmFyaWFudE5hbWU6IHZhcmlhbnQudmFyaWFudE5hbWUgPyB2YXJpYW50LnZhcmlhbnROYW1lIDogJ25vIGl0ZW0nLFxyXG4gICAgICAgICAgcHJvZHVjdE5hbWU6IHZhcmlhbnQucHJvZHVjdE5hbWUgPyB2YXJpYW50LnByb2R1Y3ROYW1lIDogJ25vIGl0ZW0nLFxyXG4gICAgICAgICAgdGF4TmFtZTogdmFyaWFudC50YXhOYW1lLFxyXG4gICAgICAgICAgdGF4UmF0ZTogdmFyaWFudC50YXhQZXJjZW50YWdlLFxyXG4gICAgICAgICAgdW5pdDogdmFyaWFudC51bml0LFxyXG4gICAgICAgICAgY3VycmVudFN0b2NrOiB2YXJpYW50LmN1cnJlbnRTdG9jayxcclxuICAgICAgICAgIGNhblRyYWNraW5nU3RvY2s6IHZhcmlhbnQuY2FuVHJhY2tpbmdTdG9jayxcclxuICAgICAgICAgIGxvd1N0b2NrOiB2YXJpYW50Lmxvd1N0b2NrLFxyXG4gICAgICAgICAgYnJhbmNoSWQ6IHZhcmlhbnQuYnJhbmNoSWQsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmb3JtLmN1cnJlbnRTdG9jayA+IDApIHtcclxuICAgICAgICAgIC8vIFRvZG86IG5pYmEgc3RvY2sgaXJpbW8ga29rbyB0aGlzIHNob3VsZCBiZSB0cnVlIGlmKGZvcm0uY2FuVHJhY2tpbmdTdG9jayAmJiBmb3JtLmN1cnJlbnRTdG9jayA+IDApe1xyXG4gICAgICAgICAgdmFyaWFudHNBcnJheS5wdXNoKGZvcm0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhcmlhbnRzQXJyYXlcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpV2FudFRvU2VhcmNoVmFyaWFudChldmVudCkge1xyXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50ICE9IHVuZGVmaW5lZCAmJiBldmVudCAhPSBudWxsKSB7XHJcbiAgICAgIGxldCByZXN1bHRzID0gdGhpcy5sb2FkVmFyaWFudHMoZXZlbnQpXHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubG9hZFZhcmlhbnRzKGV2ZW50KSlcclxuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMudGhlVmFyaWFudEZpbHRlcmVkID0gdGhpcy5maWx0ZXJCeVZhbHVlKHJlc3VsdHMsIGV2ZW50KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJCeVZhbHVlKGFycmF5T2ZPYmplY3Q6IGFueVtdLCB0ZXJtOiBhbnkpIHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gdGVybS50b1N0cmluZygpLnRvTG93ZXJDYXNlKClcclxuICAgIHJldHVybiBhcnJheU9mT2JqZWN0LmZpbHRlcigodiwgaSkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdi52YXJpYW50TmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeSkgPj0gMCB8fFxyXG4gICAgICAgIHYuc2t1Py50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpID49IDAgfHxcclxuICAgICAgICB2LnJldGFpbFByaWNlPy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpID49IDAgfHxcclxuICAgICAgICB2LnVuaXQ/LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSkgPj0gMCB8fFxyXG4gICAgICAgIHYudW5pdD8udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSA+PSAwIHx8XHJcbiAgICAgICAgdi5wcm9kdWN0TmFtZT8udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkpID49IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZU9yZGVyRGV0YWlscyhkZXRhaWxzOiB7IGFjdGlvbjogc3RyaW5nOyBpdGVtOiBPcmRlckRldGFpbHMgfSkge1xyXG4gICAgaWYgKGRldGFpbHMuYWN0aW9uID09PSAnREVMRVRFJykge1xyXG4gICAgICB0aGlzLmN1cnJlbnRPcmRlci5vcmRlckl0ZW1zID0gdGhpcy5jdXJyZW50T3JkZXIub3JkZXJJdGVtcy5maWx0ZXIoZWwgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbC5pZCAhPSBkZXRhaWxzLml0ZW0uaWRcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGV0YWlscy5hY3Rpb24gPT09ICdVUERBVEUnKSB7XHJcbiAgICAgIGRldGFpbHMuaXRlbS5wcmljZSA9IHBhcnNlRmxvYXQoZGV0YWlscy5pdGVtLnByaWNlKVxyXG5cclxuICAgICAgY29uc3QgdGF4UmF0ZSA9IGRldGFpbHMuaXRlbS50YXhSYXRlID8gZGV0YWlscy5pdGVtLnRheFJhdGUgOiAwXHJcbiAgICAgIGNvbnN0IHN1YlRvdGFsID0gZGV0YWlscy5pdGVtLnByaWNlICogZGV0YWlscy5pdGVtLnF1YW50aXR5XHJcblxyXG4gICAgICBkZXRhaWxzLml0ZW0udGF4QW1vdW50ID0gKHN1YlRvdGFsICogdGF4UmF0ZSkgLyAxMDBcclxuICAgICAgZGV0YWlscy5pdGVtLnN1YlRvdGFsID0gc3ViVG90YWxcclxuXHJcbiAgICAgIHRoaXMuY3VycmVudE9yZGVyLm9yZGVySXRlbXMgPSB0aGlzLmN1cnJlbnRPcmRlci5vcmRlckl0ZW1zLmZpbHRlcihlbCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsLmlkICE9IGRldGFpbHMuaXRlbS5pZFxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGhpcy5jdXJyZW50T3JkZXIub3JkZXJJdGVtcy5wdXNoKGRldGFpbHMuaXRlbSlcclxuICAgIH1cclxuICAgIGNvbnN0IG9yZGVyRGV0YWlsczogT3JkZXJEZXRhaWxzW10gPSB0aGlzLmN1cnJlbnRPcmRlci5vcmRlckl0ZW1zXHJcblxyXG4gICAgdGhpcy51cGRhdGVPcmRlcihvcmRlckRldGFpbHMpXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgdXBkYXRlT3JkZXIob3JkZXJEZXRhaWwpIHtcclxuICAgIGxldCBvcmRlckRldGFpbHMgPSBbXVxyXG4gICAgaWYgKG9yZGVyRGV0YWlsLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgIG9yZGVyRGV0YWlscyA9IHRoaXMuY3VycmVudE9yZGVyLm9yZGVySXRlbXMuZmlsdGVyKG9yZGVyID0+IG9yZGVyLm9yZGVySWQgPT0gdGhpcy5jdXJyZW50T3JkZXIuaWQpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcmRlckRldGFpbHMgPSBvcmRlckRldGFpbFxyXG4gICAgfVxyXG4gICAgaWYgKG9yZGVyRGV0YWlscy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IHN1YnRvdGFsID0gcGFyc2VGbG9hdCh0aGlzLnRvdGFsUGlwZS50cmFuc2Zvcm08T3JkZXJEZXRhaWxzPihvcmRlckRldGFpbHMsICdzdWJUb3RhbCcpKVxyXG4gICAgICBjb25zdCB0YXhBbW91bnQgPSBwYXJzZUZsb2F0KHRoaXMudG90YWxQaXBlLnRyYW5zZm9ybTxPcmRlckRldGFpbHM+KG9yZGVyRGV0YWlscywgJ3RheEFtb3VudCcpKVxyXG5cclxuICAgICAgdGhpcy5jdXJyZW50T3JkZXIuc3ViVG90YWwgPSBzdWJ0b3RhbFxyXG5cclxuICAgICAgdGhpcy5jdXJyZW50T3JkZXIudGF4QW1vdW50ID0gdGF4QW1vdW50XHJcbiAgICAgIHRoaXMuY3VycmVudE9yZGVyLnNhbGVUb3RhbCA9IHN1YnRvdGFsICsgdGF4QW1vdW50XHJcblxyXG4gICAgICB0aGlzLmN1cnJlbnRPcmRlci5jdXN0b21lckNoYW5nZUR1ZSA9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50T3JkZXIuY2FzaFJlY2VpdmVkID4gMFxyXG4gICAgICAgICAgPyBwYXJzZUZsb2F0KHRoaXMuY3VycmVudE9yZGVyLmNhc2hSZWNlaXZlZCkgLSB0aGlzLmN1cnJlbnRPcmRlci5zYWxlVG90YWxcclxuICAgICAgICAgIDogMC4wXHJcbiAgICAgIHRoaXMuY3VycmVudE9yZGVyLmN1c3RvbWVyQ2hhbmdlRHVlID0gcGFyc2VGbG9hdCh0aGlzLmN1cnJlbnRPcmRlci5jdXN0b21lckNoYW5nZUR1ZSlcclxuXHJcbiAgICAgIHRoaXMuY3VycmVudE9yZGVyID0gdGhpcy5jdXJyZW50T3JkZXJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBhZGRUb0NhcnQoZXZlbnQ6IE9yZGVyRGV0YWlscykge1xyXG4gICAgZXZlbnQuaWQgPSB0aGlzLmRhdGFiYXNlLnVpZCgpXHJcbiAgICBldmVudC5vcmRlcklkID0gdGhpcy5jdXJyZW50T3JkZXIuaWRcclxuXHJcbiAgICBjb25zdCB0YXhSYXRlID0gZXZlbnQudGF4UmF0ZSA/IGV2ZW50LnRheFJhdGUgOiAwXHJcbiAgICBjb25zdCBzdWJUb3RhbCA9IGV2ZW50LnByaWNlICogZXZlbnQucXVhbnRpdHlcclxuXHJcbiAgICBldmVudC50YXhBbW91bnQgPSAoc3ViVG90YWwgKiB0YXhSYXRlKSAvIDEwMFxyXG4gICAgZXZlbnQuc3ViVG90YWwgPSBzdWJUb3RhbFxyXG5cclxuICAgIHRoaXMuY3VycmVudE9yZGVyLm9yZGVySXRlbXMucHVzaChldmVudClcclxuICAgIGNvbnN0IG9yZGVyRGV0YWlsczogT3JkZXJEZXRhaWxzW10gPSB0aGlzLmN1cnJlbnRPcmRlci5vcmRlckl0ZW1zXHJcbiAgICBpZiAob3JkZXJEZXRhaWxzLmxlbmd0aCA+IDApIHtcclxuICAgICAgYXdhaXQgdGhpcy51cGRhdGVPcmRlcihvcmRlckRldGFpbHMpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBkaWRDb2xsZWN0Q2FzaChldmVudCkge1xyXG4gICAgdGhpcy5jb2xsZWN0Q2FzaENvbXBsZXRlZCA9IHsgaXNDb21wbGV0ZWQ6IGZhbHNlLCBjb2xsZWN0ZWRPcmRlcjogdGhpcy5jdXJyZW50T3JkZXIgfVxyXG4gICAgaWYgKGV2ZW50ID09PSB0cnVlKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuY3JlYXRlU3RvY2tIaXN0b3J5KClcclxuICAgICAgdGhpcy5jdXJyZW50T3JkZXIuaXNEcmFmdCA9IGZhbHNlXHJcbiAgICAgIHRoaXMuY3VycmVudE9yZGVyLnN0YXR1cyA9IFNUQVRVUy5DT01QTEVURVxyXG4gICAgICB0aGlzLmN1cnJlbnRPcmRlci5jcmVhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcclxuICAgICAgdGhpcy5jdXJyZW50T3JkZXIudXBkYXRlZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpXHJcbiAgICAgIHRoaXMuY3VycmVudE9yZGVyLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgIHRoaXMuY3VycmVudE9yZGVyWydkcmFmdCddID0gZmFsc2VcclxuICAgICAgdGhpcy5jdXJyZW50T3JkZXJbJ29yZGVySXRlbXMnXVxyXG4gICAgICBhd2FpdCB0aGlzLmh0dHBcclxuICAgICAgICAucHV0KGZsaXBwZXJVcmwgKyAnL2FwaS9vcmRlci8nICsgdGhpcy5jdXJyZW50T3JkZXIuaWQsIHRoaXMuY3VycmVudE9yZGVyKVxyXG4gICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgIC50aGVuKGFzeW5jIG9yZGVyID0+IHtcclxuICAgICAgICAgIHRoaXMuY29sbGVjdENhc2hDb21wbGV0ZWQgPSAgeyBpc0NvbXBsZXRlZDogdHJ1ZSwgY29sbGVjdGVkT3JkZXI6IG9yZGVyIH1cclxuICAgICAgICAgIHRoaXMuY3VycmVudE9yZGVyID0gbnVsbFxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5uZXdPcmRlcigpXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmhhc0RyYWZ0T3JkZXIoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBjcmVhdGVTdG9ja0hpc3RvcnkoKSB7XHJcbiAgICBjb25zdCBvZGV0YWlscyA9IHRoaXMuY3VycmVudE9yZGVyLm9yZGVySXRlbXMgYXMgYW55W11cclxuICAgIGlmIChvZGV0YWlscy5sZW5ndGgpIHtcclxuICAgICAgb2RldGFpbHMuZm9yRWFjaChhc3luYyBkZXRhaWxzID0+IHtcclxuICAgICAgICBpZiAoZGV0YWlscy5jdXJyZW50U3RvY2sgPiAwKSB7XHJcbiAgICAgICAgICBjb25zdCBzdG9ja0hpc3RvcmllczogU3RvY2tIaXN0b3J5ID0ge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5kYXRhYmFzZS51aWQoKSxcclxuICAgICAgICAgICAgb3JkZXJJZDogZGV0YWlscy5vcmRlcklkLFxyXG4gICAgICAgICAgICB2YXJpYW50SWQ6IGRldGFpbHMudmFyaWFudElkLFxyXG4gICAgICAgICAgICB2YXJpYW50TmFtZTogZGV0YWlscy52YXJpYW50TmFtZSxcclxuICAgICAgICAgICAgc3RvY2tJZDogZGV0YWlscy5pZCxcclxuICAgICAgICAgICAgcmVhc29uOiAnU29sZCcsXHJcbiAgICAgICAgICAgIHF1YW50aXR5OiBkZXRhaWxzLnF1YW50aXR5LFxyXG4gICAgICAgICAgICBpc0RyYWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgbm90ZTogJ0N1c3RvbWVyIHNhbGVzJyxcclxuICAgICAgICAgICAgdGFibGU6ICdzdG9ja0hpc3RvcmllcycsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICAgICAgY2hhbm5lbHM6IFt0aGlzLmRlZmF1bHRCdXNpbmVzcyQudXNlcklkXSxcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGF3YWl0IHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAucG9zdDxTdG9ja0hpc3Rvcnk+KGZsaXBwZXJVcmwgKyAnL2FwaS9zdG9jay1oaXN0b3JpZXMnLCBzdG9ja0hpc3RvcmllcylcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC50aGVuKClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBzYXZlT3JkZXJVcGRhdGVkKGV2ZW50OiBhbnkpIHtcclxuICAgIGF3YWl0IHRoaXMudXBkYXRlT3JkZXIoW10pXHJcbiAgfVxyXG59XHJcbiJdfQ==