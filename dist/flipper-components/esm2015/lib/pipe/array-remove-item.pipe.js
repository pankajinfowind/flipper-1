import { Pipe, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ArrayRemoveItemPipe {
    transform(arrayOfData, value) {
        return this.arrayRemove(arrayOfData, value);
    }
    arrayRemove(arr = [], objectToRemove) {
        if (arr.length > 0) {
            return arr.filter(ele => {
                return JSON.stringify(ele) !== JSON.stringify(objectToRemove);
            });
        }
        else {
            return arr;
        }
    }
}
ArrayRemoveItemPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function ArrayRemoveItemPipe_Factory() { return new ArrayRemoveItemPipe(); }, token: ArrayRemoveItemPipe, providedIn: "root" });
ArrayRemoveItemPipe.decorators = [
    { type: Pipe, args: [{
                name: 'arrayRemoveItem',
            },] },
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXktcmVtb3ZlLWl0ZW0ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsaXBwZXItY29tcG9uZW50cy9zcmMvbGliL3BpcGUvYXJyYXktcmVtb3ZlLWl0ZW0ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUE7O0FBUS9ELE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsU0FBUyxDQUFJLFdBQXFCLEVBQUUsS0FBYTtRQUMvQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUksV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFRCxXQUFXLENBQUksTUFBZ0IsRUFBRSxFQUFFLGNBQWM7UUFDL0MsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQy9ELENBQUMsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLE9BQU8sR0FBRyxDQUFBO1NBQ1g7SUFDSCxDQUFDOzs7O1lBbkJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsaUJBQWlCO2FBQ3hCO1lBQ0EsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2FycmF5UmVtb3ZlSXRlbScsXHJcbn0pXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcnJheVJlbW92ZUl0ZW1QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtPFQ+KGFycmF5T2ZEYXRhOiBBcnJheTxUPiwgdmFsdWU6IG9iamVjdCk6IEFycmF5PFQ+IHtcclxuICAgIHJldHVybiB0aGlzLmFycmF5UmVtb3ZlPFQ+KGFycmF5T2ZEYXRhLCB2YWx1ZSlcclxuICB9XHJcblxyXG4gIGFycmF5UmVtb3ZlPFQ+KGFycjogQXJyYXk8VD4gPSBbXSwgb2JqZWN0VG9SZW1vdmUpOiBBcnJheTxUPiB7XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGFyci5maWx0ZXIoZWxlID0+IHtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZWxlKSAhPT0gSlNPTi5zdHJpbmdpZnkob2JqZWN0VG9SZW1vdmUpXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYXJyXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==