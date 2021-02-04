import { Component, ViewChild, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Input, HostListener, } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
export class SearchBoxComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLXBvcy9zcmMvbGliL2NvbW1vbi9zZWFyY2gtYm94L3NlYXJjaC1ib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsU0FBUyxFQUVULE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsS0FBSyxFQUNMLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQTtBQUl0QixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQTtBQVN2RSxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBV2pDLG9CQUFlLEdBQUcsS0FBSyxDQUFBO1FBY3JCLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQTtRQUM1QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUE7UUFHekMsYUFBUSxHQUFHLElBQUksQ0FBQTtRQUNoQixZQUFPLEdBQUcsS0FBSyxDQUFBO1FBRXRCLGdCQUFXLEdBQUcsS0FBSyxDQUFBO1FBTVgsb0JBQWUsR0FBYyxFQUFFLENBQUE7UUFLOUIsYUFBUSxHQUFHLEtBQUssQ0FBQTtRQXFCekIsVUFBSyxHQUFHLElBQUksQ0FBQTtJQWhFZ0MsQ0FBQztJQUU3QyxJQUNJLFlBQVksQ0FBQyxLQUFnQjtRQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQTtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtRQUNwQixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUNELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQTtJ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LFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgSW5wdXQsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuaW1wb3J0IHsgVmFyaWFudCB9IGZyb20gJ0BlbmV4dXMvZmxpcHBlci1jb21wb25lbnRzJ1xyXG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJ1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmbGlwcGVyLXNlYXJjaC1ib3gnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtYm94LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtYm94LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaEJveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIEBJbnB1dCgnZm91bmRWYXJpYW50JylcclxuICBzZXQgZm91bmRWYXJpYW50KHZhbHVlOiBWYXJpYW50W10pIHtcclxuICAgIHRoaXMuY2FuZm91bmRWYXJpYW50ID0gdmFsdWVcclxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICB0aGlzLmFkZFRvQ2FydE9uR290U2luZ2xlSXRlbSh2YWx1ZSlcclxuICB9XHJcbiAgZ2V0IGZvdW5kVmFyaWFudCgpOiBWYXJpYW50W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FuZm91bmRWYXJpYW50XHJcbiAgfVxyXG4gIHByaXZhdGUgdXNlckNsb3NlZE1vZGVsID0gZmFsc2VcclxuXHJcbiAgQElucHV0KCdkaWRVc2VyQ2xvc2VNb2RlbCcpXHJcbiAgc2V0IGRpZFVzZXJDbG9zZU1vZGVsKGJvbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy51c2VyQ2xvc2VkTW9kZWwgPSBib2xcclxuXHJcbiAgICBpZiAoYm9sID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJTZWFyY2hCb3goKVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXQgZGlkVXNlckNsb3NlTW9kZWwoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyQ2xvc2VkTW9kZWxcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBzZWFyY2hFbWl0VmFsdWUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKVxyXG4gIEBPdXRwdXQoKSBhZGRUb0NhcnRFbWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KClcclxuXHJcbiAgcHVibGljIHNlYXJjaENvbnRyb2w6IEZvcm1Db250cm9sXHJcbiAgcHJpdmF0ZSBkZWJvdW5jZSA9IDEwMDBcclxuICBwdWJsaWMgbG9hZGluZyA9IGZhbHNlXHJcbiAgcHVibGljIGV2ZW50OiBLZXlib2FyZEV2ZW50XHJcbiAgaXNTZWFyY2hpbmcgPSBmYWxzZVxyXG5cclxuICBAVmlld0NoaWxkKCdteVNlYXJjaElucHV0Jywge1xyXG4gICAgc3RhdGljOiBmYWxzZSxcclxuICB9KVxyXG4gIHB1YmxpYyBzZWFyY2hJbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWZcclxuICBwcml2YXRlIGNhbmZvdW5kVmFyaWFudDogVmFyaWFudFtdID0gW11cclxuXHJcbiAgQFZpZXdDaGlsZCgnYXV0b0NvbXBsZXRlSW5wdXQnLCB7IHJlYWQ6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIsIHN0YXRpYzogZmFsc2UgfSlcclxuICBhdXRvQ29tcGxldGU6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXJcclxuXHJcbiAgQElucHV0KCkgY3VycmVuY3kgPSAnUldGJ1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcclxuICBvbktleWRvd25IYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnRcclxuICAgIGlmICgodGhpcy5ldmVudC5zaGlmdEtleSAmJiB0aGlzLmV2ZW50LmtleSA9PT0gJ0YnKSB8fCAodGhpcy5ldmVudC5zaGlmdEtleSAmJiB0aGlzLmV2ZW50LmtleSA9PT0gJ1MnKSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmNsZWFyU2VhcmNoQm94KClcclxuICAgICAgfSwgMilcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmV2ZW50LmtleSA9PT0gJ1NoaWZ0Jykge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmJsdXIoKVxyXG4gICAgICAgIHRoaXMuY2xvc2UoKVxyXG4gICAgICB9LCAyKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLmF1dG9Db21wbGV0ZS5jbG9zZVBhbmVsKClcclxuICB9XHJcbiAgdGltZXIgPSBudWxsXHJcbiAgc3RhcnRTZWFyY2hpbmcoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC50YXJnZXQudmFsdWUgPT09ICcnIHx8IGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmZvdW5kVmFyaWFudCA9IFtdXHJcbiAgICAgIHRoaXMuY2xlYXJTZWFyY2hCb3goKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxyXG4gICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmZvdW5kVmFyaWFudCA9IFtdXHJcbiAgICAgIHRoaXMuc2VhcmNoaW5nKGV2ZW50LnRhcmdldC52YWx1ZSlcclxuICAgIH0sIDEwMDApXHJcbiAgfVxyXG5cclxuICBzZWFyY2hpbmcocXVlcnkpIHtcclxuICAgIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgIHRoaXMuaXNTZWFyY2hpbmcgPSB0cnVlXHJcbiAgICB0aGlzLnNlYXJjaEVtaXRWYWx1ZS5lbWl0KHF1ZXJ5KVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyB0aGlzLnNlYXJjaENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xyXG4gICAgLy8gdGhpcy5zZWFyY2hDb250cm9sLnZhbHVlQ2hhbmdlc1xyXG4gICAgLy8gICAucGlwZShkZWJvdW5jZVRpbWUodGhpcy5kZWJvdW5jZSksXHJcbiAgICAvLyAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgIC8vICAgICAgICAgKVxyXG4gICAgLy8gICAgICAgLnN1YnNjcmliZShxdWVyeSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGlmIChxdWVyeSA9PT0gJycgfHwgcXVlcnkgPT09IG51bGwpIHtcclxuICAgIC8vICAgICAgICAgICB0aGlzLmlzU2VhcmNoaW5nID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuaXNTZWFyY2hpbmcgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNlYXJjaEVtaXRWYWx1ZS5lbWl0KHF1ZXJ5KTtcclxuICAgIC8vICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpXHJcbiAgICB9KVxyXG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKClcclxuICB9XHJcblxyXG4gIGFkZFRvQ2FydE9uR290U2luZ2xlSXRlbSh2YXJpYW50czogVmFyaWFudFtdKSB7XHJcbiAgICBpZiAodmFyaWFudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHRoaXMuYWRkVG9DYXJ0KHZhcmlhbnRzWzBdKVxyXG4gICAgICB0aGlzLmNsZWFyU2VhcmNoQm94KClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFRvQ2FydCh2YXJpYW50OiBhbnkpIHtcclxuICAgIHZhcmlhbnQucXVhbnRpdHkgPSAxXHJcbiAgICB0aGlzLmFkZFRvQ2FydEVtaXQuZW1pdCh2YXJpYW50KVxyXG4gICAgdGhpcy5jbGVhclNlYXJjaEJveCgpXHJcbiAgfVxyXG4gIGZvY3VzaW5nKCkge1xyXG4gICAgdGhpcy5jbGVhclNlYXJjaEJveCgpXHJcbiAgfVxyXG5cclxuICBjbGVhclNlYXJjaEJveCgpIHtcclxuICAgIGlmICh0aGlzLnNlYXJjaElucHV0RWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJ1xyXG4gICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKClcclxuICAgICAgdGhpcy5pc1NlYXJjaGluZyA9IGZhbHNlXHJcbiAgICAgIHRoaXMuY2xvc2UoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=