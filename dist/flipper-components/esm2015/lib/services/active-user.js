import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { filter } from 'rxjs/operators';
import { PouchDBService } from './pouchdb.service';
import { PouchConfig } from '../db-config';
import { UserLoggedEvent } from '../events';
import * as i0 from "@angular/core";
import * as i1 from "@enexus/flipper-event";
import * as i2 from "./pouchdb.service";
export class ActiveUser {
    constructor(eventBus, database) {
        this.eventBus = eventBus;
        this.database = database;
        this.currentUser = null;
        this.database.connect(PouchConfig.bucket);
        this.init();
    }
    init() {
        this.user();
        this.eventBus
            .of(UserLoggedEvent.CHANNEL)
            .pipe(filter(e => e.user && (e.user.id !== null || e.user.id !== undefined)))
            .subscribe(res => (this.currentUser = res.user));
    }
    get(prop) {
        return this.currentUser && this.currentUser[prop];
    }
    set(key, value) {
        this.currentUser[key] = value;
    }
    user(table = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.activeUser().then(res => {
                if (res.docs && res.docs.length > 0) {
                    this.eventBus.publish(new UserLoggedEvent(res.docs[0]));
                }
            }, error => {
                if ((error.error && error.status === '404') || error.status === 404) {
                    this.eventBus.publish(new UserLoggedEvent(null));
                }
            });
        });
    }
}
ActiveUser.ɵprov = i0.ɵɵdefineInjectable({ factory: function ActiveUser_Factory() { return new ActiveUser(i0.ɵɵinject(i1.FlipperEventBusService), i0.ɵɵinject(i2.PouchDBService)); }, token: ActiveUser, providedIn: "root" });
ActiveUser.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ActiveUser.ctorParameters = () => [
    { type: FlipperEventBusService },
    { type: PouchDBService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLWNvbXBvbmVudHMvc3JjL2xpYi9zZXJ2aWNlcy9hY3RpdmUtdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUUxQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUU5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDdkMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFFMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQTs7OztBQUszQyxNQUFNLE9BQU8sVUFBVTtJQUdyQixZQUFvQixRQUFnQyxFQUFVLFFBQXdCO1FBQWxFLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFGdEYsZ0JBQVcsR0FBUyxJQUFJLENBQUE7UUFHdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFDTSxJQUFJO1FBQ1QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBRVgsSUFBSSxDQUFDLFFBQVE7YUFDVixFQUFFLENBQWtCLGVBQWUsQ0FBQyxPQUFPLENBQUM7YUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzthQUM1RSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUNNLEdBQUcsQ0FBdUIsSUFBTztRQUN0QyxPQUFPLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBRU0sR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFVO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO0lBQy9CLENBQUM7SUFFWSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUk7O1lBQzVCLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQ25DLEdBQUcsQ0FBQyxFQUFFO2dCQUNKLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUN4RDtZQUNILENBQUMsRUFDRCxLQUFLLENBQUMsRUFBRTtnQkFDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO29CQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO2lCQUNqRDtZQUNILENBQUMsQ0FDRixDQUFBO1FBQ0gsQ0FBQztLQUFBOzs7O1lBdkNGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBVlEsc0JBQXNCO1lBR3RCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuXHJcbmltcG9ydCB7IEZsaXBwZXJFdmVudEJ1c1NlcnZpY2UgfSBmcm9tICdAZW5leHVzL2ZsaXBwZXItZXZlbnQnXHJcblxyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuaW1wb3J0IHsgUG91Y2hEQlNlcnZpY2UgfSBmcm9tICcuL3BvdWNoZGIuc2VydmljZSdcclxuaW1wb3J0IHsgUG91Y2hDb25maWcgfSBmcm9tICcuLi9kYi1jb25maWcnXHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9lbnRyaWVzJ1xyXG5pbXBvcnQgeyBVc2VyTG9nZ2VkRXZlbnQgfSBmcm9tICcuLi9ldmVudHMnXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aXZlVXNlciB7XHJcbiAgY3VycmVudFVzZXI6IFVzZXIgPSBudWxsXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRCdXM6IEZsaXBwZXJFdmVudEJ1c1NlcnZpY2UsIHByaXZhdGUgZGF0YWJhc2U6IFBvdWNoREJTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmRhdGFiYXNlLmNvbm5lY3QoUG91Y2hDb25maWcuYnVja2V0KVxyXG4gICAgdGhpcy5pbml0KClcclxuICB9XHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLnVzZXIoKVxyXG5cclxuICAgIHRoaXMuZXZlbnRCdXNcclxuICAgICAgLm9mPFVzZXJMb2dnZWRFdmVudD4oVXNlckxvZ2dlZEV2ZW50LkNIQU5ORUwpXHJcbiAgICAgIC5waXBlKGZpbHRlcihlID0+IGUudXNlciAmJiAoZS51c2VyLmlkICE9PSBudWxsIHx8IGUudXNlci5pZCAhPT0gdW5kZWZpbmVkKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+ICh0aGlzLmN1cnJlbnRVc2VyID0gcmVzLnVzZXIpKVxyXG4gIH1cclxuICBwdWJsaWMgZ2V0PEsgZXh0ZW5kcyBrZXlvZiBVc2VyPihwcm9wOiBLKTogVXNlcltLXSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlciAmJiB0aGlzLmN1cnJlbnRVc2VyW3Byb3BdXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmN1cnJlbnRVc2VyW2tleV0gPSB2YWx1ZVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHVzZXIodGFibGUgPSBudWxsKSB7XHJcbiAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLmFjdGl2ZVVzZXIoKS50aGVuKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZG9jcyAmJiByZXMuZG9jcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmV2ZW50QnVzLnB1Ymxpc2gobmV3IFVzZXJMb2dnZWRFdmVudChyZXMuZG9jc1swXSkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgaWYgKChlcnJvci5lcnJvciAmJiBlcnJvci5zdGF0dXMgPT09ICc0MDQnKSB8fCBlcnJvci5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgdGhpcy5ldmVudEJ1cy5wdWJsaXNoKG5ldyBVc2VyTG9nZ2VkRXZlbnQobnVsbCkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiJdfQ==