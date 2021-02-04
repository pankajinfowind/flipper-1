import { Component, Input } from '@angular/core';
export class AutocompleteComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsaXBwZXItcG9zL3NyYy9saWIvY29tbW9uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBT2hELE1BQU0sT0FBTyxxQkFBcUI7SUFFaEMsSUFBc0IsT0FBTyxDQUFDLEtBQWM7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7SUFDbkIsQ0FBQztJQUNELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtJQUNsQixDQUFDOzs7WUFaRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsOFFBQTRDOzthQUU3Qzs7O3NCQUdFLEtBQUssU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ZsaXBwZXItYXV0b2NvbXBsZXRlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdXRvY29tcGxldGUuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZUNvbXBvbmVudCB7XHJcbiAgcHJpdmF0ZSBsb2FkOiBib29sZWFuXHJcbiAgQElucHV0KCdsb2FkaW5nJykgc2V0IGxvYWRpbmcodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubG9hZCA9IHZhbHVlXHJcbiAgfVxyXG4gIGdldCBsb2FkaW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubG9hZFxyXG4gIH1cclxufVxyXG4iXX0=