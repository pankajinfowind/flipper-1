import { Input, Component } from '@angular/core';
export class LoadingIconComponent {
}
LoadingIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-loading-icon',
                template: "<ng-container *ngIf=\"!loading\"><ng-content></ng-content></ng-container>\r\n<div *ngIf=\"loading\" class=\"loading-spinner\">\r\n  <flipper-spinner [size]=\"24\" [color]=\"'accent'\"></flipper-spinner>\r\n</div>\r\n",
                styles: [".mat-button .loading-spinner{display:inline-block}.mat-icon-button .loading-spinner{display:block;margin-top:4px}"]
            },] }
];
LoadingIconComponent.propDecorators = {
    loading: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1pY29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsaXBwZXItY29tcG9uZW50cy9zcmMvbGliL2xvYWRpbmctaWNvbi9sb2FkaW5nLWljb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBT2hELE1BQU0sT0FBTyxvQkFBb0I7OztZQUxoQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsb09BQTRDOzthQUU3Qzs7O3NCQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZmxpcHBlci1sb2FkaW5nLWljb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2FkaW5nLWljb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xvYWRpbmctaWNvbi5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9hZGluZ0ljb25Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW5cclxufVxyXG4iXX0=