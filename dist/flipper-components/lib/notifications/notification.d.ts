export declare class Notification {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    timeout: number;
    constructor(id: number, type: NotificationType, title: string, message: string, timeout: number);
}
export declare enum NotificationType {
    success = 0,
    warning = 1,
    error = 2,
    info = 3
}
//# sourceMappingURL=notification.d.ts.map