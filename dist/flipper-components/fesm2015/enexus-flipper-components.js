import { Directive, TemplateRef, ViewContainerRef, Input, Component, HostBinding, ɵɵdefineInjectable, Pipe, Injectable, ElementRef, HostListener, NgModule, EventEmitter, ɵɵinject, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from '@enexus/flipper-vendors';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators';
import { trigger, transition, style, animate, animation } from '@angular/animations';
import { ColorToFillClassPipe, ColorModule } from '@enexus/flipper-color';
import { FlipperEventModule, BusEvent, FlipperEventBusService } from '@enexus/flipper-event';
import { DialogModule } from '@enexus/flipper-dialog';
import { map, find } from 'lodash';
import { Subject } from 'rxjs';
import { NgxBarcodeModule } from 'ngx-barcode';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { __awaiter } from 'tslib';
import PouchDB from 'pouchdb/dist/pouchdb';
import debugPouch from 'pouchdb-debug';
import { v1 } from 'uuid';
import { filter as filter$1 } from 'rxjs/operators';

class LazyIfDirective {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.loaded = false;
    }
    set libLazyIf(condition) {
        if (condition && !this.loaded) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.loaded = true;
        }
    }
}
LazyIfDirective.decorators = [
    { type: Directive, args: [{
                selector: '[flipperLibLazyIf]',
            },] }
];
LazyIfDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
LazyIfDirective.propDecorators = {
    libLazyIf: [{ type: Input }]
};

class RouterProgressComponent {
    constructor(router) {
        this.document = document;
        this.loading = false;
        router.events
            .pipe(filter(event => {
            return event instanceof NavigationStart;
        }))
            .subscribe(() => {
            this.loading = true;
        });
        router.events
            .pipe(filter(event => {
            return event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError;
        }))
            .subscribe(() => {
            this.loading = false;
            // Remove loading background if any on application start
            const background = this.document.getElementById('background-logo');
            if (background) {
                background.setAttribute('class', 'fade-out');
                setTimeout(() => {
                    background.outerHTML = '';
                }, 200);
            }
        });
    }
}
RouterProgressComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-router-progress',
                template: "<mat-progress-bar *ngIf=\"loading\" [@myAnimation] mode=\"indeterminate\"></mat-progress-bar>\r\n",
                animations: [
                    trigger('myAnimation', [
                        transition(':enter', [style({ top: '0px', opacity: 1 })]),
                        transition(':leave', [style({ top: '0px', opacity: 1 }), animate('500ms', style({ top: '-5px', opacity: 0 }))]),
                    ]),
                ],
                styles: [":host{left:0;position:fixed;right:0;top:0;z-index:9999}"]
            },] }
];
RouterProgressComponent.ctorParameters = () => [
    { type: Router }
];

class HeaderComponent {
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-header',
                template: "<header>\r\n  <nav class=\"banner\" role=\"navigation\">\r\n    <div class=\"content\">\r\n      <div class=\"column column-fill flex-align-left\"></div>\r\n      <div class=\"column flex-align-center\">\r\n        <a  role=\"button\" data-ember-action=\"\" data-ember-action-467=\"467\">\r\n          <img alt=\"image\" [src]=\"'./assets/icons/icon.png'\" style=\"width:40px;height: 40px;\">\r\n        </a>\r\n      </div>\r\n      <div class=\"column column-fill flex-align-right\"></div>\r\n    </div>\r\n  </nav>\r\n</header>\r\n",
                styles: ["@media (min-width:718px){.banner{height:73px}}.banner{background-color:#211a36;color:#fff!important;height:62px;overflow:hidden}.banner .content{align-items:center;display:flex;height:100%;justify-content:space-between;padding:10px}@media (min-width:1024px){.content{width:868px}}@media (min-width:718px){.content{width:680px}}@media (min-width:480px){.content{width:424px}}@media (min-width:374px){.content{width:324px}}.content{margin-left:auto;margin-right:auto;width:276px}"]
            },] }
];

class TableOverlayComponent {
    ngOnInit() {
        this.noDataLabel = this.noDataLabel || 'No data';
    }
}
TableOverlayComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-table-overlay',
                template: "<div class=\"container\">\r\n  <div class=\"loading-shade\"\r\n       *ngIf=\"loading\">\r\n    <flipper-spinner *ngIf=\"loading\" [size]=\"48\"></flipper-spinner>\r\n  </div>\r\n\r\n  <div class=\"no-data-shade\" *ngIf=\"!loading && (!dataSource || dataSource.data.length === 0)\">\r\n    <flipper-message icon=\"empty.svg\" [title]=\"title\" [message]=\"noDataLabel\">\r\n    </flipper-message>\r\n  </div>\r\n\r\n  <ng-content></ng-content>\r\n\r\n</div>\r\n",
                styles: [".container{position:relative}.loading-shade,.no-data-shade{align-items:flex-start;bottom:0;display:flex;justify-content:center;left:0;min-height:100px;position:absolute;right:0;text-align:center;top:44px;z-index:1000000000}"]
            },] }
];
TableOverlayComponent.propDecorators = {
    loading: [{ type: Input }],
    dataSource: [{ type: Input }],
    noDataLabel: [{ type: Input }],
    title: [{ type: Input }]
};

class SpinnerComponent {
    constructor(toFill) {
        this.toFill = toFill;
        this.color = 'primary';
        this.size = 24;
    }
    get hostClass() {
        return this.toFill.transform(this.color);
    }
    ngOnInit() { }
}
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-spinner',
                template: "<svg version=\"1.1\" id=\"Calque_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 70 70\" [style.width.px]=\"size\" [style.height.px]=\"size\" xml:space=\"preserve\">\r\n  <rect x=\"30\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"40\" width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"50\" y=\"10\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"60\" y=\"20\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"60\" y=\"30\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"60\" y=\"40\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"50\" y=\"50\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"40\" y=\"60\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"30\" y=\"60\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"20\" y=\"60\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"10\" y=\"50\"  width=\"10\" height=\"10\"></rect>\r\n  <rect y=\"40\"  width=\"10\" height=\"10\"></rect>\r\n  <rect y=\"30\"  width=\"10\" height=\"10\"></rect>\r\n  <rect y=\"20\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"10\" y=\"10\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"20\"  width=\"10\" height=\"10\"></rect>\r\n</svg>\r\n",
                styles: ["rect{animation-duration:1s;animation-iteration-count:infinite;animation-name:spinner}rect:first-child{animation-delay:.0625s;visibility:hidden}rect:nth-child(2){animation-delay:.125s;visibility:hidden}rect:nth-child(3){animation-delay:.1875s;visibility:hidden}rect:nth-child(4){animation-delay:.25s;visibility:hidden}rect:nth-child(5){animation-delay:.3125s;visibility:hidden}rect:nth-child(6){animation-delay:.375s;visibility:hidden}rect:nth-child(7){animation-delay:.4375s;visibility:hidden}rect:nth-child(8){animation-delay:.5s;visibility:hidden}rect:nth-child(9){animation-delay:.5625s;visibility:hidden}rect:nth-child(10){animation-delay:.625s;visibility:hidden}rect:nth-child(11){animation-delay:.6875s;visibility:hidden}rect:nth-child(12){animation-delay:.75s;visibility:hidden}rect:nth-child(13){animation-delay:.8125s;visibility:hidden}rect:nth-child(14){animation-delay:.875s;visibility:hidden}rect:nth-child(15){animation-delay:.9375s;visibility:hidden}rect:nth-child(16){animation-delay:1s;visibility:hidden}@keyframes spinner{0%{visibility:visible}40%{visibility:visible}70%{visibility:hidden}to{visibility:hidden}}"]
            },] }
];
SpinnerComponent.ctorParameters = () => [
    { type: ColorToFillClassPipe }
];
SpinnerComponent.propDecorators = {
    color: [{ type: Input }],
    size: [{ type: Input }],
    hostClass: [{ type: HostBinding, args: ['class',] }]
};

class MessageComponent {
    constructor() {
        this.icon = 'search.svg';
        this.title = '';
        this.message = '';
    }
}
MessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-message',
                template: "<div class=\"message\">\r\n\r\n  <div class=\"grid-2-at-medium grid-row-space-line\">\r\n    <div class=\"col\">\r\n      <span class=\"message-icon\">\r\n        <img [src]=\"'./assets/icons/'+icon\" class=\"icon\">\r\n      </span>\r\n    </div>\r\n    <div class=\"col\">\r\n      <span class=\"message-title\">\r\n        {{title}}\r\n      </span>\r\n      <div class=\"message-desc mt-4\">\r\n        {{message}}\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n</div>\r\n",
                styles: [".message-icon{display:block;text-align:center}.message-icon .icon{height:104px;object-fit:contain;width:104px}.message-title{font-size:50px;letter-spacing:-1.17px}.message-desc,.message-title{color:#1b2125;display:block;font-family:Roboto;font-stretch:normal;font-style:normal;font-weight:400;height:auto;line-height:normal;position:relative;text-align:center;width:auto}.message-desc{font-size:16px;letter-spacing:-.37px}"]
            },] }
];
MessageComponent.propDecorators = {
    icon: [{ type: Input }],
    title: [{ type: Input }],
    message: [{ type: Input }]
};

class RoundNumberPipe {
    transform(nums, decimals = 2) {
        let newString; // The new rounded number
        decimals = Number(decimals);
        if (decimals < 1) {
            newString = Math.round(nums).toString();
        }
        else {
            let numString = nums.toString();
            if (numString.lastIndexOf('.') === -1) {
                // If there is no decimal point
                numString += '.'; // give it one at the end
            }
            let cutoff = numString.lastIndexOf('.') + decimals; // The point at which to truncate the number
            let d1 = Number(numString.substring(cutoff, cutoff + 1)); // The value of the last decimal place that we'll end up with
            const d2 = Number(numString.substring(cutoff + 1, cutoff + 2)); // The next decimal, after the last one we want
            if (d2 >= 5) {
                // Do we need to round up at all? If not, the string will just be truncated
                if (d1 === 9 && cutoff > 0) {
                    // If the last digit is 9, find a new cutoff point
                    while (cutoff > 0 && (d1 === 9 || isNaN(d1))) {
                        if (String(d1) !== '.') {
                            cutoff -= 1;
                            d1 = Number(numString.substring(cutoff, cutoff + 1));
                        }
                        else {
                            cutoff -= 1;
                        }
                    }
                }
                d1 += 1;
            }
            if (d1 === 10) {
                numString = numString.substring(0, numString.lastIndexOf('.'));
                const roundedNum = Number(numString) + 1;
                newString = roundedNum.toString() + '.';
            }
            else {
                newString = numString.substring(0, cutoff) + d1.toString();
            }
        }
        if (decimals > 0) {
            if (newString.lastIndexOf('.') === -1) {
                // Do this again, to the new string
                newString += '.';
            }
            const decs = newString.substring(newString.lastIndexOf('.') + 1).length;
            for (let i = 0; i < decimals - decs; i++) {
                newString += '0';
            }
        }
        // var newNumber = Number(newString);// make it a number if you like
        return this.formatNumbers(newString); // Output the result to the form field (change for your purposes)
    }
    formatNumbers(nums) {
        return nums.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}
RoundNumberPipe.ɵprov = ɵɵdefineInjectable({ factory: function RoundNumberPipe_Factory() { return new RoundNumberPipe(); }, token: RoundNumberPipe, providedIn: "root" });
RoundNumberPipe.decorators = [
    { type: Pipe, args: [{
                name: 'roundNumber',
            },] },
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

class CalculateTotalClassPipe {
    transform(arrayOfdData, prop) {
        let total = 0.0;
        if (arrayOfdData.length > 0) {
            for (let i = 0, len = arrayOfdData.length; i < len; i++) {
                total += parseFloat(arrayOfdData[i][prop]);
            }
        }
        return total;
    }
}
CalculateTotalClassPipe.ɵprov = ɵɵdefineInjectable({ factory: function CalculateTotalClassPipe_Factory() { return new CalculateTotalClassPipe(); }, token: CalculateTotalClassPipe, providedIn: "root" });
CalculateTotalClassPipe.decorators = [
    { type: Pipe, args: [{
                name: 'calculateTotalClass',
                pure: true,
            },] },
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

class MatchHeightDirective {
    constructor(el) {
        this.el = el;
    }
    onResize() {
        // call our matchHeight function here
        this.matchHeight(this.el.nativeElement, this.myMatchHeight);
    }
    ngAfterViewChecked() {
        // call our matchHeight function here later
        this.matchHeight(this.el.nativeElement, this.myMatchHeight);
    }
    matchHeight(parent, className) {
        // match height logic here
        if (!parent) {
            return;
        }
        // step 1: find all the child elements with the selected class name
        const children = parent.getElementsByClassName(className);
        if (!children) {
            return;
        }
        // step 2a: get all the child elements heights
        const itemHeights = Array.from(children).map(x => x.getBoundingClientRect().height);
        // step 2b: find out the tallest
        const maxHeight = itemHeights.reduce((prev, curr) => {
            return curr > prev ? curr : prev;
        }, 0);
        // step 3: update all the child elements to the tallest height
        Array.from(children).forEach((x) => (x.style.height = `${maxHeight}px`));
    }
}
MatchHeightDirective.decorators = [
    { type: Directive, args: [{
                selector: '[flipperMyMatchHeight]',
            },] }
];
MatchHeightDirective.ctorParameters = () => [
    { type: ElementRef }
];
MatchHeightDirective.propDecorators = {
    myMatchHeight: [{ type: Input }],
    onResize: [{ type: HostListener, args: ['window:resize',] }]
};

class MergeArryByIdPipe {
    transform(originArrayData, mergeArrayData) {
        return this.mergeById(originArrayData).with(mergeArrayData);
    }
    mergeById(arr) {
        return {
            with(arr2) {
                return map(arr, item => {
                    return find(arr2, obj => obj.id === item.id) || item;
                });
            },
        };
    }
}
MergeArryByIdPipe.ɵprov = ɵɵdefineInjectable({ factory: function MergeArryByIdPipe_Factory() { return new MergeArryByIdPipe(); }, token: MergeArryByIdPipe, providedIn: "root" });
MergeArryByIdPipe.decorators = [
    { type: Pipe, args: [{
                name: 'mergeArryById',
            },] },
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

class ArrayRemoveItemPipe {
    transform(arrayOfData, value) {
        return this.arrayRemove(arrayOfData, value);
    }
    arrayRemove(arr = [], objectToRemove) {
        if (arr.length > 0) {
            return arr.filter(ele => {
                return JSON.stringify(ele) !== JSON.stringify(objectToRemove);
            });
        }
        else {
            return arr;
        }
    }
}
ArrayRemoveItemPipe.ɵprov = ɵɵdefineInjectable({ factory: function ArrayRemoveItemPipe_Factory() { return new ArrayRemoveItemPipe(); }, token: ArrayRemoveItemPipe, providedIn: "root" });
ArrayRemoveItemPipe.decorators = [
    { type: Pipe, args: [{
                name: 'arrayRemoveItem',
            },] },
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

class FindKeyPipe {
    transform(numKeys, key) {
        return numKeys.find(k => k === key) ? true : false;
    }
}
FindKeyPipe.ɵprov = ɵɵdefineInjectable({ factory: function FindKeyPipe_Factory() { return new FindKeyPipe(); }, token: FindKeyPipe, providedIn: "root" });
FindKeyPipe.decorators = [
    { type: Pipe, args: [{
                name: 'findKey',
                pure: true,
            },] },
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

class Notification {
    constructor(id, type, title, message, timeout) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.message = message;
        this.timeout = timeout;
    }
}
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["success"] = 0] = "success";
    NotificationType[NotificationType["warning"] = 1] = "warning";
    NotificationType[NotificationType["error"] = 2] = "error";
    NotificationType[NotificationType["info"] = 3] = "info";
})(NotificationType || (NotificationType = {}));

class NotificationService {
    constructor() {
        this.subject = new Subject();
        this.idx = 0;
    }
    getObservable() {
        return this.subject.asObservable();
    }
    info(title, message, timeout = 3000) {
        this.subject.next(new Notification(this.idx++, NotificationType.info, title, message, timeout));
    }
    success(title, message, timeout = 3000) {
        this.subject.next(new Notification(this.idx++, NotificationType.success, title, message, timeout));
    }
    warning(title, message, timeout = 3000) {
        this.subject.next(new Notification(this.idx++, NotificationType.warning, title, message, timeout));
    }
    error(title, message, timeout = 0) {
        this.subject.next(new Notification(this.idx++, NotificationType.error, title, message, timeout));
    }
}
NotificationService.ɵprov = ɵɵdefineInjectable({ factory: function NotificationService_Factory() { return new NotificationService(); }, token: NotificationService, providedIn: "root" });
NotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
NotificationService.ctorParameters = () => [];

class NotificationListComponent {
    constructor(notificationSvc) {
        this.notificationSvc = notificationSvc;
        this.notifications = [];
    }
    addNotification(notification) {
        this.notifications.push(notification);
        if (notification.timeout !== 0) {
            setTimeout(() => this.close(notification), notification.timeout);
        }
    }
    ngOnInit() {
        this.subscription = this.notificationSvc
            .getObservable()
            .subscribe(notification => this.addNotification(notification));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    close(notification) {
        this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
    }
    className(notification) {
        let style;
        switch (notification.type) {
            case NotificationType.success:
                style = 'success';
                break;
            case NotificationType.warning:
                style = 'warning';
                break;
            case NotificationType.error:
                style = 'error';
                break;
            default:
                style = 'info';
                break;
        }
        return style;
    }
}
NotificationListComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-notification',
                template: "<div class=\"notifications\">\r\n\t<div *ngFor=\"let notification of notifications\" class=\"notification\" [ngClass]=\"className(notification)\">\r\n\t\t<ng-container *ngTemplateOutlet=\"notificationTpl;context:{notification:notification}\"></ng-container>\r\n\t</div>\r\n</div>\r\n\r\n<ng-template #notificationTpl let-notification=\"notification\">\r\n\r\n\t<div class=\"title\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n\t\t<div>{{notification.title}}</div>\r\n\t\t<button mat-icon-button \r\n            (click)=\"close(notification)\"\r\n            matTooltip=\"Close the notification\"\r\n            matTooltipPosition=\"before\">\r\n        <mat-icon><img [src]=\"'./assets/icons/arrow-up-right.svg'\" class=\"icon-arrow\"></mat-icon>\r\n      </button>\r\n\t</div>\r\n\r\n\t<div class=\"message\">{{notification.message}}</div>\r\n\r\n</ng-template>\r\n",
                styles: [".notifications{max-width:400px;min-width:400px;position:fixed;right:0;top:0;z-index:1000}.notifications .notification{border-radius:5px;color:#fff;margin:5px;overflow:hidden}.notifications .notification .title{background:rgba(0,0,0,.6);font-weight:700;padding-left:10px}.notifications .notification .message{background:rgba(0,0,0,.4);max-height:200px;overflow-y:auto;padding:10px}.notifications .notification.info{background-color:hsla(0,0%,74.1%,.9)}.notifications .notification.success{background-color:rgba(27,158,119,.9)}.notifications .notification.warning{background-color:rgba(217,95,2,.9)}.notifications .notification.error{background-color:rgba(246,71,71,.9)}"]
            },] }
];
NotificationListComponent.ctorParameters = () => [
    { type: NotificationService }
];

class GenerateBarcodeComponent {
    constructor() {
        this.labels = [];
        this.showName = true;
        this.showSku = true;
    }
}
GenerateBarcodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-generate-barcode',
                template: "\r\n<div class=\"row\" *ngIf=\"labels && labels.length > 0\">\r\n    <div class=\"col m-3\"  *ngFor=\"let label of labels\">\r\n        <span *ngIf=\"showName\" class=\"name\">{{label.name}}</span>\r\n        <ngx-barcode [bc-value]=\"label.sku\" [bc-display-value]=\"showSku\"></ngx-barcode>\r\n    </div>\r\n</div>\r\n\r\n",
                styles: [".name{font-size:.8em}label{color:#999;display:block;margin-bottom:.5em;margin-top:2em}.col{float:left;padding:10px;text-align:center}.row{margin:3px}.row:after{clear:both;content:\"\";display:table}@media screen and (max-width:600px){.col{display:block;width:100%}}"]
            },] }
];
GenerateBarcodeComponent.propDecorators = {
    labels: [{ type: Input }],
    showName: [{ type: Input }],
    showSku: [{ type: Input }]
};

class LoadingIconComponent {
}
LoadingIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-loading-icon',
                template: "<ng-container *ngIf=\"!loading\"><ng-content></ng-content></ng-container>\r\n<div *ngIf=\"loading\" class=\"loading-spinner\">\r\n  <flipper-spinner [size]=\"24\" [color]=\"'accent'\"></flipper-spinner>\r\n</div>\r\n<!-- comment -->\r\n",
                styles: [".mat-button .loading-spinner{display:inline-block}.mat-icon-button .loading-spinner{display:block;margin-top:4px}"]
            },] }
];
LoadingIconComponent.propDecorators = {
    loading: [{ type: Input }]
};

class FlipperComponentsModule {
}
FlipperComponentsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    HttpClientModule,
                    CommonModule,
                    VendorsModule,
                    ColorModule,
                    FlipperEventModule,
                    DialogModule,
                    NgxBarcodeModule,
                ],
                declarations: [
                    LoadingIconComponent,
                    NotificationListComponent,
                    RouterProgressComponent,
                    HeaderComponent,
                    TableOverlayComponent,
                    SpinnerComponent,
                    MessageComponent,
                    LazyIfDirective,
                    RoundNumberPipe,
                    CalculateTotalClassPipe,
                    MatchHeightDirective,
                    MergeArryByIdPipe,
                    ArrayRemoveItemPipe,
                    FindKeyPipe,
                    GenerateBarcodeComponent,
                ],
                exports: [
                    LoadingIconComponent,
                    RouterProgressComponent,
                    NotificationListComponent,
                    HeaderComponent,
                    TableOverlayComponent,
                    SpinnerComponent,
                    MessageComponent,
                    LazyIfDirective,
                    RoundNumberPipe,
                    CalculateTotalClassPipe,
                    MergeArryByIdPipe,
                    ArrayRemoveItemPipe,
                    MatchHeightDirective,
                    FindKeyPipe,
                    GenerateBarcodeComponent,
                ],
                entryComponents: [],
                providers: [
                    NotificationService,
                    RoundNumberPipe,
                    CalculateTotalClassPipe,
                    MergeArryByIdPipe,
                    ArrayRemoveItemPipe,
                    FindKeyPipe,
                ],
            },] }
];

class Business {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class MenuEntries {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Menu {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class User {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class DashBoardEntries {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}
class Total {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}
class Items {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Branch {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Price {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Product {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class PriceVariant {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class OrderDetails {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class StockHistory {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

var STATUS;
(function (STATUS) {
    STATUS["COMPLETE"] = "complete";
    STATUS["SENT"] = "sent";
    STATUS["RECEIVED"] = "received";
    STATUS["OPEN"] = "open";
    STATUS["VOID"] = "void";
    STATUS["HELD"] = "held";
    STATUS["OVERDUE"] = "overdue";
})(STATUS || (STATUS = {}));

var ORDERTYPE;
(function (ORDERTYPE) {
    ORDERTYPE["PURCHASE"] = "purchase";
    ORDERTYPE["SALES"] = "sales";
    ORDERTYPE["RETURN"] = "return";
    ORDERTYPE["TRANSFER"] = "transfer";
})(ORDERTYPE || (ORDERTYPE = {}));

class Order {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Variant {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Types {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class BusinessCategory {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class UserBusiness {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Taxes {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Reason {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class BranchProducts {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Stock {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Labels {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class Subscription {
    constructor(params = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}

class CHANNELS {
}
CHANNELS.ORDER = 'orders';
CHANNELS.PRODUCTS = 'products';
CHANNELS.PRICES = 'prices';
CHANNELS.PRICEVARIANTS = 'priceVariants';
CHANNELS.SHOPPINGS = 'shoppings';
CHANNELS.VARIANTS = 'variants';

class OrderEvent extends BusEvent {
    constructor(order) {
        super(OrderEvent.CHANNEL);
        this.order = order;
    }
}
OrderEvent.CHANNEL = CHANNELS.ORDER;

class PriceEvent extends BusEvent {
    constructor(price) {
        super(PriceEvent.CHANNEL);
        this.price = price;
    }
}
PriceEvent.CHANNEL = CHANNELS.PRICES;

class PriceVariantEvent extends BusEvent {
    constructor(priceVariant) {
        super(PriceVariantEvent.CHANNEL);
        this.priceVariant = priceVariant;
    }
}
PriceVariantEvent.CHANNEL = CHANNELS.PRICEVARIANTS;

class ProductEvent extends BusEvent {
    constructor(product) {
        super(ProductEvent.CHANNEL);
        this.product = product;
    }
}
ProductEvent.CHANNEL = CHANNELS.PRODUCTS;

class ShoppingEvent extends BusEvent {
    constructor(shopping) {
        super(ShoppingEvent.CHANNEL);
        this.shopping = shopping;
    }
}
ShoppingEvent.CHANNEL = CHANNELS.SHOPPINGS;

class VariantEvent extends BusEvent {
    constructor(variant) {
        super(VariantEvent.CHANNEL);
        this.variant = variant;
    }
}
VariantEvent.CHANNEL = CHANNELS.VARIANTS;

class VariantsEvent extends BusEvent {
    constructor(variants) {
        super(VariantsEvent.CHANNEL);
        this.variants = variants;
    }
}
VariantsEvent.CHANNEL = 'variants';

class BranchProductsEvent extends BusEvent {
    constructor(branchProducts) {
        super(BranchProductsEvent.CHANNEL);
        this.branchProducts = branchProducts;
    }
}
BranchProductsEvent.CHANNEL = 'branchProducts';

class ErrorMessageEvent extends BusEvent {
    constructor(errorMessage) {
        super(ErrorMessageEvent.CHANNEL);
        this.errorMessage = errorMessage;
    }
}
ErrorMessageEvent.CHANNEL = 'errorMessage';

class ProductsEvent extends BusEvent {
    constructor(products) {
        super(ProductsEvent.CHANNEL);
        this.products = products;
    }
}
ProductsEvent.CHANNEL = 'products';

class StocksEvent extends BusEvent {
    constructor(stocks) {
        super(StocksEvent.CHANNEL);
        this.stocks = stocks;
    }
}
StocksEvent.CHANNEL = 'stocks';

class CurrentBranchEvent extends BusEvent {
    constructor(branch, action = 'add') {
        super(CurrentBranchEvent.CHANNEL);
        this.branch = branch;
        this.action = action;
    }
}
CurrentBranchEvent.CHANNEL = 'current-branch';

class CurrentBusinessEvent extends BusEvent {
    constructor(business, action = 'add') {
        super(CurrentBusinessEvent.CHANNEL);
        this.business = business;
        this.action = action;
    }
}
CurrentBusinessEvent.CHANNEL = 'current-business';

class UserLoggedEvent extends BusEvent {
    constructor(user) {
        super(UserLoggedEvent.CHANNEL);
        this.user = user;
    }
}
UserLoggedEvent.CHANNEL = 'current-user';

class UserSubscriptionEvent extends BusEvent {
    constructor(subscription) {
        super(UserSubscriptionEvent.CHANNEL);
        this.subscription = subscription;
    }
}
UserSubscriptionEvent.CHANNEL = 'user-subscription';

class BusinessesEvent extends BusEvent {
    constructor(businesses) {
        super(BusinessesEvent.CHANNEL);
        this.businesses = businesses;
    }
}
BusinessesEvent.CHANNEL = 'businesses';

class DraftProductEvent extends BusEvent {
    constructor(draftProduct, action = 'add') {
        super(DraftProductEvent.CHANNEL);
        this.draftProduct = draftProduct;
        this.action = action;
    }
}
DraftProductEvent.CHANNEL = 'draftProduct';

class DraftStockHistoryEvent extends BusEvent {
    constructor(draftStockHistory, action = 'add') {
        super(DraftStockHistoryEvent.CHANNEL);
        this.draftStockHistory = draftStockHistory;
        this.action = action;
    }
}
DraftStockHistoryEvent.CHANNEL = 'draftStockHistory';

class DraftStocksEvent extends BusEvent {
    constructor(draftStocks, action = 'add') {
        super(DraftStocksEvent.CHANNEL);
        this.draftStocks = draftStocks;
        this.action = action;
    }
}
DraftStocksEvent.CHANNEL = 'draftStocks';

class DraftVariantsEvent extends BusEvent {
    constructor(draftVariants, action = 'add') {
        super(DraftVariantsEvent.CHANNEL);
        this.draftVariants = draftVariants;
        this.action = action;
    }
}
DraftVariantsEvent.CHANNEL = 'draftVariants';

class DefaultTaxesEvent extends BusEvent {
    constructor(defaultTax, action = 'add') {
        super(DefaultTaxesEvent.CHANNEL);
        this.defaultTax = defaultTax;
        this.action = action;
    }
}
DefaultTaxesEvent.CHANNEL = 'defaultTax';

class TaxesEvent extends BusEvent {
    constructor(taxes, action = 'add') {
        super(TaxesEvent.CHANNEL);
        this.taxes = taxes;
        this.action = action;
    }
}
TaxesEvent.CHANNEL = 'taxes';

class BranchesEvent extends BusEvent {
    constructor(branches) {
        super(BranchesEvent.CHANNEL);
        this.branches = branches;
    }
}
BranchesEvent.CHANNEL = 'branches';

class CurrentStockEvent extends BusEvent {
    constructor(currentStock, action = 'add') {
        super(CurrentStockEvent.CHANNEL);
        this.currentStock = currentStock;
        this.action = action;
    }
}
CurrentStockEvent.CHANNEL = 'currentStock';

class AnyEvent extends BusEvent {
    constructor(any_event) {
        super(AnyEvent.CHANNEL);
        this.any_event = any_event;
    }
}
AnyEvent.CHANNEL = 'any-event';

const fadeInScaleUpAnimation = animation([
    style({ opacity: 0, transform: 'scale(0.5)' }),
    animate('{{ duration }} ease-in-out', style({ opacity: 1, transform: 'scale(1)' })),
]);
const fadeInAnimation = animation([
    style({ opacity: 0 }),
    animate('{{ duration }} ease-in-out', style({ opacity: 1 })),
]);
const fadeOutAnimation = animation([
    style({ opacity: 1 }),
    animate('{{ duration }} ease-in-out', style({ opacity: 0 })),
]);

class SettingsService {
    constructor() { }
    countries() {
        return Object.values(this.httpGet('assets/lists/countries.json'));
    }
    currencies() {
        return Object.values(this.httpGet('assets/lists/currencies.json'));
    }
    timezones() {
        return Object.values(this.httpGet('assets/lists/timezones.json'));
    }
    units() {
        return Object.values(this.httpGet('assets/lists/units.json'));
    }
    reasons() {
        return Object.values(this.httpGet('assets/lists/reasons.json'));
    }
    httpGet(theUrl) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return JSON.parse(xmlHttp.responseText);
    }
}
SettingsService.ɵprov = ɵɵdefineInjectable({ factory: function SettingsService_Factory() { return new SettingsService(); }, token: SettingsService, providedIn: "root" });
SettingsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
SettingsService.ctorParameters = () => [];

const flipperUrl = 'http://localhost:8082';

class Response {
}
class PouchDBService {
    constructor(http, eventBus) {
        this.http = http;
        this.eventBus = eventBus;
        this.isInstantiated = false;
        this.listener = new EventEmitter();
        this.listenerLogin = new EventEmitter();
        // PouchDB.plugin(PouchFind);
        PouchDB.plugin(require('pouchdb-find').default);
        this.connect('main');
        debugPouch(PouchDB);
        this.sync([localStorage.getItem('userId')]); //we keep the current logged userId in local storage for quick access
    }
    activeUser(table = 'users') {
        return this.database
            .createIndex({
            index: { fields: ['table', 'active'] },
        })
            .then(() => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    active: { $eq: true },
                },
            });
        });
    }
    query(fields = [], selector = {}) {
        return this.database
            .createIndex({
            index: { fields: fields },
        })
            .then(() => {
            return this.database.find({
                selector: selector,
            });
        });
    }
    fastQuery(fields = [], selector = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create the Index
                var result = yield this.database.createIndex({
                    index: { fields: fields },
                });
                // Query the Index using find().
                result = yield this.database.find({
                    selector: selector,
                });
                // Found docs are in result.docs
                return yield result.docs;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    callbackQuery(fields = [], selector = {}, callback) {
        return this.database.find({
            selector: selector,
            fields: fields,
        }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            // handle result
            return callback(result);
        });
    }
    activeBusiness(userId, table = 'businesses') {
        // comment
        return this.database
            .createIndex({
            index: { fields: ['table', 'active', 'userId'] },
        })
            .then(() => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    active: { $eq: true },
                    userId: { $eq: userId },
                },
            });
        });
    }
    hasDraftProduct(businessId, table = 'products') {
        // comment
        return this.database
            .createIndex({
            index: { fields: ['table', 'isDraft', 'businessId'] },
        })
            .then(() => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    isDraft: { $eq: true },
                    businessId: { $eq: businessId },
                },
            });
        });
    }
    currentBusiness() {
        return this.activeUser().then((user) => {
            if (user && user.docs.length > 0) {
                return this.activeBusiness(user.docs[0].id, 'businesses').then((business) => {
                    if (business && business.docs.length > 0) {
                        return business.docs[0];
                    }
                });
            }
        });
    }
    currentTax() {
        // TODO: migrate this
        return this.activeUser().then((user) => {
            if (user && user.docs.length > 0) {
                return this.activeBusiness(user.docs[0].id, 'businesses').then((business) => {
                    if (business && business.docs.length > 0) {
                        return this.database
                            .query(['table', 'businessId', 'isDefault'], {
                            table: { $eq: 'taxes' },
                            businessId: { $eq: business.docs[0].id },
                            isDefault: { $eq: true },
                        })
                            .then((res) => {
                            if (res.docs && res.docs.length > 0) {
                                return res.docs[0];
                            }
                            else {
                                return [];
                            }
                        });
                    }
                    else {
                        return null;
                    }
                });
            }
        });
    }
    listBusinessBranches() {
        return __awaiter(this, void 0, void 0, function* () {
            // I put any on the first promise as my intention is to return a list of branches not businesses
            return yield this.http
                .get(flipperUrl + '/api/business')
                .toPromise()
                .then((business) => __awaiter(this, void 0, void 0, function* () {
                if (business) {
                    return yield this.http
                        .get(flipperUrl + '/api/branches/' + business.id)
                        .toPromise()
                        .then(branches => {
                        return branches;
                    });
                }
            }));
            // return this.currentBusiness().then((business: { id: any }) => {
            //   if (business) {
            //     return this.query(['table', 'businessId'], {
            //       table: { $eq: 'branches' },
            //       businessId: { $eq: business.id },
            //     }).then((res: { docs: string | any[] }) => {
            //       if (res.docs && res.docs.length > 0) {
            //         return res.docs
            //       } else {
            //         return []
            //       }
            //     })
            //   } else {
            //     return []
            //   }
            // })
        });
    }
    listBusinessTaxes() {
        return this.currentBusiness().then((business) => {
            if (business) {
                return this.query(['table', 'businessId'], {
                    table: { $eq: 'taxes' },
                    businessId: { $eq: business.id },
                }).then((res) => {
                    if (res.docs && res.docs.length > 0) {
                        return res.docs;
                    }
                    else {
                        return [];
                    }
                });
            }
            else {
                return [];
            }
        });
    }
    listBusinessTaxes2() {
        return this.currentBusiness().then((business) => {
            if (business) {
                return this.callbackQuery(['table', 'businessId'], {
                    table: { $eq: 'taxes' },
                    businessId: { $eq: business.id },
                }, res => {
                    if (res.docs && res.docs.length > 0) {
                        return res.docs;
                    }
                    else {
                        return [];
                    }
                });
            }
            else {
                return [];
            }
        });
    }
    activeBranch(businessId, table = 'branches') {
        return this.database
            .createIndex({
            index: { fields: ['tables', 'active', 'businessId'] },
        })
            .then(() => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    active: { $eq: true },
                    businessId: { $eq: businessId },
                },
            });
        });
    }
    connect(dbName, filter = null) {
        if (!this.isInstantiated) {
            this.database = new PouchDB('main');
            console.log('did couchbase connected?');
            if (filter != null) {
                this.database.changes({
                    filter: (doc) => {
                        //make sure we filter only to listen on our document of intrest.
                        // TODO: see if we need this as not filter can be part of the sync function
                        return doc.channels[0] === filter;
                    },
                });
            }
            this.isInstantiated = true;
        }
    }
    fetch() {
        return this.database.allDocs({ include_docs: true });
    }
    get(id) {
        // enable allowing conflicting document.
        return this.database.get(id, { conflicts: false });
        // return  this.database.createIndex({
        //     index: {fields: ['id']}
        //   }).then(result => {
        //       return this.database.find({
        //         selector: {
        //           id: {$eq:id}
        //         }
        //       });
        //   })
    }
    remove(document) {
        try {
            return this.database.remove(document);
        }
        catch (e) {
            console.log('did not removed', e);
        }
    }
    find(id) {
        return this.get(id).then((result) => {
            return result;
        }, (error) => {
            if (error.status === '404') {
                throw new Error(`ERROR:${error}`);
            }
            else {
                return new Promise((_resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    getResponse(result, isArray) {
        if (!Array.isArray(result) && isArray) {
            return [result];
        }
        if (Array.isArray(result) && !isArray) {
            return result[0];
        }
        return result;
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
    uid() {
        return v1();
    }
    put(id, document) {
        document._id = id;
        document.uid = this.uid();
        document.channel = localStorage.getItem('userId');
        document.channels = [localStorage.getItem('userId')];
        return this.get(id).then((result) => {
            document._rev = result._rev;
            console.log('updated doc', document);
            return this.database.put(document);
        }, (error) => {
            console.log('error on update', error);
            if (error.status === '404' || error.status === 404) {
                return this.database.put(document);
            }
            else {
                return new Promise((_resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    sync(channels) {
        //NOTE: our main = bucket and is constant to all users. //do not use sessionId on pouchDB we don't use it on backend i.e on the server
        // return PouchDB.sync('main', 'url', {
        //   password: 'singlworld',
        //   user: 'admin',
        //   push: true,
        //   live: true,
        //   retry: true,
        //   continous: true,
        //   filter: "sync_gateway/bychannel",
        //   query_params: { "channels": ['43'] },
        // })
    }
    getChangeListener() {
        return this.listener;
    }
    getChangeListenerLogin() {
        return this.listenerLogin;
    }
    unique(a, key = 'name') {
        return a.length > 0 ? this.removeDuplicates(a, key) : [];
    }
    contains(array, obj, key) {
        for (const newObj of array) {
            if (this.isEqual(newObj, obj, key)) {
                return true;
            }
        }
        return false;
    }
    // comparator
    isEqual(obj1, obj2, key) {
        if (obj1[key] === obj2[key]) {
            return true;
        }
        return false;
    }
    removeDuplicates(ary, key) {
        const arr = [];
        return ary.filter((x) => {
            return !this.contains(arr, x, key) && arr.push(x);
        });
    }
}
PouchDBService.ɵprov = ɵɵdefineInjectable({ factory: function PouchDBService_Factory() { return new PouchDBService(ɵɵinject(HttpClient), ɵɵinject(FlipperEventBusService)); }, token: PouchDBService, providedIn: "root" });
PouchDBService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
PouchDBService.ctorParameters = () => [
    { type: HttpClient },
    { type: FlipperEventBusService }
];

const APP_CONFIG = new InjectionToken('APP_CONFIG');
var TABLES;
(function (TABLES) {
    TABLES["USER"] = "user";
    TABLES["BUSINESS"] = "business";
    TABLES["TYPES"] = "businessTypes";
    TABLES["MENU"] = "menus";
    TABLES["BRANCHES"] = "branches";
    TABLES["BUSINESSCATEGORY"] = "businessCategories";
    TABLES["USERBUSINESS"] = "businessUsers";
    TABLES["TAXES"] = "taxes";
    TABLES["PRODUCTS"] = "products";
    TABLES["VARIANTS"] = "variants";
    TABLES["REASON"] = "reasons";
    TABLES["STOCKS"] = "stocks";
    TABLES["BRANCHPRODUCTS"] = "branchProducts";
    TABLES["ORDER"] = "orders";
    TABLES["ORDERDETAILS"] = "orderDetails";
    TABLES["STOCKHISTORY"] = "stockHistory";
    TABLES["DEVICE"] = "devices";
    TABLES["RECEIPT"] = "receipts";
    TABLES["SUBSCRIPTION"] = "subscription";
})(TABLES || (TABLES = {}));
const DEFAULT_FLIPPER_DB_CONFIG = {
    database: { name: 'flipper', engine: 'LOCALSTORAGE' },
    tables: [
        {
            name: TABLES.USER,
            query: `id STRING,
                    name STRING,
                    email STRING,
                    active BOOL,
                    token STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
            `,
        },
        {
            name: TABLES.BUSINESSCATEGORY,
            query: `id STRING,
                    name STRING,
                    typeId STRING,
                    syncedOnline BOOL,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.REASON,
            query: `id STRING,
                    name STRING,
                    operation STRING,
                    active BOOL,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                 `,
        },
        {
            name: TABLES.TYPES,
            query: `id STRING,
                    name STRING,
                    syncedOnline BOOL,
                    PRIMARY KEY (id)
            `,
        },
        {
            name: TABLES.MENU,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                name STRING,
                icon STRING,
                route STRING,
                active BOOL,
                isSetting BOOL,
                PRIMARY KEY (id)`,
        },
        {
            name: TABLES.BUSINESS,
            query: `
                id STRING,
                name STRING,
                country STRING,
                currency STRING,
                businessUrl STRING,
                timeZone STRING,
                active BOOL,
                userId STRING,
                typeId STRING,
                categoryId STRING,
                createdAt DATETIME,
                updatedAt DATETIME,
                PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.BRANCHES,
            query: `
                id STRING,
                name STRING,
                active BOOL,
                businessId STRING,
                mapLatitude STRING NULL,
                mapLongitude STRING NULL,
                createdAt DATETIME,
                updatedAt DATETIME,
                PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.USERBUSINESS,
            query: `id STRING,
                    userId STRING,
                    businessId STRING,
                    PRIMARY KEY (id)
                    `,
        },
        {
            name: TABLES.TAXES,
            query: `id STRING,
                    name STRING,
                    percentage int(11),
                    active BOOL,
                    isDefault BOOL,
                    businessId STRING,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                        `,
        },
        {
            name: TABLES.PRODUCTS,
            query: `id STRING,
                    name STRING,
                    categoryId int(11) NULL,
                    description STRING NULL,
                    picture STRING NULL,
                    taxId int(11) NULL,
                    active BOOL,
                    hasPicture BOOL,
                    isDraft BOOL,
                    isCurrentUpdate BOOL,
                    businessId STRING,
                    supplierId STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.BRANCHPRODUCTS,
            query: `id STRING,
                    productId STRING,
                    branchId STRING,
                    channel STRING,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.VARIANTS,
            query: `id STRING,
                    name STRING,
                    sku STRING,
                    productId STRING,
                    unit STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.STOCKS,
            query: ` id STRING,
                    branchId STRING,
                    variantId STRING,
                    productId STRING,
                    lowStock STRING,
                    currentStock STRING,
                    supplyPrice int(11) NULL,
                    retailPrice int(11) NULL,
                    canTrackingStock BOOL,
                    showLowStockAlert BOOL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.ORDER,
            query: `id STRING,
                    branchId STRING NOT NULL,
                    deviceId STRING NULL,
                    orderNumber STRING NOT NULL,
                    customerId STRING NULL,
                    status STRING NOT NULL,
                    reference STRING NULL,
                    orderType STRING NOT NULL,
                    supplierId STRING NULL,
                    subTotal int(11) NULL,
                    supplierInvoiceNumber STRING NULL,
                    taxRate int(11) NULL,
                    taxAmount int(11) NULL,
                    discountRate int(11) NULL,
                    discountAmount int(11) NULL,
                    cashReceived int(11) NULL,
                    customerChangeDue int(11) NULL,
                    saleTotal int(11) NULL,
                    paymentId STRING NULL,
                    orderNote STRING NULL,
                    active BOOL,
                    isDraft BOOL,
                    channel STRING,
                    deliverDate DATETIME,
                    orderDate DATETIME,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.ORDERDETAILS,
            query: ` id STRING NOT NULL,
                    orderId STRING NOT NULL,
                    variantId STRING NOT NULL,
                    variantName STRING NOT NULL,
                    price int(11) NULL,
                    quantity int(11) NOT NULL,
                    unit STRING NULL,
                    taxAmount int(11) NULL,
                    taxRate int(11) NULL,
                    discountAmount int(11) NULL,
                    discountRate int(11) NULL,
                    subTotal int(11) NULL,
                    note STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.STOCKHISTORY,
            query: `id STRING,
                    variantId STRING,
                    stockId STRING,
                    productId STRING,
                    quantity int(11) NOT NULL,
                    reason STRING NULL,
                    note STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.DEVICE,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                    branchId int(11) NOT NULL,
                    name int(11) NOT NULL,
                    token STRING NOT NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.RECEIPT,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                    branchId int(11) NOT NULL,
                    businessName int(11) NOT NULL,
                    digitalLogo STRING  NULL,
                    printedLogo STRING  NULL,
                    showLocation BOOL  NULL,
                    color STRING  NULL,
                    address1 STRING  NULL,
                    address1 STRING  NULL,
                    city STRING  NULL,
                    customerText STRING  NULL,
                    returnPolicy STRING  NULL,
                    showItemNote BOOL  NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `,
        },
    ],
    demo: {
        email: 'admin@admin.com',
        password: 'admin',
    },
    defaultMenu: [
        {
            name: 'Analytics',
            icon: 'analytics.svg',
            route: 'analytics',
            active: true,
            isSetting: false,
        },
        {
            name: 'POS',
            icon: 'pos.svg',
            route: 'pos',
            active: false,
            isSetting: false,
        },
        {
            name: 'Inventory',
            icon: 'inventory.svg',
            route: 'inventory',
            active: false,
            isSetting: false,
        },
        {
            name: 'Transactions',
            icon: 'transaction.svg',
            route: 'transactions',
            active: false,
            isSetting: false,
        },
        {
            name: 'Settings',
            icon: 'settings.svg',
            route: 'settings',
            active: false,
            isSetting: true,
        },
    ],
    defaultReasons: [
        {
            name: 'Stock Received',
            operation: 'add',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Inventory Re-count',
            operation: 'add',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Damage',
            operation: 'remove',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Theft',
            operation: 'remove',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Loss',
            operation: 'remove',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Restock Return',
            operation: 'add',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    defaultCategory: [
        {
            name: 'Beauty Salon',
            id: 'beauty-salon',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Hair Salon/Barbershop',
            id: 'hair-salon/barbershop',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Independent Stylist/Barber',
            id: 'independent-stylist/barber',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Massage Therapist',
            id: 'massage-therapist',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Nail Salon',
            id: 'nail-salon',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Spa',
            id: 'spa',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Tanning Salon',
            id: 'tanning-salon',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Tattoo/Piercing',
            id: 'tattoo/piercing',
            type_id: 'beauty-and-personal-care',
        },
        {
            name: 'Pharamcy',
            id: 'pharamcy',
            type_id: 'retail',
        },
        {
            name: 'Grocery/Market',
            id: 'grocery/market',
            type_id: 'retail',
        },
        {
            name: 'Pet Store',
            id: 'pet-store',
            type_id: 'retail',
        },
        {
            name: 'Electronics',
            id: 'electronics',
            type_id: 'retail',
        },
        {
            name: 'Hardware Store',
            id: 'hardware-store',
            type_id: 'retail',
        },
        {
            name: 'Eyewear',
            id: 'eyewear',
            type_id: 'retail',
        },
        {
            name: 'Outdoor Markets',
            id: 'outdoor-markets',
            type_id: 'retail',
        },
        {
            name: 'Speciality Shop',
            id: 'speciality-shop',
            type_id: 'retail',
        },
        {
            name: 'Sporting Goods',
            id: 'sporting-goods',
            type_id: 'retail',
        },
        {
            name: 'Hobby Shop',
            id: 'hobby-shop',
            type_id: 'retail',
        },
        {
            name: 'Jewelry and Watches',
            id: 'jewelry-and-watches',
            type_id: 'retail',
        },
        {
            name: 'Flowers and Gifts',
            id: 'flowers-and-gifts',
            type_id: 'retail',
        },
    ],
    defaultType: [
        {
            name: 'Beauty and Personal Care',
            id: 'beauty-and-personal-care',
        },
        {
            name: 'Retail',
            id: 'retail',
        },
    ],
};
const Tables = {
    user: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.USER,
    business: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BUSINESS,
    branch: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BRANCHES,
    menu: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.MENU,
    type: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.TYPES,
    businessCategory: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BUSINESSCATEGORY,
    userBusiness: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.USERBUSINESS,
    taxes: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.TAXES,
    variants: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.VARIANTS,
    products: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.PRODUCTS,
    stocks: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.STOCKS,
    branchProducts: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BRANCHPRODUCTS,
    reasons: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.REASON,
    order: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.ORDER,
    orderDetails: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.ORDERDETAILS,
    stockHistory: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.STOCKHISTORY,
};
const PouchConfig = {
    channel: localStorage.getItem('channel'),
    sessionId: localStorage.getItem('sessionId'),
    // bucket: localStorage.getItem('bucket'),
    bucket: 'main',
    syncUrl: 'http://yegobox.com:4985/main',
    canSync: true,
    user: 'admin',
    password: 'singlworld',
    Tables: {
        user: TABLES.USER + '_' + localStorage.getItem('channel'),
        business: TABLES.BUSINESS + '_' + localStorage.getItem('channel'),
        branches: TABLES.BRANCHES + '_' + localStorage.getItem('channel'),
        menus: TABLES.MENU,
        businessTypes: TABLES.TYPES,
        businessCategories: TABLES.BUSINESSCATEGORY,
        businessUsers: TABLES.USERBUSINESS + '_' + localStorage.getItem('channel'),
        taxes: TABLES.TAXES + '_' + localStorage.getItem('channel'),
        variants: TABLES.VARIANTS + '_' + localStorage.getItem('channel'),
        products: TABLES.PRODUCTS + '_' + localStorage.getItem('channel'),
        branchProducts: TABLES.BRANCHPRODUCTS + '_' + localStorage.getItem('channel'),
        reasons: TABLES.REASON + '_' + localStorage.getItem('channel'),
        orders: TABLES.ORDER + '_' + localStorage.getItem('channel'),
        orderDetails: TABLES.ORDERDETAILS + '_' + localStorage.getItem('channel'),
        stockHistories: TABLES.STOCKHISTORY + '_' + localStorage.getItem('channel'),
        subscription: TABLES.SUBSCRIPTION + '_' + localStorage.getItem('channel'),
        stocks: TABLES.STOCKS + '_' + localStorage.getItem('channel'),
    },
};
// localStorage.setItem("lastname", "Smith");

class ActiveUser {
    constructor(eventBus, database) {
        this.eventBus = eventBus;
        this.database = database;
        this.currentUser = null;
        this.database.connect(PouchConfig.bucket);
        this.init();
    }
    init() {
        this.user();
        this.eventBus
            .of(UserLoggedEvent.CHANNEL)
            .pipe(filter$1(e => e.user && (e.user.id !== null || e.user.id !== undefined)))
            .subscribe(res => (this.currentUser = res.user));
    }
    get(prop) {
        return this.currentUser && this.currentUser[prop];
    }
    set(key, value) {
        this.currentUser[key] = value;
    }
    user(table = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.activeUser().then(res => {
                if (res.docs && res.docs.length > 0) {
                    this.eventBus.publish(new UserLoggedEvent(res.docs[0]));
                }
            }, error => {
                if ((error.error && error.status === '404') || error.status === 404) {
                    this.eventBus.publish(new UserLoggedEvent(null));
                }
            });
        });
    }
}
ActiveUser.ɵprov = ɵɵdefineInjectable({ factory: function ActiveUser_Factory() { return new ActiveUser(ɵɵinject(FlipperEventBusService), ɵɵinject(PouchDBService)); }, token: ActiveUser, providedIn: "root" });
ActiveUser.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ActiveUser.ctorParameters = () => [
    { type: FlipperEventBusService },
    { type: PouchDBService }
];

class ActiveBusiness {
    constructor(eventBus, database, currentUser) {
        this.eventBus = eventBus;
        this.database = database;
        this.currentUser = currentUser;
        this.currentBusiness = null;
        this.database.connect(PouchConfig.bucket);
        this.eventBus
            .of(CurrentBusinessEvent.CHANNEL)
            .pipe(filter$1(e => e.business && (e.business.id !== null || e.business.id !== undefined)))
            .subscribe(res => (this.currentBusiness = res.business));
        this.business();
    }
    get(prop) {
        return this.currentBusiness && this.currentBusiness[prop];
    }
    set(key, value) {
        this.currentBusiness[key] = value;
    }
    business(table = 'businesses') {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentUser.get('id') != 'undefined' ||
                this.currentUser.get('id') != undefined ||
                this.currentUser.get('id') != null) {
                yield this.database.activeBusiness(this.currentUser.get('id'), table).then(res => {
                    if (res.docs && res.docs.length > 0) {
                        this.eventBus.publish(new CurrentBusinessEvent(res.docs[0]));
                    }
                }, error => {
                    if ((error.error && error.status === '404') || error.status === 404) {
                        this.eventBus.publish(new CurrentBusinessEvent(null));
                    }
                });
            }
        });
    }
}
ActiveBusiness.ɵprov = ɵɵdefineInjectable({ factory: function ActiveBusiness_Factory() { return new ActiveBusiness(ɵɵinject(FlipperEventBusService), ɵɵinject(PouchDBService), ɵɵinject(ActiveUser)); }, token: ActiveBusiness, providedIn: "root" });
ActiveBusiness.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ActiveBusiness.ctorParameters = () => [
    { type: FlipperEventBusService },
    { type: PouchDBService },
    { type: ActiveUser }
];

class ActiveBranch {
    constructor(eventBus, database, currentBusiness) {
        this.eventBus = eventBus;
        this.database = database;
        this.currentBusiness = currentBusiness;
        this.currentBranch = null;
        this.database.connect(PouchConfig.bucket);
        this.eventBus
            .of(CurrentBranchEvent.CHANNEL)
            .pipe(filter$1(e => e.branch && (e.branch.id !== null || e.branch.id !== undefined)))
            .subscribe(res => (this.currentBranch = res.branch));
        this.branch();
    }
    get(prop) {
        return this.currentBranch && this.currentBranch[prop];
    }
    set(key, value) {
        this.currentBranch[key] = value;
    }
    branch(table = 'branches') {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentBusiness.get('id') != 'undefined' ||
                this.currentBusiness.get('id') != undefined ||
                this.currentBusiness.get('id') != null) {
                yield this.database.activeBranch(this.currentBusiness.get('id'), table).then(res => {
                    if (res.docs && res.docs.length > 0) {
                        this.eventBus.publish(new CurrentBranchEvent(res.docs[0]));
                    }
                }, error => {
                    if ((error.error && error.status === '404') || error.status === 404) {
                        this.eventBus.publish(new CurrentBranchEvent(null));
                    }
                });
            }
        });
    }
}
ActiveBranch.ɵprov = ɵɵdefineInjectable({ factory: function ActiveBranch_Factory() { return new ActiveBranch(ɵɵinject(FlipperEventBusService), ɵɵinject(PouchDBService), ɵɵinject(ActiveBusiness)); }, token: ActiveBranch, providedIn: "root" });
ActiveBranch.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ActiveBranch.ctorParameters = () => [
    { type: FlipperEventBusService },
    { type: PouchDBService },
    { type: ActiveBusiness }
];

class LocalStorageSaveOptions {
}
class CacheService {
    constructor() { }
    save(options) {
        // Set default values for optionals
        options.expirationMins = options.expirationMins || 0;
        // Set expiration date in miliseconds
        const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0;
        const record = {
            value: typeof options.data === 'string' ? options.data : JSON.stringify(options.data),
            expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
            hasExpiration: expirationMS !== 0 ? true : false,
        };
        localStorage.setItem(options.key, JSON.stringify(record));
    }
    load(key) {
        // Get cached data from localstorage
        const item = localStorage.getItem(key);
        if (item !== null) {
            const record = JSON.parse(item);
            const now = new Date().getTime();
            // Expired data will return null
            if (!record || (record.hasExpiration && record.expiration <= now)) {
                return null;
            }
            else {
                return JSON.parse(record.value);
            }
        }
        return null;
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    cleanLocalStorage() {
        localStorage.clear();
    }
}
CacheService.ɵprov = ɵɵdefineInjectable({ factory: function CacheService_Factory() { return new CacheService(); }, token: CacheService, providedIn: "root" });
CacheService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CacheService.ctorParameters = () => [];

/*
 * Public API Surface of components
 */

/**
 * Generated bundle index. Do not edit.
 */

export { APP_CONFIG, ActiveBranch, ActiveBusiness, ActiveUser, AnyEvent, ArrayRemoveItemPipe, Branch, BranchProducts, BranchProductsEvent, BranchesEvent, Business, BusinessCategory, BusinessesEvent, CHANNELS, CacheService, CalculateTotalClassPipe, CurrentBranchEvent, CurrentBusinessEvent, CurrentStockEvent, DEFAULT_FLIPPER_DB_CONFIG, DashBoardEntries, DefaultTaxesEvent, DraftProductEvent, DraftStockHistoryEvent, DraftStocksEvent, DraftVariantsEvent, ErrorMessageEvent, FindKeyPipe, FlipperComponentsModule, GenerateBarcodeComponent, HeaderComponent, Items, Labels, LazyIfDirective, LoadingIconComponent, LocalStorageSaveOptions, MatchHeightDirective, Menu, MenuEntries, MergeArryByIdPipe, MessageComponent, NotificationListComponent, NotificationService, ORDERTYPE, Order, OrderDetails, OrderEvent, PouchConfig, PouchDBService, Price, PriceEvent, PriceVariant, PriceVariantEvent, Product, ProductEvent, ProductsEvent, Reason, RoundNumberPipe, RouterProgressComponent, STATUS, SettingsService, ShoppingEvent, SpinnerComponent, Stock, StockHistory, StocksEvent, Subscription, TABLES, TableOverlayComponent, Tables, Taxes, TaxesEvent, Total, Types, User, UserBusiness, UserLoggedEvent, UserSubscriptionEvent, Variant, VariantEvent, VariantsEvent, fadeInAnimation, fadeInScaleUpAnimation, fadeOutAnimation, Price as ɵa, PriceVariant as ɵb, Product as ɵc, OrderDetails as ɵd, Branch as ɵe, Business as ɵf, User as ɵg, Subscription as ɵh };
//# sourceMappingURL=enexus-flipper-components.js.map
