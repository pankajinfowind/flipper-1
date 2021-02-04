import { OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification';
export declare class NotificationListComponent implements OnInit, OnDestroy {
    private notificationSvc;
    notifications: Notification[];
    private subscription;
    constructor(notificationSvc: NotificationService);
    private addNotification;
    ngOnInit(): void;
    ngOnDestroy(): void;
    close(notification: Notification): void;
    className(notification: Notification): string;
}
//# sourceMappingURL=notification.component.d.ts.map