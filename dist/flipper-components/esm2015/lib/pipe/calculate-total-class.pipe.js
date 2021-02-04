import { Pipe, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CalculateTotalClassPipe {
    transform(arrayOfdData, prop) {
        let total = 0.0;
        if (arrayOfdData.length > 0) {
            for (let i = 0, len = arrayOfdData.length; i < len; i++) {
                total += parseFloat(arrayOfdData[i][prop]);
            }
        }
        return total;
    }
}
CalculateTotalClassPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function CalculateTotalClassPipe_Factory() { return new CalculateTotalClassPipe(); }, token: CalculateTotalClassPipe, providedIn: "root" });
CalculateTotalClassPipe.decorators = [
    { type: Pipe, args: [{
                name: 'calculateTotalClass',
                pure: true,
            },] },
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLXRvdGFsLWNsYXNzLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLWNvbXBvbmVudHMvc3JjL2xpYi9waXBlL2NhbGN1bGF0ZS10b3RhbC1jbGFzcy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTs7QUFTL0QsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxTQUFTLENBQUksWUFBc0IsRUFBRSxJQUFhO1FBQ2hELElBQUksS0FBSyxHQUFRLEdBQUcsQ0FBQTtRQUNwQixJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZELEtBQUssSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7YUFDM0M7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQzs7OztZQWhCRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsSUFBSSxFQUFFLElBQUk7YUFDWDtZQUNBLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdjYWxjdWxhdGVUb3RhbENsYXNzJyxcclxuICBwdXJlOiB0cnVlLFxyXG59KVxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRlVG90YWxDbGFzc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm08VD4oYXJyYXlPZmREYXRhOiBBcnJheTxUPiwgcHJvcD86IHN0cmluZyk6IGFueSB7XHJcbiAgICBsZXQgdG90YWw6IGFueSA9IDAuMFxyXG4gICAgaWYgKGFycmF5T2ZkRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheU9mZERhdGEubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB0b3RhbCArPSBwYXJzZUZsb2F0KGFycmF5T2ZkRGF0YVtpXVtwcm9wXSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvdGFsXHJcbiAgfVxyXG59XHJcbiJdfQ==