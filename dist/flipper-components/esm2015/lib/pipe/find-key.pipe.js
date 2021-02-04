import { Pipe, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FindKeyPipe {
    transform(numKeys, key) {
        return numKeys.find(k => k === key) ? true : false;
    }
}
FindKeyPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function FindKeyPipe_Factory() { return new FindKeyPipe(); }, token: FindKeyPipe, providedIn: "root" });
FindKeyPipe.decorators = [
    { type: Pipe, args: [{
                name: 'findKey',
                pure: true,
            },] },
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1rZXkucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsaXBwZXItY29tcG9uZW50cy9zcmMvbGliL3BpcGUvZmluZC1rZXkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUE7O0FBUy9ELE1BQU0sT0FBTyxXQUFXO0lBQ3RCLFNBQVMsQ0FBQyxPQUFjLEVBQUUsR0FBUTtRQUNoQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0lBQ3BELENBQUM7Ozs7WUFWRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLElBQUk7YUFDWDtZQUNBLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdmaW5kS2V5JyxcclxuICBwdXJlOiB0cnVlLFxyXG59KVxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmluZEtleVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0obnVtS2V5czogYW55W10sIGtleTogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gbnVtS2V5cy5maW5kKGsgPT4gayA9PT0ga2V5KSA/IHRydWUgOiBmYWxzZVxyXG4gIH1cclxufVxyXG4iXX0=