import { Pipe, Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as i0 from "@angular/core";
export class MergeArryByIdPipe {
    transform(originArrayData, mergeArrayData) {
        return this.mergeById(originArrayData).with(mergeArrayData);
    }
    mergeById(arr) {
        return {
            with(arr2) {
                return _.map(arr, item => {
                    return _.find(arr2, obj => obj.id === item.id) || item;
                });
            },
        };
    }
}
MergeArryByIdPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function MergeArryByIdPipe_Factory() { return new MergeArryByIdPipe(); }, token: MergeArryByIdPipe, providedIn: "root" });
MergeArryByIdPipe.decorators = [
    { type: Pipe, args: [{
                name: 'mergeArryById',
            },] },
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2UtYXJyeS1ieS1pZC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZmxpcHBlci1jb21wb25lbnRzL3NyYy9saWIvcGlwZS9tZXJnZS1hcnJ5LWJ5LWlkLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQy9ELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFBOztBQVEzQixNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFNBQVMsQ0FBSSxlQUF5QixFQUFFLGNBQXdCO1FBQzlELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFHO1FBQ1gsT0FBTztZQUNMLElBQUksQ0FBQyxJQUFJO2dCQUNQLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ3ZCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUE7Z0JBQ3hELENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztTQUNGLENBQUE7SUFDSCxDQUFDOzs7O1lBbkJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsZUFBZTthQUN0QjtZQUNBLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnbWVyZ2VBcnJ5QnlJZCcsXHJcbn0pXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXJnZUFycnlCeUlkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybTxUPihvcmlnaW5BcnJheURhdGE6IEFycmF5PFQ+LCBtZXJnZUFycmF5RGF0YTogQXJyYXk8VD4pOiBBcnJheTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXJnZUJ5SWQob3JpZ2luQXJyYXlEYXRhKS53aXRoKG1lcmdlQXJyYXlEYXRhKVxyXG4gIH1cclxuXHJcbiAgbWVyZ2VCeUlkKGFycikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgd2l0aChhcnIyKSB7XHJcbiAgICAgICAgcmV0dXJuIF8ubWFwKGFyciwgaXRlbSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gXy5maW5kKGFycjIsIG9iaiA9PiBvYmouaWQgPT09IGl0ZW0uaWQpIHx8IGl0ZW1cclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=