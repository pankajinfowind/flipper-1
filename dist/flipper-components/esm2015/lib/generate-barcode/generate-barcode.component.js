import { Component, Input } from '@angular/core';
export class GenerateBarcodeComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtYmFyY29kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLWNvbXBvbmVudHMvc3JjL2xpYi9nZW5lcmF0ZS1iYXJjb2RlL2dlbmVyYXRlLWJhcmNvZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBUWhELE1BQU0sT0FBTyx3QkFBd0I7SUFMckM7UUFNVyxXQUFNLEdBQWEsRUFBRSxDQUFBO1FBQ3JCLGFBQVEsR0FBRyxJQUFJLENBQUE7UUFDZixZQUFPLEdBQUcsSUFBSSxDQUFBO0lBQ3pCLENBQUM7OztZQVRBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxnVkFBZ0Q7O2FBRWpEOzs7cUJBRUUsS0FBSzt1QkFDTCxLQUFLO3NCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHsgTGFiZWxzIH0gZnJvbSAnLi4vZW50cmllcydcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZmxpcHBlci1nZW5lcmF0ZS1iYXJjb2RlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ2VuZXJhdGUtYmFyY29kZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ2VuZXJhdGUtYmFyY29kZS5jb21wb25lbnQuY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0ZUJhcmNvZGVDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGxhYmVsczogTGFiZWxzW10gPSBbXVxyXG4gIEBJbnB1dCgpIHNob3dOYW1lID0gdHJ1ZVxyXG4gIEBJbnB1dCgpIHNob3dTa3UgPSB0cnVlXHJcbn1cclxuIl19