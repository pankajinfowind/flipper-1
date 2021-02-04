import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationType } from './notification';
export class NotificationListComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsaXBwZXItY29tcG9uZW50cy9zcmMvbGliL25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQTtBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUM1RCxPQUFPLEVBQWdCLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFRL0QsTUFBTSxPQUFPLHlCQUF5QjtJQUlwQyxZQUFvQixlQUFvQztRQUFwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7UUFIeEQsa0JBQWEsR0FBbUIsRUFBRSxDQUFBO0lBR3lCLENBQUM7SUFFcEQsZUFBZSxDQUFDLFlBQTBCO1FBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBRXJDLElBQUksWUFBWSxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUU7WUFDOUIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ2pFO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlO2FBQ3JDLGFBQWEsRUFBRTthQUNmLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtJQUNsRSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDakMsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUEwQjtRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDdkYsQ0FBQztJQUVELFNBQVMsQ0FBQyxZQUEwQjtRQUNsQyxJQUFJLEtBQWEsQ0FBQTtRQUVqQixRQUFRLFlBQVksQ0FBQyxJQUFJLEVBQUU7WUFDekIsS0FBSyxnQkFBZ0IsQ0FBQyxPQUFPO2dCQUMzQixLQUFLLEdBQUcsU0FBUyxDQUFBO2dCQUNqQixNQUFLO1lBRVAsS0FBSyxnQkFBZ0IsQ0FBQyxPQUFPO2dCQUMzQixLQUFLLEdBQUcsU0FBUyxDQUFBO2dCQUNqQixNQUFLO1lBRVAsS0FBSyxnQkFBZ0IsQ0FBQyxLQUFLO2dCQUN6QixLQUFLLEdBQUcsT0FBTyxDQUFBO2dCQUNmLE1BQUs7WUFFUDtnQkFDRSxLQUFLLEdBQUcsTUFBTSxDQUFBO2dCQUNkLE1BQUs7U0FDUjtRQUVELE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQzs7O1lBdkRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyw4M0JBQTRDOzthQUU3Qzs7O1lBUlEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJ1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb24sIE5vdGlmaWNhdGlvblR5cGUgfSBmcm9tICcuL25vdGlmaWNhdGlvbidcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcydcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZmxpcHBlci1ub3RpZmljYXRpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ub3RpZmljYXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25vdGlmaWNhdGlvbi5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25bXSA9IFtdXHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvblN2YzogTm90aWZpY2F0aW9uU2VydmljZSkge31cclxuXHJcbiAgcHJpdmF0ZSBhZGROb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24pIHtcclxuICAgIHRoaXMubm90aWZpY2F0aW9ucy5wdXNoKG5vdGlmaWNhdGlvbilcclxuXHJcbiAgICBpZiAobm90aWZpY2F0aW9uLnRpbWVvdXQgIT09IDApIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNsb3NlKG5vdGlmaWNhdGlvbiksIG5vdGlmaWNhdGlvbi50aW1lb3V0KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMubm90aWZpY2F0aW9uU3ZjXHJcbiAgICAgIC5nZXRPYnNlcnZhYmxlKClcclxuICAgICAgLnN1YnNjcmliZShub3RpZmljYXRpb24gPT4gdGhpcy5hZGROb3RpZmljYXRpb24obm90aWZpY2F0aW9uKSlcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxyXG4gIH1cclxuXHJcbiAgY2xvc2Uobm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24pIHtcclxuICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IHRoaXMubm90aWZpY2F0aW9ucy5maWx0ZXIobm90aWYgPT4gbm90aWYuaWQgIT09IG5vdGlmaWNhdGlvbi5pZClcclxuICB9XHJcblxyXG4gIGNsYXNzTmFtZShub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbik6IHN0cmluZyB7XHJcbiAgICBsZXQgc3R5bGU6IHN0cmluZ1xyXG5cclxuICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSBOb3RpZmljYXRpb25UeXBlLnN1Y2Nlc3M6XHJcbiAgICAgICAgc3R5bGUgPSAnc3VjY2VzcydcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBOb3RpZmljYXRpb25UeXBlLndhcm5pbmc6XHJcbiAgICAgICAgc3R5bGUgPSAnd2FybmluZydcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBOb3RpZmljYXRpb25UeXBlLmVycm9yOlxyXG4gICAgICAgIHN0eWxlID0gJ2Vycm9yJ1xyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHN0eWxlID0gJ2luZm8nXHJcbiAgICAgICAgYnJlYWtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3R5bGVcclxuICB9XHJcbn1cclxuIl19