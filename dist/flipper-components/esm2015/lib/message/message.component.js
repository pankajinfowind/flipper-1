import { Component, Input } from '@angular/core';
export class MessageComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLWNvbXBvbmVudHMvc3JjL2xpYi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBT2hELE1BQU0sT0FBTyxnQkFBZ0I7SUFMN0I7UUFNVyxTQUFJLEdBQUcsWUFBWSxDQUFBO1FBQ25CLFVBQUssR0FBRyxFQUFFLENBQUE7UUFDVixZQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7OztZQVRBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQiw4ZUFBdUM7O2FBRXhDOzs7bUJBRUUsS0FBSztvQkFDTCxLQUFLO3NCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZmxpcHBlci1tZXNzYWdlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWVzc2FnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgaWNvbiA9ICdzZWFyY2guc3ZnJ1xyXG4gIEBJbnB1dCgpIHRpdGxlID0gJydcclxuICBASW5wdXQoKSBtZXNzYWdlID0gJydcclxufVxyXG4iXX0=