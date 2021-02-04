import { Component, Input } from '@angular/core';
export class TableOverlayComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb3ZlcmxheS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLWNvbXBvbmVudHMvc3JjL2xpYi90YWJsZS1vdmVybGF5L3RhYmxlLW92ZXJsYXkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFBO0FBUXhELE1BQU0sT0FBTyxxQkFBcUI7SUFNaEMsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQUE7SUFDbEQsQ0FBQzs7O1lBYkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLHlkQUE2Qzs7YUFFOUM7OztzQkFFRSxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSztvQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHsgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ZsaXBwZXItdGFibGUtb3ZlcmxheScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLW92ZXJsYXkuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLW92ZXJsYXkuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlT3ZlcmxheUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhblxyXG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IE1hdFRhYmxlRGF0YVNvdXJjZTxhbnk+XHJcbiAgQElucHV0KCkgbm9EYXRhTGFiZWw6IHN0cmluZ1xyXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmdcclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5vRGF0YUxhYmVsID0gdGhpcy5ub0RhdGFMYWJlbCB8fCAnTm8gZGF0YSdcclxuICB9XHJcbn1cclxuIl19