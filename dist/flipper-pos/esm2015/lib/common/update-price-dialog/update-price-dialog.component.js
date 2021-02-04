import { Component, HostListener, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@enexus/flipper-components';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export class UpdatePriceDialogComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXByaWNlLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLXBvcy9zcmMvbGliL2NvbW1vbi91cGRhdGUtcHJpY2UtZGlhbG9nL3VwZGF0ZS1wcmljZS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUV2RSxPQUFPLEVBQWEsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFBO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFPeEUsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxZQUNTLFNBQW1ELEVBQzFCLEtBQVUsRUFDbEMsV0FBd0IsRUFDdEIsZUFBb0M7UUFIdkMsY0FBUyxHQUFULFNBQVMsQ0FBMEM7UUFDMUIsVUFBSyxHQUFMLEtBQUssQ0FBSztRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7UUFNaEQsY0FBUyxHQUFHLEtBQUssQ0FBQTtRQUVqQixjQUFTLEdBQUcsRUFBRSxDQUFBO0lBUFgsQ0FBQztJQUVKLElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDM0IsQ0FBQztJQUs2QyxnQkFBZ0IsQ0FBQyxLQUFvQjtRQUNqRixJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssS0FBSyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQzlCO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2pDLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDN0QsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtRQUVyQiwrQkFBK0I7UUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FDeEIsV0FBVyxFQUNYLDJFQUEyRSxDQUM1RSxDQUFBO1lBQ0QsT0FBTTtTQUNQO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3ZEO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDOzs7WUFwREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLHUwQ0FBbUQ7O2FBRXBEOzs7WUFOUSxZQUFZOzRDQVVoQixNQUFNLFNBQUMsZUFBZTtZQVpQLFdBQVc7WUFDdEIsbUJBQW1COzs7K0JBdUJ6QixZQUFZLFNBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSG9zdExpc3RlbmVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQGVuZXh1cy9mbGlwcGVyLWNvbXBvbmVudHMnXHJcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJ1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmbGlwcGVyLXVwZGF0ZS1wcmljZS1kaWFsb2cnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi91cGRhdGUtcHJpY2UtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi91cGRhdGUtcHJpY2UtZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByaWNlRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxVcGRhdGVQcmljZURpYWxvZ0NvbXBvbmVudD4sXHJcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIHByaWNlOiBhbnksXHJcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcclxuICAgIHByb3RlY3RlZCBub3RpZmljYXRpb25TdmM6IE5vdGlmaWNhdGlvblNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGdldCBmb3JtQ29udHJvbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmZvcm0uY29udHJvbHNcclxuICB9XHJcbiAgc3VibWl0dGVkID0gZmFsc2VcclxuICBmb3JtOiBGb3JtR3JvdXBcclxuICBpc0ZvY3VzZWQgPSAnJ1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSkgb25LZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzYycpIHtcclxuICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoJ2Nsb3NlJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHByaWNlOiBbIXRoaXMucHJpY2UgPyB0aGlzLnByaWNlIDogMC4wLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU3VibWl0KCkge1xyXG4gICAgdGhpcy5zdWJtaXR0ZWQgPSB0cnVlXHJcblxyXG4gICAgLy8gc3RvcCBoZXJlIGlmIGZvcm0gaXMgaW52YWxpZFxyXG4gICAgaWYgKHRoaXMuZm9ybS5pbnZhbGlkKSB7XHJcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uU3ZjLmVycm9yKFxyXG4gICAgICAgICdBZGQgcHJpY2UnLFxyXG4gICAgICAgICdXZSBuZWVkIHlvdSB0byBjb21wbGV0ZSBhbGwgb2YgdGhlIHJlcXVpcmVkIGZpZWxkcyBiZWZvcmUgd2UgY2FuIGNvbnRpbnVlJ1xyXG4gICAgICApXHJcbiAgICAgIHJldHVyblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoeyBwcmljZTogdGhpcy5mb3JtLnZhbHVlLnByaWNlIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1c2luZyh2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHZhbHVlXHJcbiAgICB0aGlzLmZvcm0uY29udHJvbHMucHJpY2Uuc2V0VmFsdWUoJycpXHJcbiAgfVxyXG4gIGZvY3VzaW5nT3V0KCkge1xyXG4gICAgdGhpcy5pc0ZvY3VzZWQgPSAnJ1xyXG4gIH1cclxufVxyXG4iXX0=