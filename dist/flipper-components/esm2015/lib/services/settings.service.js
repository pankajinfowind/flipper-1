import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class SettingsService {
    constructor() { }
    countries() {
        return Object.values(this.httpGet('assets/lists/countries.json'));
    }
    currencies() {
        return Object.values(this.httpGet('assets/lists/currencies.json'));
    }
    timezones() {
        return Object.values(this.httpGet('assets/lists/timezones.json'));
    }
    units() {
        return Object.values(this.httpGet('assets/lists/units.json'));
    }
    reasons() {
        return Object.values(this.httpGet('assets/lists/reasons.json'));
    }
    httpGet(theUrl) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return JSON.parse(xmlHttp.responseText);
    }
}
SettingsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SettingsService_Factory() { return new SettingsService(); }, token: SettingsService, providedIn: "root" });
SettingsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
SettingsService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsaXBwZXItY29tcG9uZW50cy9zcmMvbGliL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTs7QUFJMUMsTUFBTSxPQUFPLGVBQWU7SUFDMUIsZ0JBQWUsQ0FBQztJQUVoQixTQUFTO1FBQ1AsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFDRCxVQUFVO1FBQ1IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFBO0lBQy9ELENBQUM7SUFDRCxPQUFPO1FBQ0wsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFDRCxPQUFPLENBQUMsTUFBTTtRQUNaLE1BQU0sT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUE7UUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBLENBQUMsZ0NBQWdDO1FBQ25FLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN6QyxDQUFDOzs7O1lBNUJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIGNvdW50cmllcygpIHtcclxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuaHR0cEdldCgnYXNzZXRzL2xpc3RzL2NvdW50cmllcy5qc29uJykpXHJcbiAgfVxyXG4gIGN1cnJlbmNpZXMoKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLmh0dHBHZXQoJ2Fzc2V0cy9saXN0cy9jdXJyZW5jaWVzLmpzb24nKSlcclxuICB9XHJcblxyXG4gIHRpbWV6b25lcygpIHtcclxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuaHR0cEdldCgnYXNzZXRzL2xpc3RzL3RpbWV6b25lcy5qc29uJykpXHJcbiAgfVxyXG5cclxuICB1bml0cygpIHtcclxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuaHR0cEdldCgnYXNzZXRzL2xpc3RzL3VuaXRzLmpzb24nKSlcclxuICB9XHJcbiAgcmVhc29ucygpIHtcclxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuaHR0cEdldCgnYXNzZXRzL2xpc3RzL3JlYXNvbnMuanNvbicpKVxyXG4gIH1cclxuICBodHRwR2V0KHRoZVVybCkge1xyXG4gICAgY29uc3QgeG1sSHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXHJcbiAgICB4bWxIdHRwLm9wZW4oJ0dFVCcsIHRoZVVybCwgZmFsc2UpIC8vIGZhbHNlIGZvciBzeW5jaHJvbm91cyByZXF1ZXN0XHJcbiAgICB4bWxIdHRwLnNlbmQobnVsbClcclxuICAgIHJldHVybiBKU09OLnBhcnNlKHhtbEh0dHAucmVzcG9uc2VUZXh0KVxyXG4gIH1cclxufVxyXG4iXX0=