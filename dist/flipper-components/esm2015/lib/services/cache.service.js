import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LocalStorageSaveOptions {
}
export class CacheService {
    constructor() { }
    save(options) {
        // Set default values for optionals
        options.expirationMins = options.expirationMins || 0;
        // Set expiration date in miliseconds
        const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0;
        const record = {
            value: typeof options.data === 'string' ? options.data : JSON.stringify(options.data),
            expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
            hasExpiration: expirationMS !== 0 ? true : false,
        };
        localStorage.setItem(options.key, JSON.stringify(record));
    }
    load(key) {
        // Get cached data from localstorage
        const item = localStorage.getItem(key);
        if (item !== null) {
            const record = JSON.parse(item);
            const now = new Date().getTime();
            // Expired data will return null
            if (!record || (record.hasExpiration && record.expiration <= now)) {
                return null;
            }
            else {
                return JSON.parse(record.value);
            }
        }
        return null;
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    cleanLocalStorage() {
        localStorage.clear();
    }
}
CacheService.ɵprov = i0.ɵɵdefineInjectable({ factory: function CacheService_Factory() { return new CacheService(); }, token: CacheService, providedIn: "root" });
CacheService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CacheService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsaXBwZXItY29tcG9uZW50cy9zcmMvbGliL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTs7QUFFMUMsTUFBTSxPQUFPLHVCQUF1QjtDQUluQztBQUtELE1BQU0sT0FBTyxZQUFZO0lBQ3ZCLGdCQUFlLENBQUM7SUFDaEIsSUFBSSxDQUFDLE9BQWdDO1FBQ25DLG1DQUFtQztRQUNuQyxPQUFPLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFBO1FBRXBELHFDQUFxQztRQUNyQyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsY0FBYyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFMUYsTUFBTSxNQUFNLEdBQUc7WUFDYixLQUFLLEVBQUUsT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3JGLFVBQVUsRUFBRSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUMzRSxhQUFhLEVBQUUsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO1NBQ2pELENBQUE7UUFDRCxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFFRCxJQUFJLENBQUMsR0FBVztRQUNkLG9DQUFvQztRQUNwQyxNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3RDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQy9CLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDaEMsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQ2pFLE9BQU8sSUFBSSxDQUFBO2FBQ1o7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUNoQztTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3RCLENBQUM7Ozs7WUExQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcblxyXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlU2F2ZU9wdGlvbnMge1xyXG4gIGtleTogc3RyaW5nXHJcbiAgZGF0YTogYW55XHJcbiAgZXhwaXJhdGlvbk1pbnM/OiBudW1iZXJcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIENhY2hlU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG4gIHNhdmUob3B0aW9uczogTG9jYWxTdG9yYWdlU2F2ZU9wdGlvbnMpIHtcclxuICAgIC8vIFNldCBkZWZhdWx0IHZhbHVlcyBmb3Igb3B0aW9uYWxzXHJcbiAgICBvcHRpb25zLmV4cGlyYXRpb25NaW5zID0gb3B0aW9ucy5leHBpcmF0aW9uTWlucyB8fCAwXHJcblxyXG4gICAgLy8gU2V0IGV4cGlyYXRpb24gZGF0ZSBpbiBtaWxpc2Vjb25kc1xyXG4gICAgY29uc3QgZXhwaXJhdGlvbk1TID0gb3B0aW9ucy5leHBpcmF0aW9uTWlucyAhPT0gMCA/IG9wdGlvbnMuZXhwaXJhdGlvbk1pbnMgKiA2MCAqIDEwMDAgOiAwXHJcblxyXG4gICAgY29uc3QgcmVjb3JkID0ge1xyXG4gICAgICB2YWx1ZTogdHlwZW9mIG9wdGlvbnMuZGF0YSA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmRhdGEgOiBKU09OLnN0cmluZ2lmeShvcHRpb25zLmRhdGEpLFxyXG4gICAgICBleHBpcmF0aW9uOiBleHBpcmF0aW9uTVMgIT09IDAgPyBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIGV4cGlyYXRpb25NUyA6IG51bGwsXHJcbiAgICAgIGhhc0V4cGlyYXRpb246IGV4cGlyYXRpb25NUyAhPT0gMCA/IHRydWUgOiBmYWxzZSxcclxuICAgIH1cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG9wdGlvbnMua2V5LCBKU09OLnN0cmluZ2lmeShyZWNvcmQpKVxyXG4gIH1cclxuXHJcbiAgbG9hZChrZXk6IHN0cmluZykge1xyXG4gICAgLy8gR2V0IGNhY2hlZCBkYXRhIGZyb20gbG9jYWxzdG9yYWdlXHJcbiAgICBjb25zdCBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KVxyXG4gICAgaWYgKGl0ZW0gIT09IG51bGwpIHtcclxuICAgICAgY29uc3QgcmVjb3JkID0gSlNPTi5wYXJzZShpdGVtKVxyXG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgICAvLyBFeHBpcmVkIGRhdGEgd2lsbCByZXR1cm4gbnVsbFxyXG4gICAgICBpZiAoIXJlY29yZCB8fCAocmVjb3JkLmhhc0V4cGlyYXRpb24gJiYgcmVjb3JkLmV4cGlyYXRpb24gPD0gbm93KSkge1xyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVjb3JkLnZhbHVlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGtleTogc3RyaW5nKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXHJcbiAgfVxyXG5cclxuICBjbGVhbkxvY2FsU3RvcmFnZSgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpXHJcbiAgfVxyXG59XHJcbiJdfQ==