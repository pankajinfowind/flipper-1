import { Observable } from 'rxjs';
import { Notification } from './notification';
export declare class NotificationService {
    private subject;
    private idx;
    constructor();
    getObservable(): Observable<Notification>;
    info(title: string, message: string, timeout?: number): void;
    success(title: string, message: string, timeout?: number): void;
    warning(title: string, message: string, timeout?: number): void;
    error(title: string, message: string, timeout?: number): void;
}
//# sourceMappingURL=notification.service.d.ts.map