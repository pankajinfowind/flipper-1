import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { PouchDBService } from './pouchdb.service';
import { PouchConfig } from '../db-config';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { filter } from 'rxjs/operators';
import { ActiveBusiness } from './active-business';
import { CurrentBranchEvent } from '../events';
import * as i0 from "@angular/core";
import * as i1 from "@enexus/flipper-event";
import * as i2 from "./pouchdb.service";
import * as i3 from "./active-business";
export class ActiveBranch {
    constructor(eventBus, database, currentBusiness) {
        this.eventBus = eventBus;
        this.database = database;
        this.currentBusiness = currentBusiness;
        this.currentBranch = null;
        this.database.connect(PouchConfig.bucket);
        this.eventBus
            .of(CurrentBranchEvent.CHANNEL)
            .pipe(filter(e => e.branch && (e.branch.id !== null || e.branch.id !== undefined)))
            .subscribe(res => (this.currentBranch = res.branch));
        this.branch();
    }
    get(prop) {
        return this.currentBranch && this.currentBranch[prop];
    }
    set(key, value) {
        this.currentBranch[key] = value;
    }
    branch(table = 'branches') {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentBusiness.get('id') != 'undefined' ||
                this.currentBusiness.get('id') != undefined ||
                this.currentBusiness.get('id') != null) {
                yield this.database.activeBranch(this.currentBusiness.get('id'), table).then(res => {
                    if (res.docs && res.docs.length > 0) {
                        this.eventBus.publish(new CurrentBranchEvent(res.docs[0]));
                    }
                }, error => {
                    if ((error.error && error.status === '404') || error.status === 404) {
                        this.eventBus.publish(new CurrentBranchEvent(null));
                    }
                });
            }
        });
    }
}
ActiveBranch.ɵprov = i0.ɵɵdefineInjectable({ factory: function ActiveBranch_Factory() { return new ActiveBranch(i0.ɵɵinject(i1.FlipperEventBusService), i0.ɵɵinject(i2.PouchDBService), i0.ɵɵinject(i3.ActiveBusiness)); }, token: ActiveBranch, providedIn: "root" });
ActiveBranch.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ActiveBranch.ctorParameters = () => [
    { type: FlipperEventBusService },
    { type: PouchDBService },
    { type: ActiveBusiness }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWJyYW5jaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsaXBwZXItY29tcG9uZW50cy9zcmMvbGliL3NlcnZpY2VzL2FjdGl2ZS1icmFuY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDMUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFFOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUVsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxXQUFXLENBQUE7Ozs7O0FBSzlDLE1BQU0sT0FBTyxZQUFZO0lBR3ZCLFlBQ1UsUUFBZ0MsRUFDaEMsUUFBd0IsRUFDeEIsZUFBK0I7UUFGL0IsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBTHpDLGtCQUFhLEdBQVcsSUFBSSxDQUFBO1FBTzFCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsUUFBUTthQUNWLEVBQUUsQ0FBcUIsa0JBQWtCLENBQUMsT0FBTyxDQUFDO2FBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDbEYsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNmLENBQUM7SUFFTSxHQUFHLENBQXlCLElBQU87UUFDeEMsT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUVNLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQTtJQUNqQyxDQUFDO0lBRVksTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVOztZQUNwQyxJQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVc7Z0JBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVM7Z0JBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFDdEM7Z0JBQ0EsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQzFFLEdBQUcsQ0FBQyxFQUFFO29CQUNKLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7cUJBQzNEO2dCQUNILENBQUMsRUFDRCxLQUFLLENBQUMsRUFBRTtvQkFDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO3dCQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7cUJBQ3BEO2dCQUNILENBQUMsQ0FDRixDQUFBO2FBQ0Y7UUFDSCxDQUFDO0tBQUE7Ozs7WUE5Q0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFUUSxzQkFBc0I7WUFGdEIsY0FBYztZQUtkLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHsgUG91Y2hEQlNlcnZpY2UgfSBmcm9tICcuL3BvdWNoZGIuc2VydmljZSdcclxuaW1wb3J0IHsgUG91Y2hDb25maWcgfSBmcm9tICcuLi9kYi1jb25maWcnXHJcbmltcG9ydCB7IEZsaXBwZXJFdmVudEJ1c1NlcnZpY2UgfSBmcm9tICdAZW5leHVzL2ZsaXBwZXItZXZlbnQnXHJcblxyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuaW1wb3J0IHsgQWN0aXZlQnVzaW5lc3MgfSBmcm9tICcuL2FjdGl2ZS1idXNpbmVzcydcclxuaW1wb3J0IHsgQnJhbmNoIH0gZnJvbSAnLi4vZW50cmllcydcclxuaW1wb3J0IHsgQ3VycmVudEJyYW5jaEV2ZW50IH0gZnJvbSAnLi4vZXZlbnRzJ1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFjdGl2ZUJyYW5jaCB7XHJcbiAgY3VycmVudEJyYW5jaDogQnJhbmNoID0gbnVsbFxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXZlbnRCdXM6IEZsaXBwZXJFdmVudEJ1c1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlOiBQb3VjaERCU2VydmljZSxcclxuICAgIHByaXZhdGUgY3VycmVudEJ1c2luZXNzOiBBY3RpdmVCdXNpbmVzc1xyXG4gICkge1xyXG4gICAgdGhpcy5kYXRhYmFzZS5jb25uZWN0KFBvdWNoQ29uZmlnLmJ1Y2tldClcclxuICAgIHRoaXMuZXZlbnRCdXNcclxuICAgICAgLm9mPEN1cnJlbnRCcmFuY2hFdmVudD4oQ3VycmVudEJyYW5jaEV2ZW50LkNIQU5ORUwpXHJcbiAgICAgIC5waXBlKGZpbHRlcihlID0+IGUuYnJhbmNoICYmIChlLmJyYW5jaC5pZCAhPT0gbnVsbCB8fCBlLmJyYW5jaC5pZCAhPT0gdW5kZWZpbmVkKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+ICh0aGlzLmN1cnJlbnRCcmFuY2ggPSByZXMuYnJhbmNoKSlcclxuICAgIHRoaXMuYnJhbmNoKClcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQ8SyBleHRlbmRzIGtleW9mIEJyYW5jaD4ocHJvcDogSyk6IEJyYW5jaFtLXSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50QnJhbmNoICYmIHRoaXMuY3VycmVudEJyYW5jaFtwcm9wXVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5jdXJyZW50QnJhbmNoW2tleV0gPSB2YWx1ZVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGJyYW5jaCh0YWJsZSA9ICdicmFuY2hlcycpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5jdXJyZW50QnVzaW5lc3MuZ2V0KCdpZCcpICE9ICd1bmRlZmluZWQnIHx8XHJcbiAgICAgIHRoaXMuY3VycmVudEJ1c2luZXNzLmdldCgnaWQnKSAhPSB1bmRlZmluZWQgfHxcclxuICAgICAgdGhpcy5jdXJyZW50QnVzaW5lc3MuZ2V0KCdpZCcpICE9IG51bGxcclxuICAgICkge1xyXG4gICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLmFjdGl2ZUJyYW5jaCh0aGlzLmN1cnJlbnRCdXNpbmVzcy5nZXQoJ2lkJyksIHRhYmxlKS50aGVuKFxyXG4gICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzLmRvY3MgJiYgcmVzLmRvY3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnB1Ymxpc2gobmV3IEN1cnJlbnRCcmFuY2hFdmVudChyZXMuZG9jc1swXSkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICBpZiAoKGVycm9yLmVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gJzQwNCcpIHx8IGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMucHVibGlzaChuZXcgQ3VycmVudEJyYW5jaEV2ZW50KG51bGwpKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=