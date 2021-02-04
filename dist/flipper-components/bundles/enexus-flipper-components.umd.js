(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@enexus/flipper-vendors'), require('@angular/router'), require('rxjs/internal/operators'), require('@angular/animations'), require('@enexus/flipper-color'), require('@enexus/flipper-event'), require('@enexus/flipper-dialog'), require('lodash'), require('rxjs'), require('ngx-barcode'), require('@angular/common/http'), require('pouchdb/dist/pouchdb'), require('pouchdb-debug'), require('uuid'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@enexus/flipper-components', ['exports', '@angular/core', '@angular/common', '@enexus/flipper-vendors', '@angular/router', 'rxjs/internal/operators', '@angular/animations', '@enexus/flipper-color', '@enexus/flipper-event', '@enexus/flipper-dialog', 'lodash', 'rxjs', 'ngx-barcode', '@angular/common/http', 'pouchdb/dist/pouchdb', 'pouchdb-debug', 'uuid', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.enexus = global.enexus || {}, global.enexus['flipper-components'] = {}), global.ng.core, global.ng.common, global['@enexus/flipper-vendors'], global.ng.router, global.rxjs['internal/operators'], global.ng.animations, global['@enexus/flipper-color'], global['@enexus/flipper-event'], global['@enexus/flipper-dialog'], global.lodash, global.rxjs, global['ngx-barcode'], global.ng.common.http, global.PouchDB, global.debugPouch, global.uuid, global.rxjs.operators));
}(this, (function (exports, i0, common, flipperVendors, router, operators, animations, flipperColor, i1$1, flipperDialog, _, rxjs, ngxBarcode, i1, PouchDB, debugPouch, uuid, operators$1) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var PouchDB__default = /*#__PURE__*/_interopDefaultLegacy(PouchDB);
    var debugPouch__default = /*#__PURE__*/_interopDefaultLegacy(debugPouch);

    var LazyIfDirective = /** @class */ (function () {
        function LazyIfDirective(templateRef, viewContainer) {
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
            this.loaded = false;
        }
        Object.defineProperty(LazyIfDirective.prototype, "libLazyIf", {
            set: function (condition) {
                if (condition && !this.loaded) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                    this.loaded = true;
                }
            },
            enumerable: false,
            configurable: true
        });
        return LazyIfDirective;
    }());
    LazyIfDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[flipperLibLazyIf]',
                },] }
    ];
    LazyIfDirective.ctorParameters = function () { return [
        { type: i0.TemplateRef },
        { type: i0.ViewContainerRef }
    ]; };
    LazyIfDirective.propDecorators = {
        libLazyIf: [{ type: i0.Input }]
    };

    var RouterProgressComponent = /** @class */ (function () {
        function RouterProgressComponent(router$1) {
            var _this = this;
            this.document = document;
            this.loading = false;
            router$1.events
                .pipe(operators.filter(function (event) {
                return event instanceof router.NavigationStart;
            }))
                .subscribe(function () {
                _this.loading = true;
            });
            router$1.events
                .pipe(operators.filter(function (event) {
                return event instanceof router.NavigationEnd || event instanceof router.NavigationCancel || event instanceof router.NavigationError;
            }))
                .subscribe(function () {
                _this.loading = false;
                // Remove loading background if any on application start
                var background = _this.document.getElementById('background-logo');
                if (background) {
                    background.setAttribute('class', 'fade-out');
                    setTimeout(function () {
                        background.outerHTML = '';
                    }, 200);
                }
            });
        }
        return RouterProgressComponent;
    }());
    RouterProgressComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-router-progress',
                    template: "<mat-progress-bar *ngIf=\"loading\" [@myAnimation] mode=\"indeterminate\"></mat-progress-bar>\r\n",
                    animations: [
                        animations.trigger('myAnimation', [
                            animations.transition(':enter', [animations.style({ top: '0px', opacity: 1 })]),
                            animations.transition(':leave', [animations.style({ top: '0px', opacity: 1 }), animations.animate('500ms', animations.style({ top: '-5px', opacity: 0 }))]),
                        ]),
                    ],
                    styles: [":host{left:0;position:fixed;right:0;top:0;z-index:9999}"]
                },] }
    ];
    RouterProgressComponent.ctorParameters = function () { return [
        { type: router.Router }
    ]; };

    var HeaderComponent = /** @class */ (function () {
        function HeaderComponent() {
        }
        return HeaderComponent;
    }());
    HeaderComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-header',
                    template: "<header>\r\n  <nav class=\"banner\" role=\"navigation\">\r\n    <div class=\"content\">\r\n      <div class=\"column column-fill flex-align-left\"></div>\r\n      <div class=\"column flex-align-center\">\r\n        <a  role=\"button\" data-ember-action=\"\" data-ember-action-467=\"467\">\r\n          <img alt=\"image\" [src]=\"'./assets/icons/icon.png'\" style=\"width:40px;height: 40px;\">\r\n        </a>\r\n      </div>\r\n      <div class=\"column column-fill flex-align-right\"></div>\r\n    </div>\r\n  </nav>\r\n</header>\r\n",
                    styles: ["@media (min-width:718px){.banner{height:73px}}.banner{background-color:#211a36;color:#fff!important;height:62px;overflow:hidden}.banner .content{align-items:center;display:flex;height:100%;justify-content:space-between;padding:10px}@media (min-width:1024px){.content{width:868px}}@media (min-width:718px){.content{width:680px}}@media (min-width:480px){.content{width:424px}}@media (min-width:374px){.content{width:324px}}.content{margin-left:auto;margin-right:auto;width:276px}"]
                },] }
    ];

    var TableOverlayComponent = /** @class */ (function () {
        function TableOverlayComponent() {
        }
        TableOverlayComponent.prototype.ngOnInit = function () {
            this.noDataLabel = this.noDataLabel || 'No data';
        };
        return TableOverlayComponent;
    }());
    TableOverlayComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-table-overlay',
                    template: "<div class=\"container\">\r\n  <div class=\"loading-shade\"\r\n       *ngIf=\"loading\">\r\n    <flipper-spinner *ngIf=\"loading\" [size]=\"48\"></flipper-spinner>\r\n  </div>\r\n\r\n  <div class=\"no-data-shade\" *ngIf=\"!loading && (!dataSource || dataSource.data.length === 0)\">\r\n    <flipper-message icon=\"empty.svg\" [title]=\"title\" [message]=\"noDataLabel\">\r\n    </flipper-message>\r\n  </div>\r\n\r\n  <ng-content></ng-content>\r\n\r\n</div>\r\n",
                    styles: [".container{position:relative}.loading-shade,.no-data-shade{align-items:flex-start;bottom:0;display:flex;justify-content:center;left:0;min-height:100px;position:absolute;right:0;text-align:center;top:44px;z-index:1000000000}"]
                },] }
    ];
    TableOverlayComponent.propDecorators = {
        loading: [{ type: i0.Input }],
        dataSource: [{ type: i0.Input }],
        noDataLabel: [{ type: i0.Input }],
        title: [{ type: i0.Input }]
    };

    var SpinnerComponent = /** @class */ (function () {
        function SpinnerComponent(toFill) {
            this.toFill = toFill;
            this.color = 'primary';
            this.size = 24;
        }
        Object.defineProperty(SpinnerComponent.prototype, "hostClass", {
            get: function () {
                return this.toFill.transform(this.color);
            },
            enumerable: false,
            configurable: true
        });
        SpinnerComponent.prototype.ngOnInit = function () { };
        return SpinnerComponent;
    }());
    SpinnerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-spinner',
                    template: "<svg version=\"1.1\" id=\"Calque_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 70 70\" [style.width.px]=\"size\" [style.height.px]=\"size\" xml:space=\"preserve\">\r\n  <rect x=\"30\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"40\" width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"50\" y=\"10\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"60\" y=\"20\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"60\" y=\"30\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"60\" y=\"40\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"50\" y=\"50\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"40\" y=\"60\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"30\" y=\"60\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"20\" y=\"60\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"10\" y=\"50\"  width=\"10\" height=\"10\"></rect>\r\n  <rect y=\"40\"  width=\"10\" height=\"10\"></rect>\r\n  <rect y=\"30\"  width=\"10\" height=\"10\"></rect>\r\n  <rect y=\"20\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"10\" y=\"10\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"20\"  width=\"10\" height=\"10\"></rect>\r\n</svg>\r\n",
                    styles: ["rect{animation-duration:1s;animation-iteration-count:infinite;animation-name:spinner}rect:first-child{animation-delay:.0625s;visibility:hidden}rect:nth-child(2){animation-delay:.125s;visibility:hidden}rect:nth-child(3){animation-delay:.1875s;visibility:hidden}rect:nth-child(4){animation-delay:.25s;visibility:hidden}rect:nth-child(5){animation-delay:.3125s;visibility:hidden}rect:nth-child(6){animation-delay:.375s;visibility:hidden}rect:nth-child(7){animation-delay:.4375s;visibility:hidden}rect:nth-child(8){animation-delay:.5s;visibility:hidden}rect:nth-child(9){animation-delay:.5625s;visibility:hidden}rect:nth-child(10){animation-delay:.625s;visibility:hidden}rect:nth-child(11){animation-delay:.6875s;visibility:hidden}rect:nth-child(12){animation-delay:.75s;visibility:hidden}rect:nth-child(13){animation-delay:.8125s;visibility:hidden}rect:nth-child(14){animation-delay:.875s;visibility:hidden}rect:nth-child(15){animation-delay:.9375s;visibility:hidden}rect:nth-child(16){animation-delay:1s;visibility:hidden}@keyframes spinner{0%{visibility:visible}40%{visibility:visible}70%{visibility:hidden}to{visibility:hidden}}"]
                },] }
    ];
    SpinnerComponent.ctorParameters = function () { return [
        { type: flipperColor.ColorToFillClassPipe }
    ]; };
    SpinnerComponent.propDecorators = {
        color: [{ type: i0.Input }],
        size: [{ type: i0.Input }],
        hostClass: [{ type: i0.HostBinding, args: ['class',] }]
    };

    var MessageComponent = /** @class */ (function () {
        function MessageComponent() {
            this.icon = 'search.svg';
            this.title = '';
            this.message = '';
        }
        return MessageComponent;
    }());
    MessageComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-message',
                    template: "<div class=\"message\">\r\n\r\n  <div class=\"grid-2-at-medium grid-row-space-line\">\r\n    <div class=\"col\">\r\n      <span class=\"message-icon\">\r\n        <img [src]=\"'./assets/icons/'+icon\" class=\"icon\">\r\n      </span>\r\n    </div>\r\n    <div class=\"col\">\r\n      <span class=\"message-title\">\r\n        {{title}}\r\n      </span>\r\n      <div class=\"message-desc mt-4\">\r\n        {{message}}\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n</div>\r\n",
                    styles: [".message-icon{display:block;text-align:center}.message-icon .icon{height:104px;object-fit:contain;width:104px}.message-title{font-size:50px;letter-spacing:-1.17px}.message-desc,.message-title{color:#1b2125;display:block;font-family:Roboto;font-stretch:normal;font-style:normal;font-weight:400;height:auto;line-height:normal;position:relative;text-align:center;width:auto}.message-desc{font-size:16px;letter-spacing:-.37px}"]
                },] }
    ];
    MessageComponent.propDecorators = {
        icon: [{ type: i0.Input }],
        title: [{ type: i0.Input }],
        message: [{ type: i0.Input }]
    };

    var RoundNumberPipe = /** @class */ (function () {
        function RoundNumberPipe() {
        }
        RoundNumberPipe.prototype.transform = function (nums, decimals) {
            if (decimals === void 0) { decimals = 2; }
            var newString; // The new rounded number
            decimals = Number(decimals);
            if (decimals < 1) {
                newString = Math.round(nums).toString();
            }
            else {
                var numString = nums.toString();
                if (numString.lastIndexOf('.') === -1) {
                    // If there is no decimal point
                    numString += '.'; // give it one at the end
                }
                var cutoff = numString.lastIndexOf('.') + decimals; // The point at which to truncate the number
                var d1 = Number(numString.substring(cutoff, cutoff + 1)); // The value of the last decimal place that we'll end up with
                var d2 = Number(numString.substring(cutoff + 1, cutoff + 2)); // The next decimal, after the last one we want
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
                    var roundedNum = Number(numString) + 1;
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
                var decs = newString.substring(newString.lastIndexOf('.') + 1).length;
                for (var i = 0; i < decimals - decs; i++) {
                    newString += '0';
                }
            }
            // var newNumber = Number(newString);// make it a number if you like
            return this.formatNumbers(newString); // Output the result to the form field (change for your purposes)
        };
        RoundNumberPipe.prototype.formatNumbers = function (nums) {
            return nums.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        };
        return RoundNumberPipe;
    }());
    RoundNumberPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function RoundNumberPipe_Factory() { return new RoundNumberPipe(); }, token: RoundNumberPipe, providedIn: "root" });
    RoundNumberPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'roundNumber',
                },] },
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    var CalculateTotalClassPipe = /** @class */ (function () {
        function CalculateTotalClassPipe() {
        }
        CalculateTotalClassPipe.prototype.transform = function (arrayOfdData, prop) {
            var total = 0.0;
            if (arrayOfdData.length > 0) {
                for (var i = 0, len = arrayOfdData.length; i < len; i++) {
                    total += parseFloat(arrayOfdData[i][prop]);
                }
            }
            return total;
        };
        return CalculateTotalClassPipe;
    }());
    CalculateTotalClassPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function CalculateTotalClassPipe_Factory() { return new CalculateTotalClassPipe(); }, token: CalculateTotalClassPipe, providedIn: "root" });
    CalculateTotalClassPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'calculateTotalClass',
                    pure: true,
                },] },
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    var MatchHeightDirective = /** @class */ (function () {
        function MatchHeightDirective(el) {
            this.el = el;
        }
        MatchHeightDirective.prototype.onResize = function () {
            // call our matchHeight function here
            this.matchHeight(this.el.nativeElement, this.myMatchHeight);
        };
        MatchHeightDirective.prototype.ngAfterViewChecked = function () {
            // call our matchHeight function here later
            this.matchHeight(this.el.nativeElement, this.myMatchHeight);
        };
        MatchHeightDirective.prototype.matchHeight = function (parent, className) {
            // match height logic here
            if (!parent) {
                return;
            }
            // step 1: find all the child elements with the selected class name
            var children = parent.getElementsByClassName(className);
            if (!children) {
                return;
            }
            // step 2a: get all the child elements heights
            var itemHeights = Array.from(children).map(function (x) { return x.getBoundingClientRect().height; });
            // step 2b: find out the tallest
            var maxHeight = itemHeights.reduce(function (prev, curr) {
                return curr > prev ? curr : prev;
            }, 0);
            // step 3: update all the child elements to the tallest height
            Array.from(children).forEach(function (x) { return (x.style.height = maxHeight + "px"); });
        };
        return MatchHeightDirective;
    }());
    MatchHeightDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[flipperMyMatchHeight]',
                },] }
    ];
    MatchHeightDirective.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    MatchHeightDirective.propDecorators = {
        myMatchHeight: [{ type: i0.Input }],
        onResize: [{ type: i0.HostListener, args: ['window:resize',] }]
    };

    var MergeArryByIdPipe = /** @class */ (function () {
        function MergeArryByIdPipe() {
        }
        MergeArryByIdPipe.prototype.transform = function (originArrayData, mergeArrayData) {
            return this.mergeById(originArrayData).with(mergeArrayData);
        };
        MergeArryByIdPipe.prototype.mergeById = function (arr) {
            return {
                with: function (arr2) {
                    return _.map(arr, function (item) {
                        return _.find(arr2, function (obj) { return obj.id === item.id; }) || item;
                    });
                },
            };
        };
        return MergeArryByIdPipe;
    }());
    MergeArryByIdPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function MergeArryByIdPipe_Factory() { return new MergeArryByIdPipe(); }, token: MergeArryByIdPipe, providedIn: "root" });
    MergeArryByIdPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'mergeArryById',
                },] },
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    var ArrayRemoveItemPipe = /** @class */ (function () {
        function ArrayRemoveItemPipe() {
        }
        ArrayRemoveItemPipe.prototype.transform = function (arrayOfData, value) {
            return this.arrayRemove(arrayOfData, value);
        };
        ArrayRemoveItemPipe.prototype.arrayRemove = function (arr, objectToRemove) {
            if (arr === void 0) { arr = []; }
            if (arr.length > 0) {
                return arr.filter(function (ele) {
                    return JSON.stringify(ele) !== JSON.stringify(objectToRemove);
                });
            }
            else {
                return arr;
            }
        };
        return ArrayRemoveItemPipe;
    }());
    ArrayRemoveItemPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function ArrayRemoveItemPipe_Factory() { return new ArrayRemoveItemPipe(); }, token: ArrayRemoveItemPipe, providedIn: "root" });
    ArrayRemoveItemPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'arrayRemoveItem',
                },] },
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    var FindKeyPipe = /** @class */ (function () {
        function FindKeyPipe() {
        }
        FindKeyPipe.prototype.transform = function (numKeys, key) {
            return numKeys.find(function (k) { return k === key; }) ? true : false;
        };
        return FindKeyPipe;
    }());
    FindKeyPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function FindKeyPipe_Factory() { return new FindKeyPipe(); }, token: FindKeyPipe, providedIn: "root" });
    FindKeyPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'findKey',
                    pure: true,
                },] },
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    var Notification = /** @class */ (function () {
        function Notification(id, type, title, message, timeout) {
            this.id = id;
            this.type = type;
            this.title = title;
            this.message = message;
            this.timeout = timeout;
        }
        return Notification;
    }());
    var NotificationType;
    (function (NotificationType) {
        NotificationType[NotificationType["success"] = 0] = "success";
        NotificationType[NotificationType["warning"] = 1] = "warning";
        NotificationType[NotificationType["error"] = 2] = "error";
        NotificationType[NotificationType["info"] = 3] = "info";
    })(NotificationType || (NotificationType = {}));

    var NotificationService = /** @class */ (function () {
        function NotificationService() {
            this.subject = new rxjs.Subject();
            this.idx = 0;
        }
        NotificationService.prototype.getObservable = function () {
            return this.subject.asObservable();
        };
        NotificationService.prototype.info = function (title, message, timeout) {
            if (timeout === void 0) { timeout = 3000; }
            this.subject.next(new Notification(this.idx++, NotificationType.info, title, message, timeout));
        };
        NotificationService.prototype.success = function (title, message, timeout) {
            if (timeout === void 0) { timeout = 3000; }
            this.subject.next(new Notification(this.idx++, NotificationType.success, title, message, timeout));
        };
        NotificationService.prototype.warning = function (title, message, timeout) {
            if (timeout === void 0) { timeout = 3000; }
            this.subject.next(new Notification(this.idx++, NotificationType.warning, title, message, timeout));
        };
        NotificationService.prototype.error = function (title, message, timeout) {
            if (timeout === void 0) { timeout = 0; }
            this.subject.next(new Notification(this.idx++, NotificationType.error, title, message, timeout));
        };
        return NotificationService;
    }());
    NotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NotificationService_Factory() { return new NotificationService(); }, token: NotificationService, providedIn: "root" });
    NotificationService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    NotificationService.ctorParameters = function () { return []; };

    var NotificationListComponent = /** @class */ (function () {
        function NotificationListComponent(notificationSvc) {
            this.notificationSvc = notificationSvc;
            this.notifications = [];
        }
        NotificationListComponent.prototype.addNotification = function (notification) {
            var _this = this;
            this.notifications.push(notification);
            if (notification.timeout !== 0) {
                setTimeout(function () { return _this.close(notification); }, notification.timeout);
            }
        };
        NotificationListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription = this.notificationSvc
                .getObservable()
                .subscribe(function (notification) { return _this.addNotification(notification); });
        };
        NotificationListComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        NotificationListComponent.prototype.close = function (notification) {
            this.notifications = this.notifications.filter(function (notif) { return notif.id !== notification.id; });
        };
        NotificationListComponent.prototype.className = function (notification) {
            var style;
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
        };
        return NotificationListComponent;
    }());
    NotificationListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-notification',
                    template: "<div class=\"notifications\">\r\n\t<div *ngFor=\"let notification of notifications\" class=\"notification\" [ngClass]=\"className(notification)\">\r\n\t\t<ng-container *ngTemplateOutlet=\"notificationTpl;context:{notification:notification}\"></ng-container>\r\n\t</div>\r\n</div>\r\n\r\n<ng-template #notificationTpl let-notification=\"notification\">\r\n\r\n\t<div class=\"title\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n\t\t<div>{{notification.title}}</div>\r\n\t\t<button mat-icon-button \r\n            (click)=\"close(notification)\"\r\n            matTooltip=\"Close the notification\"\r\n            matTooltipPosition=\"before\">\r\n        <mat-icon><img [src]=\"'./assets/icons/arrow-up-right.svg'\" class=\"icon-arrow\"></mat-icon>\r\n      </button>\r\n\t</div>\r\n\r\n\t<div class=\"message\">{{notification.message}}</div>\r\n\r\n</ng-template>\r\n",
                    styles: [".notifications{max-width:400px;min-width:400px;position:fixed;right:0;top:0;z-index:1000}.notifications .notification{border-radius:5px;color:#fff;margin:5px;overflow:hidden}.notifications .notification .title{background:rgba(0,0,0,.6);font-weight:700;padding-left:10px}.notifications .notification .message{background:rgba(0,0,0,.4);max-height:200px;overflow-y:auto;padding:10px}.notifications .notification.info{background-color:hsla(0,0%,74.1%,.9)}.notifications .notification.success{background-color:rgba(27,158,119,.9)}.notifications .notification.warning{background-color:rgba(217,95,2,.9)}.notifications .notification.error{background-color:rgba(246,71,71,.9)}"]
                },] }
    ];
    NotificationListComponent.ctorParameters = function () { return [
        { type: NotificationService }
    ]; };

    var GenerateBarcodeComponent = /** @class */ (function () {
        function GenerateBarcodeComponent() {
            this.labels = [];
            this.showName = true;
            this.showSku = true;
        }
        return GenerateBarcodeComponent;
    }());
    GenerateBarcodeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-generate-barcode',
                    template: "\r\n<div class=\"row\" *ngIf=\"labels && labels.length > 0\">\r\n    <div class=\"col m-3\"  *ngFor=\"let label of labels\">\r\n        <span *ngIf=\"showName\" class=\"name\">{{label.name}}</span>\r\n        <ngx-barcode [bc-value]=\"label.sku\" [bc-display-value]=\"showSku\"></ngx-barcode>\r\n    </div>\r\n</div>\r\n\r\n",
                    styles: [".name{font-size:.8em}label{color:#999;display:block;margin-bottom:.5em;margin-top:2em}.col{float:left;padding:10px;text-align:center}.row{margin:3px}.row:after{clear:both;content:\"\";display:table}@media screen and (max-width:600px){.col{display:block;width:100%}}"]
                },] }
    ];
    GenerateBarcodeComponent.propDecorators = {
        labels: [{ type: i0.Input }],
        showName: [{ type: i0.Input }],
        showSku: [{ type: i0.Input }]
    };

    var LoadingIconComponent = /** @class */ (function () {
        function LoadingIconComponent() {
        }
        return LoadingIconComponent;
    }());
    LoadingIconComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'flipper-loading-icon',
                    template: "<ng-container *ngIf=\"!loading\"><ng-content></ng-content></ng-container>\r\n<div *ngIf=\"loading\" class=\"loading-spinner\">\r\n  <flipper-spinner [size]=\"24\" [color]=\"'accent'\"></flipper-spinner>\r\n</div>\r\n",
                    styles: [".mat-button .loading-spinner{display:inline-block}.mat-icon-button .loading-spinner{display:block;margin-top:4px}"]
                },] }
    ];
    LoadingIconComponent.propDecorators = {
        loading: [{ type: i0.Input }]
    };

    var FlipperComponentsModule = /** @class */ (function () {
        function FlipperComponentsModule() {
        }
        return FlipperComponentsModule;
    }());
    FlipperComponentsModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        i1.HttpClientModule,
                        common.CommonModule,
                        flipperVendors.VendorsModule,
                        flipperColor.ColorModule,
                        i1$1.FlipperEventModule,
                        flipperDialog.DialogModule,
                        ngxBarcode.NgxBarcodeModule,
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

    var Business = /** @class */ (function () {
        function Business(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Business;
    }());

    var MenuEntries = /** @class */ (function () {
        function MenuEntries(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return MenuEntries;
    }());

    var Menu = /** @class */ (function () {
        function Menu(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Menu;
    }());

    var User = /** @class */ (function () {
        function User(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return User;
    }());

    var DashBoardEntries = /** @class */ (function () {
        function DashBoardEntries(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return DashBoardEntries;
    }());
    var Total = /** @class */ (function () {
        function Total(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Total;
    }());
    var Items = /** @class */ (function () {
        function Items(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Items;
    }());

    var Branch = /** @class */ (function () {
        function Branch(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Branch;
    }());

    var Price = /** @class */ (function () {
        function Price(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Price;
    }());

    var Product = /** @class */ (function () {
        function Product(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Product;
    }());

    var PriceVariant = /** @class */ (function () {
        function PriceVariant(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return PriceVariant;
    }());

    var OrderDetails = /** @class */ (function () {
        function OrderDetails(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return OrderDetails;
    }());

    var StockHistory = /** @class */ (function () {
        function StockHistory(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return StockHistory;
    }());

    (function (STATUS) {
        STATUS["COMPLETE"] = "complete";
        STATUS["SENT"] = "sent";
        STATUS["RECEIVED"] = "received";
        STATUS["OPEN"] = "open";
        STATUS["VOID"] = "void";
        STATUS["HELD"] = "held";
        STATUS["OVERDUE"] = "overdue";
    })(exports.STATUS || (exports.STATUS = {}));

    (function (ORDERTYPE) {
        ORDERTYPE["PURCHASE"] = "purchase";
        ORDERTYPE["SALES"] = "sales";
        ORDERTYPE["RETURN"] = "return";
        ORDERTYPE["TRANSFER"] = "transfer";
    })(exports.ORDERTYPE || (exports.ORDERTYPE = {}));

    var Order = /** @class */ (function () {
        function Order(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Order;
    }());

    var Variant = /** @class */ (function () {
        function Variant(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Variant;
    }());

    var Types = /** @class */ (function () {
        function Types(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Types;
    }());

    var BusinessCategory = /** @class */ (function () {
        function BusinessCategory(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return BusinessCategory;
    }());

    var UserBusiness = /** @class */ (function () {
        function UserBusiness(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return UserBusiness;
    }());

    var Taxes = /** @class */ (function () {
        function Taxes(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Taxes;
    }());

    var Reason = /** @class */ (function () {
        function Reason(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Reason;
    }());

    var BranchProducts = /** @class */ (function () {
        function BranchProducts(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return BranchProducts;
    }());

    var Stock = /** @class */ (function () {
        function Stock(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Stock;
    }());

    var Labels = /** @class */ (function () {
        function Labels(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Labels;
    }());

    var Subscription = /** @class */ (function () {
        function Subscription(params) {
            if (params === void 0) { params = {}; }
            for (var name in params) {
                this[name] = params[name];
            }
        }
        return Subscription;
    }());

    var CHANNELS = /** @class */ (function () {
        function CHANNELS() {
        }
        return CHANNELS;
    }());
    CHANNELS.ORDER = 'orders';
    CHANNELS.PRODUCTS = 'products';
    CHANNELS.PRICES = 'prices';
    CHANNELS.PRICEVARIANTS = 'priceVariants';
    CHANNELS.SHOPPINGS = 'shoppings';
    CHANNELS.VARIANTS = 'variants';

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

    var OrderEvent = /** @class */ (function (_super) {
        __extends(OrderEvent, _super);
        function OrderEvent(order) {
            var _this = _super.call(this, OrderEvent.CHANNEL) || this;
            _this.order = order;
            return _this;
        }
        return OrderEvent;
    }(i1$1.BusEvent));
    OrderEvent.CHANNEL = CHANNELS.ORDER;

    var PriceEvent = /** @class */ (function (_super) {
        __extends(PriceEvent, _super);
        function PriceEvent(price) {
            var _this = _super.call(this, PriceEvent.CHANNEL) || this;
            _this.price = price;
            return _this;
        }
        return PriceEvent;
    }(i1$1.BusEvent));
    PriceEvent.CHANNEL = CHANNELS.PRICES;

    var PriceVariantEvent = /** @class */ (function (_super) {
        __extends(PriceVariantEvent, _super);
        function PriceVariantEvent(priceVariant) {
            var _this = _super.call(this, PriceVariantEvent.CHANNEL) || this;
            _this.priceVariant = priceVariant;
            return _this;
        }
        return PriceVariantEvent;
    }(i1$1.BusEvent));
    PriceVariantEvent.CHANNEL = CHANNELS.PRICEVARIANTS;

    var ProductEvent = /** @class */ (function (_super) {
        __extends(ProductEvent, _super);
        function ProductEvent(product) {
            var _this = _super.call(this, ProductEvent.CHANNEL) || this;
            _this.product = product;
            return _this;
        }
        return ProductEvent;
    }(i1$1.BusEvent));
    ProductEvent.CHANNEL = CHANNELS.PRODUCTS;

    var ShoppingEvent = /** @class */ (function (_super) {
        __extends(ShoppingEvent, _super);
        function ShoppingEvent(shopping) {
            var _this = _super.call(this, ShoppingEvent.CHANNEL) || this;
            _this.shopping = shopping;
            return _this;
        }
        return ShoppingEvent;
    }(i1$1.BusEvent));
    ShoppingEvent.CHANNEL = CHANNELS.SHOPPINGS;

    var VariantEvent = /** @class */ (function (_super) {
        __extends(VariantEvent, _super);
        function VariantEvent(variant) {
            var _this = _super.call(this, VariantEvent.CHANNEL) || this;
            _this.variant = variant;
            return _this;
        }
        return VariantEvent;
    }(i1$1.BusEvent));
    VariantEvent.CHANNEL = CHANNELS.VARIANTS;

    var VariantsEvent = /** @class */ (function (_super) {
        __extends(VariantsEvent, _super);
        function VariantsEvent(variants) {
            var _this = _super.call(this, VariantsEvent.CHANNEL) || this;
            _this.variants = variants;
            return _this;
        }
        return VariantsEvent;
    }(i1$1.BusEvent));
    VariantsEvent.CHANNEL = 'variants';

    var BranchProductsEvent = /** @class */ (function (_super) {
        __extends(BranchProductsEvent, _super);
        function BranchProductsEvent(branchProducts) {
            var _this = _super.call(this, BranchProductsEvent.CHANNEL) || this;
            _this.branchProducts = branchProducts;
            return _this;
        }
        return BranchProductsEvent;
    }(i1$1.BusEvent));
    BranchProductsEvent.CHANNEL = 'branchProducts';

    var ErrorMessageEvent = /** @class */ (function (_super) {
        __extends(ErrorMessageEvent, _super);
        function ErrorMessageEvent(errorMessage) {
            var _this = _super.call(this, ErrorMessageEvent.CHANNEL) || this;
            _this.errorMessage = errorMessage;
            return _this;
        }
        return ErrorMessageEvent;
    }(i1$1.BusEvent));
    ErrorMessageEvent.CHANNEL = 'errorMessage';

    var ProductsEvent = /** @class */ (function (_super) {
        __extends(ProductsEvent, _super);
        function ProductsEvent(products) {
            var _this = _super.call(this, ProductsEvent.CHANNEL) || this;
            _this.products = products;
            return _this;
        }
        return ProductsEvent;
    }(i1$1.BusEvent));
    ProductsEvent.CHANNEL = 'products';

    var StocksEvent = /** @class */ (function (_super) {
        __extends(StocksEvent, _super);
        function StocksEvent(stocks) {
            var _this = _super.call(this, StocksEvent.CHANNEL) || this;
            _this.stocks = stocks;
            return _this;
        }
        return StocksEvent;
    }(i1$1.BusEvent));
    StocksEvent.CHANNEL = 'stocks';

    var CurrentBranchEvent = /** @class */ (function (_super) {
        __extends(CurrentBranchEvent, _super);
        function CurrentBranchEvent(branch, action) {
            if (action === void 0) { action = 'add'; }
            var _this = _super.call(this, CurrentBranchEvent.CHANNEL) || this;
            _this.branch = branch;
            _this.action = action;
            return _this;
        }
        return CurrentBranchEvent;
    }(i1$1.BusEvent));
    CurrentBranchEvent.CHANNEL = 'current-branch';

    var CurrentBusinessEvent = /** @class */ (function (_super) {
        __extends(CurrentBusinessEvent, _super);
        function CurrentBusinessEvent(business, action) {
            if (action === void 0) { action = 'add'; }
            var _this = _super.call(this, CurrentBusinessEvent.CHANNEL) || this;
            _this.business = business;
            _this.action = action;
            return _this;
        }
        return CurrentBusinessEvent;
    }(i1$1.BusEvent));
    CurrentBusinessEvent.CHANNEL = 'current-business';

    var UserLoggedEvent = /** @class */ (function (_super) {
        __extends(UserLoggedEvent, _super);
        function UserLoggedEvent(user) {
            var _this = _super.call(this, UserLoggedEvent.CHANNEL) || this;
            _this.user = user;
            return _this;
        }
        return UserLoggedEvent;
    }(i1$1.BusEvent));
    UserLoggedEvent.CHANNEL = 'current-user';

    var UserSubscriptionEvent = /** @class */ (function (_super) {
        __extends(UserSubscriptionEvent, _super);
        function UserSubscriptionEvent(subscription) {
            var _this = _super.call(this, UserSubscriptionEvent.CHANNEL) || this;
            _this.subscription = subscription;
            return _this;
        }
        return UserSubscriptionEvent;
    }(i1$1.BusEvent));
    UserSubscriptionEvent.CHANNEL = 'user-subscription';

    var BusinessesEvent = /** @class */ (function (_super) {
        __extends(BusinessesEvent, _super);
        function BusinessesEvent(businesses) {
            var _this = _super.call(this, BusinessesEvent.CHANNEL) || this;
            _this.businesses = businesses;
            return _this;
        }
        return BusinessesEvent;
    }(i1$1.BusEvent));
    BusinessesEvent.CHANNEL = 'businesses';

    var DraftProductEvent = /** @class */ (function (_super) {
        __extends(DraftProductEvent, _super);
        function DraftProductEvent(draftProduct, action) {
            if (action === void 0) { action = 'add'; }
            var _this = _super.call(this, DraftProductEvent.CHANNEL) || this;
            _this.draftProduct = draftProduct;
            _this.action = action;
            return _this;
        }
        return DraftProductEvent;
    }(i1$1.BusEvent));
    DraftProductEvent.CHANNEL = 'draftProduct';

    var DraftStockHistoryEvent = /** @class */ (function (_super) {
        __extends(DraftStockHistoryEvent, _super);
        function DraftStockHistoryEvent(draftStockHistory, action) {
            if (action === void 0) { action = 'add'; }
            var _this = _super.call(this, DraftStockHistoryEvent.CHANNEL) || this;
            _this.draftStockHistory = draftStockHistory;
            _this.action = action;
            return _this;
        }
        return DraftStockHistoryEvent;
    }(i1$1.BusEvent));
    DraftStockHistoryEvent.CHANNEL = 'draftStockHistory';

    var DraftStocksEvent = /** @class */ (function (_super) {
        __extends(DraftStocksEvent, _super);
        function DraftStocksEvent(draftStocks, action) {
            if (action === void 0) { action = 'add'; }
            var _this = _super.call(this, DraftStocksEvent.CHANNEL) || this;
            _this.draftStocks = draftStocks;
            _this.action = action;
            return _this;
        }
        return DraftStocksEvent;
    }(i1$1.BusEvent));
    DraftStocksEvent.CHANNEL = 'draftStocks';

    var DraftVariantsEvent = /** @class */ (function (_super) {
        __extends(DraftVariantsEvent, _super);
        function DraftVariantsEvent(draftVariants, action) {
            if (action === void 0) { action = 'add'; }
            var _this = _super.call(this, DraftVariantsEvent.CHANNEL) || this;
            _this.draftVariants = draftVariants;
            _this.action = action;
            return _this;
        }
        return DraftVariantsEvent;
    }(i1$1.BusEvent));
    DraftVariantsEvent.CHANNEL = 'draftVariants';

    var DefaultTaxesEvent = /** @class */ (function (_super) {
        __extends(DefaultTaxesEvent, _super);
        function DefaultTaxesEvent(defaultTax, action) {
            if (action === void 0) { action = 'add'; }
            var _this = _super.call(this, DefaultTaxesEvent.CHANNEL) || this;
            _this.defaultTax = defaultTax;
            _this.action = action;
            return _this;
        }
        return DefaultTaxesEvent;
    }(i1$1.BusEvent));
    DefaultTaxesEvent.CHANNEL = 'defaultTax';

    var TaxesEvent = /** @class */ (function (_super) {
        __extends(TaxesEvent, _super);
        function TaxesEvent(taxes, action) {
            if (action === void 0) { action = 'add'; }
            var _this = _super.call(this, TaxesEvent.CHANNEL) || this;
            _this.taxes = taxes;
            _this.action = action;
            return _this;
        }
        return TaxesEvent;
    }(i1$1.BusEvent));
    TaxesEvent.CHANNEL = 'taxes';

    var BranchesEvent = /** @class */ (function (_super) {
        __extends(BranchesEvent, _super);
        function BranchesEvent(branches) {
            var _this = _super.call(this, BranchesEvent.CHANNEL) || this;
            _this.branches = branches;
            return _this;
        }
        return BranchesEvent;
    }(i1$1.BusEvent));
    BranchesEvent.CHANNEL = 'branches';

    var CurrentStockEvent = /** @class */ (function (_super) {
        __extends(CurrentStockEvent, _super);
        function CurrentStockEvent(currentStock, action) {
            if (action === void 0) { action = 'add'; }
            var _this = _super.call(this, CurrentStockEvent.CHANNEL) || this;
            _this.currentStock = currentStock;
            _this.action = action;
            return _this;
        }
        return CurrentStockEvent;
    }(i1$1.BusEvent));
    CurrentStockEvent.CHANNEL = 'currentStock';

    var AnyEvent = /** @class */ (function (_super) {
        __extends(AnyEvent, _super);
        function AnyEvent(any_event) {
            var _this = _super.call(this, AnyEvent.CHANNEL) || this;
            _this.any_event = any_event;
            return _this;
        }
        return AnyEvent;
    }(i1$1.BusEvent));
    AnyEvent.CHANNEL = 'any-event';

    var fadeInScaleUpAnimation = animations.animation([
        animations.style({ opacity: 0, transform: 'scale(0.5)' }),
        animations.animate('{{ duration }} ease-in-out', animations.style({ opacity: 1, transform: 'scale(1)' })),
    ]);
    var fadeInAnimation = animations.animation([
        animations.style({ opacity: 0 }),
        animations.animate('{{ duration }} ease-in-out', animations.style({ opacity: 1 })),
    ]);
    var fadeOutAnimation = animations.animation([
        animations.style({ opacity: 1 }),
        animations.animate('{{ duration }} ease-in-out', animations.style({ opacity: 0 })),
    ]);

    var SettingsService = /** @class */ (function () {
        function SettingsService() {
        }
        SettingsService.prototype.countries = function () {
            return Object.values(this.httpGet('assets/lists/countries.json'));
        };
        SettingsService.prototype.currencies = function () {
            return Object.values(this.httpGet('assets/lists/currencies.json'));
        };
        SettingsService.prototype.timezones = function () {
            return Object.values(this.httpGet('assets/lists/timezones.json'));
        };
        SettingsService.prototype.units = function () {
            return Object.values(this.httpGet('assets/lists/units.json'));
        };
        SettingsService.prototype.reasons = function () {
            return Object.values(this.httpGet('assets/lists/reasons.json'));
        };
        SettingsService.prototype.httpGet = function (theUrl) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open('GET', theUrl, false); // false for synchronous request
            xmlHttp.send(null);
            return JSON.parse(xmlHttp.responseText);
        };
        return SettingsService;
    }());
    SettingsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SettingsService_Factory() { return new SettingsService(); }, token: SettingsService, providedIn: "root" });
    SettingsService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    SettingsService.ctorParameters = function () { return []; };

    var flipperUrl = 'http://localhost:8082';

    var Response = /** @class */ (function () {
        function Response() {
        }
        return Response;
    }());
    var PouchDBService = /** @class */ (function () {
        function PouchDBService(http, eventBus) {
            this.http = http;
            this.eventBus = eventBus;
            this.isInstantiated = false;
            this.listener = new i0.EventEmitter();
            this.listenerLogin = new i0.EventEmitter();
            // PouchDB.plugin(PouchFind);
            PouchDB__default['default'].plugin(require('pouchdb-find').default);
            this.connect('main');
            debugPouch__default['default'](PouchDB__default['default']);
            this.sync([localStorage.getItem('userId')]); //we keep the current logged userId in local storage for quick access
        }
        PouchDBService.prototype.activeUser = function (table) {
            var _this = this;
            if (table === void 0) { table = 'users'; }
            return this.database
                .createIndex({
                index: { fields: ['table', 'active'] },
            })
                .then(function () {
                return _this.database.find({
                    selector: {
                        table: { $eq: table },
                        active: { $eq: true },
                    },
                });
            });
        };
        PouchDBService.prototype.query = function (fields, selector) {
            var _this = this;
            if (fields === void 0) { fields = []; }
            if (selector === void 0) { selector = {}; }
            return this.database
                .createIndex({
                index: { fields: fields },
            })
                .then(function () {
                return _this.database.find({
                    selector: selector,
                });
            });
        };
        PouchDBService.prototype.fastQuery = function (fields, selector) {
            if (fields === void 0) { fields = []; }
            if (selector === void 0) { selector = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var result, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.database.createIndex({
                                    index: { fields: fields },
                                })];
                        case 1:
                            result = _a.sent();
                            return [4 /*yield*/, this.database.find({
                                    selector: selector,
                                })];
                        case 2:
                            // Query the Index using find().
                            result = _a.sent();
                            return [4 /*yield*/, result.docs];
                        case 3: 
                        // Found docs are in result.docs
                        return [2 /*return*/, _a.sent()];
                        case 4:
                            err_1 = _a.sent();
                            console.log(err_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        PouchDBService.prototype.callbackQuery = function (fields, selector, callback) {
            if (fields === void 0) { fields = []; }
            if (selector === void 0) { selector = {}; }
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
        };
        PouchDBService.prototype.activeBusiness = function (userId, table) {
            var _this = this;
            if (table === void 0) { table = 'businesses'; }
            // comment
            return this.database
                .createIndex({
                index: { fields: ['table', 'active', 'userId'] },
            })
                .then(function () {
                return _this.database.find({
                    selector: {
                        table: { $eq: table },
                        active: { $eq: true },
                        userId: { $eq: userId },
                    },
                });
            });
        };
        PouchDBService.prototype.hasDraftProduct = function (businessId, table) {
            var _this = this;
            if (table === void 0) { table = 'products'; }
            // comment
            return this.database
                .createIndex({
                index: { fields: ['table', 'isDraft', 'businessId'] },
            })
                .then(function () {
                return _this.database.find({
                    selector: {
                        table: { $eq: table },
                        isDraft: { $eq: true },
                        businessId: { $eq: businessId },
                    },
                });
            });
        };
        PouchDBService.prototype.currentBusiness = function () {
            var _this = this;
            return this.activeUser().then(function (user) {
                if (user && user.docs.length > 0) {
                    return _this.activeBusiness(user.docs[0].id, 'businesses').then(function (business) {
                        if (business && business.docs.length > 0) {
                            return business.docs[0];
                        }
                    });
                }
            });
        };
        PouchDBService.prototype.currentTax = function () {
            var _this = this;
            // TODO: migrate this
            return this.activeUser().then(function (user) {
                if (user && user.docs.length > 0) {
                    return _this.activeBusiness(user.docs[0].id, 'businesses').then(function (business) {
                        if (business && business.docs.length > 0) {
                            return _this.database
                                .query(['table', 'businessId', 'isDefault'], {
                                table: { $eq: 'taxes' },
                                businessId: { $eq: business.docs[0].id },
                                isDefault: { $eq: true },
                            })
                                .then(function (res) {
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
        };
        PouchDBService.prototype.listBusinessBranches = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.http
                                .get(flipperUrl + '/api/business')
                                .toPromise()
                                .then(function (business) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!business) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.http
                                                    .get(flipperUrl + '/api/branches/' + business.id)
                                                    .toPromise()
                                                    .then(function (branches) {
                                                    return branches;
                                                })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1: 
                        // I put any on the first promise as my intention is to return a list of branches not businesses
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        PouchDBService.prototype.listBusinessTaxes = function () {
            var _this = this;
            return this.currentBusiness().then(function (business) {
                if (business) {
                    return _this.query(['table', 'businessId'], {
                        table: { $eq: 'taxes' },
                        businessId: { $eq: business.id },
                    }).then(function (res) {
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
        };
        PouchDBService.prototype.listBusinessTaxes2 = function () {
            var _this = this;
            return this.currentBusiness().then(function (business) {
                if (business) {
                    return _this.callbackQuery(['table', 'businessId'], {
                        table: { $eq: 'taxes' },
                        businessId: { $eq: business.id },
                    }, function (res) {
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
        };
        PouchDBService.prototype.activeBranch = function (businessId, table) {
            var _this = this;
            if (table === void 0) { table = 'branches'; }
            return this.database
                .createIndex({
                index: { fields: ['tables', 'active', 'businessId'] },
            })
                .then(function () {
                return _this.database.find({
                    selector: {
                        table: { $eq: table },
                        active: { $eq: true },
                        businessId: { $eq: businessId },
                    },
                });
            });
        };
        PouchDBService.prototype.connect = function (dbName, filter) {
            if (filter === void 0) { filter = null; }
            if (!this.isInstantiated) {
                this.database = new PouchDB__default['default']('main');
                console.log('did couchbase connected?');
                if (filter != null) {
                    this.database.changes({
                        filter: function (doc) {
                            //make sure we filter only to listen on our document of intrest.
                            // TODO: see if we need this as not filter can be part of the sync function
                            return doc.channels[0] === filter;
                        },
                    });
                }
                this.isInstantiated = true;
            }
        };
        PouchDBService.prototype.fetch = function () {
            return this.database.allDocs({ include_docs: true });
        };
        PouchDBService.prototype.get = function (id) {
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
        };
        PouchDBService.prototype.remove = function (document) {
            try {
                return this.database.remove(document);
            }
            catch (e) {
                console.log('did not removed', e);
            }
        };
        PouchDBService.prototype.find = function (id) {
            return this.get(id).then(function (result) {
                return result;
            }, function (error) {
                if (error.status === '404') {
                    throw new Error("ERROR:" + error);
                }
                else {
                    return new Promise(function (_resolve, reject) {
                        reject(error);
                    });
                }
            });
        };
        PouchDBService.prototype.getResponse = function (result, isArray) {
            if (!Array.isArray(result) && isArray) {
                return [result];
            }
            if (Array.isArray(result) && !isArray) {
                return result[0];
            }
            return result;
        };
        PouchDBService.prototype.makeid = function (length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };
        PouchDBService.prototype.uid = function () {
            return uuid.v1();
        };
        PouchDBService.prototype.put = function (id, document) {
            var _this = this;
            document._id = id;
            document.uid = this.uid();
            document.channel = localStorage.getItem('userId');
            document.channels = [localStorage.getItem('userId')];
            return this.get(id).then(function (result) {
                document._rev = result._rev;
                console.log('updated doc', document);
                return _this.database.put(document);
            }, function (error) {
                console.log('error on update', error);
                if (error.status === '404' || error.status === 404) {
                    return _this.database.put(document);
                }
                else {
                    return new Promise(function (_resolve, reject) {
                        reject(error);
                    });
                }
            });
        };
        PouchDBService.prototype.sync = function (channels) {
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
        };
        PouchDBService.prototype.getChangeListener = function () {
            return this.listener;
        };
        PouchDBService.prototype.getChangeListenerLogin = function () {
            return this.listenerLogin;
        };
        PouchDBService.prototype.unique = function (a, key) {
            if (key === void 0) { key = 'name'; }
            return a.length > 0 ? this.removeDuplicates(a, key) : [];
        };
        PouchDBService.prototype.contains = function (array, obj, key) {
            var e_1, _a;
            try {
                for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
                    var newObj = array_1_1.value;
                    if (this.isEqual(newObj, obj, key)) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
        // comparator
        PouchDBService.prototype.isEqual = function (obj1, obj2, key) {
            if (obj1[key] === obj2[key]) {
                return true;
            }
            return false;
        };
        PouchDBService.prototype.removeDuplicates = function (ary, key) {
            var _this = this;
            var arr = [];
            return ary.filter(function (x) {
                return !_this.contains(arr, x, key) && arr.push(x);
            });
        };
        return PouchDBService;
    }());
    PouchDBService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PouchDBService_Factory() { return new PouchDBService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i1$1.FlipperEventBusService)); }, token: PouchDBService, providedIn: "root" });
    PouchDBService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    PouchDBService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: i1$1.FlipperEventBusService }
    ]; };

    var APP_CONFIG = new i0.InjectionToken('APP_CONFIG');
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
    })(exports.TABLES || (exports.TABLES = {}));
    var DEFAULT_FLIPPER_DB_CONFIG = {
        database: { name: 'flipper', engine: 'LOCALSTORAGE' },
        tables: [
            {
                name: exports.TABLES.USER,
                query: "id STRING,\n                    name STRING,\n                    email STRING,\n                    active BOOL,\n                    token STRING,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n            ",
            },
            {
                name: exports.TABLES.BUSINESSCATEGORY,
                query: "id STRING,\n                    name STRING,\n                    typeId STRING,\n                    syncedOnline BOOL,\n                    PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.REASON,
                query: "id STRING,\n                    name STRING,\n                    operation STRING,\n                    active BOOL,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n                 ",
            },
            {
                name: exports.TABLES.TYPES,
                query: "id STRING,\n                    name STRING,\n                    syncedOnline BOOL,\n                    PRIMARY KEY (id)\n            ",
            },
            {
                name: exports.TABLES.MENU,
                query: "id int(11) NOT NULL AUTO_INCREMENT,\n                name STRING,\n                icon STRING,\n                route STRING,\n                active BOOL,\n                isSetting BOOL,\n                PRIMARY KEY (id)",
            },
            {
                name: exports.TABLES.BUSINESS,
                query: "\n                id STRING,\n                name STRING,\n                country STRING,\n                currency STRING,\n                businessUrl STRING,\n                timeZone STRING,\n                active BOOL,\n                userId STRING,\n                typeId STRING,\n                categoryId STRING,\n                createdAt DATETIME,\n                updatedAt DATETIME,\n                PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.BRANCHES,
                query: "\n                id STRING,\n                name STRING,\n                active BOOL,\n                businessId STRING,\n                mapLatitude STRING NULL,\n                mapLongitude STRING NULL,\n                createdAt DATETIME,\n                updatedAt DATETIME,\n                PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.USERBUSINESS,
                query: "id STRING,\n                    userId STRING,\n                    businessId STRING,\n                    PRIMARY KEY (id)\n                    ",
            },
            {
                name: exports.TABLES.TAXES,
                query: "id STRING,\n                    name STRING,\n                    percentage int(11),\n                    active BOOL,\n                    isDefault BOOL,\n                    businessId STRING,\n                    channel STRING,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n                        ",
            },
            {
                name: exports.TABLES.PRODUCTS,
                query: "id STRING,\n                    name STRING,\n                    categoryId int(11) NULL,\n                    description STRING NULL,\n                    picture STRING NULL,\n                    taxId int(11) NULL,\n                    active BOOL,\n                    hasPicture BOOL,\n                    isDraft BOOL,\n                    isCurrentUpdate BOOL,\n                    businessId STRING,\n                    supplierId STRING NULL,\n                    channel STRING,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.BRANCHPRODUCTS,
                query: "id STRING,\n                    productId STRING,\n                    branchId STRING,\n                    channel STRING,\n                    PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.VARIANTS,
                query: "id STRING,\n                    name STRING,\n                    sku STRING,\n                    productId STRING,\n                    unit STRING NULL,\n                    channel STRING,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.STOCKS,
                query: " id STRING,\n                    branchId STRING,\n                    variantId STRING,\n                    productId STRING,\n                    lowStock STRING,\n                    currentStock STRING,\n                    supplyPrice int(11) NULL,\n                    retailPrice int(11) NULL,\n                    canTrackingStock BOOL,\n                    showLowStockAlert BOOL,\n                    channel STRING,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.ORDER,
                query: "id STRING,\n                    branchId STRING NOT NULL,\n                    deviceId STRING NULL,\n                    orderNumber STRING NOT NULL,\n                    customerId STRING NULL,\n                    status STRING NOT NULL,\n                    reference STRING NULL,\n                    orderType STRING NOT NULL,\n                    supplierId STRING NULL,\n                    subTotal int(11) NULL,\n                    supplierInvoiceNumber STRING NULL,\n                    taxRate int(11) NULL,\n                    taxAmount int(11) NULL,\n                    discountRate int(11) NULL,\n                    discountAmount int(11) NULL,\n                    cashReceived int(11) NULL,\n                    customerChangeDue int(11) NULL,\n                    saleTotal int(11) NULL,\n                    paymentId STRING NULL,\n                    orderNote STRING NULL,\n                    active BOOL,\n                    isDraft BOOL,\n                    channel STRING,\n                    deliverDate DATETIME,\n                    orderDate DATETIME,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.ORDERDETAILS,
                query: " id STRING NOT NULL,\n                    orderId STRING NOT NULL,\n                    variantId STRING NOT NULL,\n                    variantName STRING NOT NULL,\n                    price int(11) NULL,\n                    quantity int(11) NOT NULL,\n                    unit STRING NULL,\n                    taxAmount int(11) NULL,\n                    taxRate int(11) NULL,\n                    discountAmount int(11) NULL,\n                    discountRate int(11) NULL,\n                    subTotal int(11) NULL,\n                    note STRING NULL,\n                    channel STRING,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.STOCKHISTORY,
                query: "id STRING,\n                    variantId STRING,\n                    stockId STRING,\n                    productId STRING,\n                    quantity int(11) NOT NULL,\n                    reason STRING NULL,\n                    note STRING NULL,\n                    channel STRING,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.DEVICE,
                query: " id int(11) NOT NULL AUTO_INCREMENT,\n                    branchId int(11) NOT NULL,\n                    name int(11) NOT NULL,\n                    token STRING NOT NULL,\n                    channel STRING,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n                ",
            },
            {
                name: exports.TABLES.RECEIPT,
                query: " id int(11) NOT NULL AUTO_INCREMENT,\n                    branchId int(11) NOT NULL,\n                    businessName int(11) NOT NULL,\n                    digitalLogo STRING  NULL,\n                    printedLogo STRING  NULL,\n                    showLocation BOOL  NULL,\n                    color STRING  NULL,\n                    address1 STRING  NULL,\n                    address1 STRING  NULL,\n                    city STRING  NULL,\n                    customerText STRING  NULL,\n                    returnPolicy STRING  NULL,\n                    showItemNote BOOL  NULL,\n                    channel STRING,\n                    createdAt DATETIME,\n                    updatedAt DATETIME,\n                    PRIMARY KEY (id)\n                ",
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
    var Tables = {
        user: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.USER,
        business: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.BUSINESS,
        branch: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.BRANCHES,
        menu: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.MENU,
        type: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.TYPES,
        businessCategory: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.BUSINESSCATEGORY,
        userBusiness: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.USERBUSINESS,
        taxes: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.TAXES,
        variants: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.VARIANTS,
        products: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.PRODUCTS,
        stocks: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.STOCKS,
        branchProducts: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.BRANCHPRODUCTS,
        reasons: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.REASON,
        order: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.ORDER,
        orderDetails: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.ORDERDETAILS,
        stockHistory: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + exports.TABLES.STOCKHISTORY,
    };
    var PouchConfig = {
        channel: localStorage.getItem('channel'),
        sessionId: localStorage.getItem('sessionId'),
        // bucket: localStorage.getItem('bucket'),
        bucket: 'main',
        syncUrl: 'http://yegobox.com:4985/main',
        canSync: true,
        user: 'admin',
        password: 'singlworld',
        Tables: {
            user: exports.TABLES.USER + '_' + localStorage.getItem('channel'),
            business: exports.TABLES.BUSINESS + '_' + localStorage.getItem('channel'),
            branches: exports.TABLES.BRANCHES + '_' + localStorage.getItem('channel'),
            menus: exports.TABLES.MENU,
            businessTypes: exports.TABLES.TYPES,
            businessCategories: exports.TABLES.BUSINESSCATEGORY,
            businessUsers: exports.TABLES.USERBUSINESS + '_' + localStorage.getItem('channel'),
            taxes: exports.TABLES.TAXES + '_' + localStorage.getItem('channel'),
            variants: exports.TABLES.VARIANTS + '_' + localStorage.getItem('channel'),
            products: exports.TABLES.PRODUCTS + '_' + localStorage.getItem('channel'),
            branchProducts: exports.TABLES.BRANCHPRODUCTS + '_' + localStorage.getItem('channel'),
            reasons: exports.TABLES.REASON + '_' + localStorage.getItem('channel'),
            orders: exports.TABLES.ORDER + '_' + localStorage.getItem('channel'),
            orderDetails: exports.TABLES.ORDERDETAILS + '_' + localStorage.getItem('channel'),
            stockHistories: exports.TABLES.STOCKHISTORY + '_' + localStorage.getItem('channel'),
            subscription: exports.TABLES.SUBSCRIPTION + '_' + localStorage.getItem('channel'),
            stocks: exports.TABLES.STOCKS + '_' + localStorage.getItem('channel'),
        },
    };
    // localStorage.setItem("lastname", "Smith");

    var ActiveUser = /** @class */ (function () {
        function ActiveUser(eventBus, database) {
            this.eventBus = eventBus;
            this.database = database;
            this.currentUser = null;
            this.database.connect(PouchConfig.bucket);
            this.init();
        }
        ActiveUser.prototype.init = function () {
            var _this = this;
            this.user();
            this.eventBus
                .of(UserLoggedEvent.CHANNEL)
                .pipe(operators$1.filter(function (e) { return e.user && (e.user.id !== null || e.user.id !== undefined); }))
                .subscribe(function (res) { return (_this.currentUser = res.user); });
        };
        ActiveUser.prototype.get = function (prop) {
            return this.currentUser && this.currentUser[prop];
        };
        ActiveUser.prototype.set = function (key, value) {
            this.currentUser[key] = value;
        };
        ActiveUser.prototype.user = function (table) {
            if (table === void 0) { table = null; }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.database.activeUser().then(function (res) {
                                if (res.docs && res.docs.length > 0) {
                                    _this.eventBus.publish(new UserLoggedEvent(res.docs[0]));
                                }
                            }, function (error) {
                                if ((error.error && error.status === '404') || error.status === 404) {
                                    _this.eventBus.publish(new UserLoggedEvent(null));
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ActiveUser;
    }());
    ActiveUser.ɵprov = i0.ɵɵdefineInjectable({ factory: function ActiveUser_Factory() { return new ActiveUser(i0.ɵɵinject(i1$1.FlipperEventBusService), i0.ɵɵinject(PouchDBService)); }, token: ActiveUser, providedIn: "root" });
    ActiveUser.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ActiveUser.ctorParameters = function () { return [
        { type: i1$1.FlipperEventBusService },
        { type: PouchDBService }
    ]; };

    var ActiveBusiness = /** @class */ (function () {
        function ActiveBusiness(eventBus, database, currentUser) {
            var _this = this;
            this.eventBus = eventBus;
            this.database = database;
            this.currentUser = currentUser;
            this.currentBusiness = null;
            this.database.connect(PouchConfig.bucket);
            this.eventBus
                .of(CurrentBusinessEvent.CHANNEL)
                .pipe(operators$1.filter(function (e) { return e.business && (e.business.id !== null || e.business.id !== undefined); }))
                .subscribe(function (res) { return (_this.currentBusiness = res.business); });
            this.business();
        }
        ActiveBusiness.prototype.get = function (prop) {
            return this.currentBusiness && this.currentBusiness[prop];
        };
        ActiveBusiness.prototype.set = function (key, value) {
            this.currentBusiness[key] = value;
        };
        ActiveBusiness.prototype.business = function (table) {
            if (table === void 0) { table = 'businesses'; }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.currentUser.get('id') != 'undefined' ||
                                this.currentUser.get('id') != undefined ||
                                this.currentUser.get('id') != null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.database.activeBusiness(this.currentUser.get('id'), table).then(function (res) {
                                    if (res.docs && res.docs.length > 0) {
                                        _this.eventBus.publish(new CurrentBusinessEvent(res.docs[0]));
                                    }
                                }, function (error) {
                                    if ((error.error && error.status === '404') || error.status === 404) {
                                        _this.eventBus.publish(new CurrentBusinessEvent(null));
                                    }
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return ActiveBusiness;
    }());
    ActiveBusiness.ɵprov = i0.ɵɵdefineInjectable({ factory: function ActiveBusiness_Factory() { return new ActiveBusiness(i0.ɵɵinject(i1$1.FlipperEventBusService), i0.ɵɵinject(PouchDBService), i0.ɵɵinject(ActiveUser)); }, token: ActiveBusiness, providedIn: "root" });
    ActiveBusiness.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ActiveBusiness.ctorParameters = function () { return [
        { type: i1$1.FlipperEventBusService },
        { type: PouchDBService },
        { type: ActiveUser }
    ]; };

    var ActiveBranch = /** @class */ (function () {
        function ActiveBranch(eventBus, database, currentBusiness) {
            var _this = this;
            this.eventBus = eventBus;
            this.database = database;
            this.currentBusiness = currentBusiness;
            this.currentBranch = null;
            this.database.connect(PouchConfig.bucket);
            this.eventBus
                .of(CurrentBranchEvent.CHANNEL)
                .pipe(operators$1.filter(function (e) { return e.branch && (e.branch.id !== null || e.branch.id !== undefined); }))
                .subscribe(function (res) { return (_this.currentBranch = res.branch); });
            this.branch();
        }
        ActiveBranch.prototype.get = function (prop) {
            return this.currentBranch && this.currentBranch[prop];
        };
        ActiveBranch.prototype.set = function (key, value) {
            this.currentBranch[key] = value;
        };
        ActiveBranch.prototype.branch = function (table) {
            if (table === void 0) { table = 'branches'; }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.currentBusiness.get('id') != 'undefined' ||
                                this.currentBusiness.get('id') != undefined ||
                                this.currentBusiness.get('id') != null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.database.activeBranch(this.currentBusiness.get('id'), table).then(function (res) {
                                    if (res.docs && res.docs.length > 0) {
                                        _this.eventBus.publish(new CurrentBranchEvent(res.docs[0]));
                                    }
                                }, function (error) {
                                    if ((error.error && error.status === '404') || error.status === 404) {
                                        _this.eventBus.publish(new CurrentBranchEvent(null));
                                    }
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return ActiveBranch;
    }());
    ActiveBranch.ɵprov = i0.ɵɵdefineInjectable({ factory: function ActiveBranch_Factory() { return new ActiveBranch(i0.ɵɵinject(i1$1.FlipperEventBusService), i0.ɵɵinject(PouchDBService), i0.ɵɵinject(ActiveBusiness)); }, token: ActiveBranch, providedIn: "root" });
    ActiveBranch.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ActiveBranch.ctorParameters = function () { return [
        { type: i1$1.FlipperEventBusService },
        { type: PouchDBService },
        { type: ActiveBusiness }
    ]; };

    var LocalStorageSaveOptions = /** @class */ (function () {
        function LocalStorageSaveOptions() {
        }
        return LocalStorageSaveOptions;
    }());
    var CacheService = /** @class */ (function () {
        function CacheService() {
        }
        CacheService.prototype.save = function (options) {
            // Set default values for optionals
            options.expirationMins = options.expirationMins || 0;
            // Set expiration date in miliseconds
            var expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0;
            var record = {
                value: typeof options.data === 'string' ? options.data : JSON.stringify(options.data),
                expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
                hasExpiration: expirationMS !== 0 ? true : false,
            };
            localStorage.setItem(options.key, JSON.stringify(record));
        };
        CacheService.prototype.load = function (key) {
            // Get cached data from localstorage
            var item = localStorage.getItem(key);
            if (item !== null) {
                var record = JSON.parse(item);
                var now = new Date().getTime();
                // Expired data will return null
                if (!record || (record.hasExpiration && record.expiration <= now)) {
                    return null;
                }
                else {
                    return JSON.parse(record.value);
                }
            }
            return null;
        };
        CacheService.prototype.remove = function (key) {
            localStorage.removeItem(key);
        };
        CacheService.prototype.cleanLocalStorage = function () {
            localStorage.clear();
        };
        return CacheService;
    }());
    CacheService.ɵprov = i0.ɵɵdefineInjectable({ factory: function CacheService_Factory() { return new CacheService(); }, token: CacheService, providedIn: "root" });
    CacheService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    CacheService.ctorParameters = function () { return []; };

    /*
     * Public API Surface of components
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.APP_CONFIG = APP_CONFIG;
    exports.ActiveBranch = ActiveBranch;
    exports.ActiveBusiness = ActiveBusiness;
    exports.ActiveUser = ActiveUser;
    exports.AnyEvent = AnyEvent;
    exports.ArrayRemoveItemPipe = ArrayRemoveItemPipe;
    exports.Branch = Branch;
    exports.BranchProducts = BranchProducts;
    exports.BranchProductsEvent = BranchProductsEvent;
    exports.BranchesEvent = BranchesEvent;
    exports.Business = Business;
    exports.BusinessCategory = BusinessCategory;
    exports.BusinessesEvent = BusinessesEvent;
    exports.CHANNELS = CHANNELS;
    exports.CacheService = CacheService;
    exports.CalculateTotalClassPipe = CalculateTotalClassPipe;
    exports.CurrentBranchEvent = CurrentBranchEvent;
    exports.CurrentBusinessEvent = CurrentBusinessEvent;
    exports.CurrentStockEvent = CurrentStockEvent;
    exports.DEFAULT_FLIPPER_DB_CONFIG = DEFAULT_FLIPPER_DB_CONFIG;
    exports.DashBoardEntries = DashBoardEntries;
    exports.DefaultTaxesEvent = DefaultTaxesEvent;
    exports.DraftProductEvent = DraftProductEvent;
    exports.DraftStockHistoryEvent = DraftStockHistoryEvent;
    exports.DraftStocksEvent = DraftStocksEvent;
    exports.DraftVariantsEvent = DraftVariantsEvent;
    exports.ErrorMessageEvent = ErrorMessageEvent;
    exports.FindKeyPipe = FindKeyPipe;
    exports.FlipperComponentsModule = FlipperComponentsModule;
    exports.GenerateBarcodeComponent = GenerateBarcodeComponent;
    exports.HeaderComponent = HeaderComponent;
    exports.Items = Items;
    exports.Labels = Labels;
    exports.LazyIfDirective = LazyIfDirective;
    exports.LoadingIconComponent = LoadingIconComponent;
    exports.LocalStorageSaveOptions = LocalStorageSaveOptions;
    exports.MatchHeightDirective = MatchHeightDirective;
    exports.Menu = Menu;
    exports.MenuEntries = MenuEntries;
    exports.MergeArryByIdPipe = MergeArryByIdPipe;
    exports.MessageComponent = MessageComponent;
    exports.NotificationListComponent = NotificationListComponent;
    exports.NotificationService = NotificationService;
    exports.Order = Order;
    exports.OrderDetails = OrderDetails;
    exports.OrderEvent = OrderEvent;
    exports.PouchConfig = PouchConfig;
    exports.PouchDBService = PouchDBService;
    exports.Price = Price;
    exports.PriceEvent = PriceEvent;
    exports.PriceVariant = PriceVariant;
    exports.PriceVariantEvent = PriceVariantEvent;
    exports.Product = Product;
    exports.ProductEvent = ProductEvent;
    exports.ProductsEvent = ProductsEvent;
    exports.Reason = Reason;
    exports.RoundNumberPipe = RoundNumberPipe;
    exports.RouterProgressComponent = RouterProgressComponent;
    exports.SettingsService = SettingsService;
    exports.ShoppingEvent = ShoppingEvent;
    exports.SpinnerComponent = SpinnerComponent;
    exports.Stock = Stock;
    exports.StockHistory = StockHistory;
    exports.StocksEvent = StocksEvent;
    exports.Subscription = Subscription;
    exports.TableOverlayComponent = TableOverlayComponent;
    exports.Tables = Tables;
    exports.Taxes = Taxes;
    exports.TaxesEvent = TaxesEvent;
    exports.Total = Total;
    exports.Types = Types;
    exports.User = User;
    exports.UserBusiness = UserBusiness;
    exports.UserLoggedEvent = UserLoggedEvent;
    exports.UserSubscriptionEvent = UserSubscriptionEvent;
    exports.Variant = Variant;
    exports.VariantEvent = VariantEvent;
    exports.VariantsEvent = VariantsEvent;
    exports.fadeInAnimation = fadeInAnimation;
    exports.fadeInScaleUpAnimation = fadeInScaleUpAnimation;
    exports.fadeOutAnimation = fadeOutAnimation;
    exports.ɵa = Price;
    exports.ɵb = PriceVariant;
    exports.ɵc = Product;
    exports.ɵd = OrderDetails;
    exports.ɵe = Branch;
    exports.ɵf = Business;
    exports.ɵg = User;
    exports.ɵh = Subscription;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=enexus-flipper-components.umd.js.map
