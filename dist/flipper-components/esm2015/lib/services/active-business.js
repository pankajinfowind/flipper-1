import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ActiveUser } from './active-user';
import { PouchDBService } from './pouchdb.service';
import { PouchConfig } from '../db-config';
import { CurrentBusinessEvent } from '../events';
import { FlipperEventBusService } from '@enexus/flipper-event';
import * as i0 from "@angular/core";
import * as i1 from "@enexus/flipper-event";
import * as i2 from "./pouchdb.service";
import * as i3 from "./active-user";
export class ActiveBusiness {
    constructor(eventBus, database, currentUser) {
        this.eventBus = eventBus;
        this.database = database;
        this.currentUser = currentUser;
        this.currentBusiness = null;
        this.database.connect(PouchConfig.bucket);
        this.eventBus
            .of(CurrentBusinessEvent.CHANNEL)
            .pipe(filter(e => e.business && (e.business.id !== null || e.business.id !== undefined)))
            .subscribe(res => (this.currentBusiness = res.business));
        this.business();
    }
    get(prop) {
        return this.currentBusiness && this.currentBusiness[prop];
    }
    set(key, value) {
        this.currentBusiness[key] = value;
    }
    business(table = 'businesses') {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentUser.get('id') != 'undefined' ||
                this.currentUser.get('id') != undefined ||
                this.currentUser.get('id') != null) {
                yield this.database.activeBusiness(this.currentUser.get('id'), table).then(res => {
                    if (res.docs && res.docs.length > 0) {
                        this.eventBus.publish(new CurrentBusinessEvent(res.docs[0]));
                    }
                }, error => {
                    if ((error.error && error.status === '404') || error.status === 404) {
                        this.eventBus.publish(new CurrentBusinessEvent(null));
                    }
                });
            }
        });
    }
}
ActiveBusiness.ɵprov = i0.ɵɵdefineInjectable({ factory: function ActiveBusiness_Factory() { return new ActiveBusiness(i0.ɵɵinject(i1.FlipperEventBusService), i0.ɵɵinject(i2.PouchDBService), i0.ɵɵinject(i3.ActiveUser)); }, token: ActiveBusiness, providedIn: "root" });
ActiveBusiness.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ActiveBusiness.ctorParameters = () => [
    { type: FlipperEventBusService },
    { type: PouchDBService },
    { type: ActiveUser }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWJ1c2luZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZmxpcHBlci1jb21wb25lbnRzL3NyYy9saWIvc2VydmljZXMvYWN0aXZlLWJ1c2luZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRTFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRTFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTs7Ozs7QUFLOUQsTUFBTSxPQUFPLGNBQWM7SUFHekIsWUFDVSxRQUFnQyxFQUNoQyxRQUF3QixFQUN4QixXQUF1QjtRQUZ2QixhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUxqQyxvQkFBZSxHQUFhLElBQUksQ0FBQTtRQU85QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLFFBQVE7YUFDVixFQUFFLENBQXVCLG9CQUFvQixDQUFDLE9BQU8sQ0FBQzthQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3hGLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtRQUMxRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUVNLEdBQUcsQ0FBMkIsSUFBTztRQUMxQyxPQUFPLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0lBRU0sR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFVO1FBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO0lBQ25DLENBQUM7SUFFWSxRQUFRLENBQUMsS0FBSyxHQUFHLFlBQVk7O1lBQ3hDLElBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVztnQkFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUztnQkFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUNsQztnQkFDQSxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDeEUsR0FBRyxDQUFDLEVBQUU7b0JBQ0osSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDN0Q7Z0JBQ0gsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFO29CQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7d0JBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtxQkFDdEQ7Z0JBQ0gsQ0FBQyxDQUNGLENBQUE7YUFDRjtRQUNILENBQUM7S0FBQTs7OztZQTlDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQUpRLHNCQUFzQjtZQUp0QixjQUFjO1lBRGQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXHJcbmltcG9ydCB7IEFjdGl2ZVVzZXIgfSBmcm9tICcuL2FjdGl2ZS11c2VyJ1xyXG5pbXBvcnQgeyBQb3VjaERCU2VydmljZSB9IGZyb20gJy4vcG91Y2hkYi5zZXJ2aWNlJ1xyXG5pbXBvcnQgeyBQb3VjaENvbmZpZyB9IGZyb20gJy4uL2RiLWNvbmZpZydcclxuaW1wb3J0IHsgQnVzaW5lc3MgfSBmcm9tICcuLi9lbnRyaWVzJ1xyXG5pbXBvcnQgeyBDdXJyZW50QnVzaW5lc3NFdmVudCB9IGZyb20gJy4uL2V2ZW50cydcclxuaW1wb3J0IHsgRmxpcHBlckV2ZW50QnVzU2VydmljZSB9IGZyb20gJ0BlbmV4dXMvZmxpcHBlci1ldmVudCdcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBY3RpdmVCdXNpbmVzcyB7XHJcbiAgY3VycmVudEJ1c2luZXNzOiBCdXNpbmVzcyA9IG51bGxcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV2ZW50QnVzOiBGbGlwcGVyRXZlbnRCdXNTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogUG91Y2hEQlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGN1cnJlbnRVc2VyOiBBY3RpdmVVc2VyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRhdGFiYXNlLmNvbm5lY3QoUG91Y2hDb25maWcuYnVja2V0KVxyXG4gICAgdGhpcy5ldmVudEJ1c1xyXG4gICAgICAub2Y8Q3VycmVudEJ1c2luZXNzRXZlbnQ+KEN1cnJlbnRCdXNpbmVzc0V2ZW50LkNIQU5ORUwpXHJcbiAgICAgIC5waXBlKGZpbHRlcihlID0+IGUuYnVzaW5lc3MgJiYgKGUuYnVzaW5lc3MuaWQgIT09IG51bGwgfHwgZS5idXNpbmVzcy5pZCAhPT0gdW5kZWZpbmVkKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+ICh0aGlzLmN1cnJlbnRCdXNpbmVzcyA9IHJlcy5idXNpbmVzcykpXHJcbiAgICB0aGlzLmJ1c2luZXNzKClcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQ8SyBleHRlbmRzIGtleW9mIEJ1c2luZXNzPihwcm9wOiBLKTogQnVzaW5lc3NbS10ge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEJ1c2luZXNzICYmIHRoaXMuY3VycmVudEJ1c2luZXNzW3Byb3BdXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmN1cnJlbnRCdXNpbmVzc1trZXldID0gdmFsdWVcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBidXNpbmVzcyh0YWJsZSA9ICdidXNpbmVzc2VzJykge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmN1cnJlbnRVc2VyLmdldCgnaWQnKSAhPSAndW5kZWZpbmVkJyB8fFxyXG4gICAgICB0aGlzLmN1cnJlbnRVc2VyLmdldCgnaWQnKSAhPSB1bmRlZmluZWQgfHxcclxuICAgICAgdGhpcy5jdXJyZW50VXNlci5nZXQoJ2lkJykgIT0gbnVsbFxyXG4gICAgKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UuYWN0aXZlQnVzaW5lc3ModGhpcy5jdXJyZW50VXNlci5nZXQoJ2lkJyksIHRhYmxlKS50aGVuKFxyXG4gICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzLmRvY3MgJiYgcmVzLmRvY3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnB1Ymxpc2gobmV3IEN1cnJlbnRCdXNpbmVzc0V2ZW50KHJlcy5kb2NzWzBdKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgIGlmICgoZXJyb3IuZXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSAnNDA0JykgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy5wdWJsaXNoKG5ldyBDdXJyZW50QnVzaW5lc3NFdmVudChudWxsKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19