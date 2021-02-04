import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators';
import { animate, style, transition, trigger } from '@angular/animations';
export class RouterProgressComponent {
    constructor(router) {
        this.document = document;
        this.loading = false;
        router.events
            .pipe(filter(event => {
            return event instanceof NavigationStart;
        }))
            .subscribe(() => {
            this.loading = true;
        });
        router.events
            .pipe(filter(event => {
            return event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError;
        }))
            .subscribe(() => {
            this.loading = false;
            // Remove loading background if any on application start
            const background = this.document.getElementById('background-logo');
            if (background) {
                background.setAttribute('class', 'fade-out');
                setTimeout(() => {
                    background.outerHTML = '';
                }, 200);
            }
        });
    }
}
RouterProgressComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-router-progress',
                template: "<mat-progress-bar *ngIf=\"loading\" [@myAnimation] mode=\"indeterminate\"></mat-progress-bar>\r\n",
                animations: [
                    trigger('myAnimation', [
                        transition(':enter', [style({ top: '0px', opacity: 1 })]),
                        transition(':leave', [style({ top: '0px', opacity: 1 }), animate('500ms', style({ top: '-5px', opacity: 0 }))]),
                    ]),
                ],
                styles: [":host{left:0;position:fixed;right:0;top:0;z-index:9999}"]
            },] }
];
RouterProgressComponent.ctorParameters = () => [
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLXByb2dyZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsaXBwZXItY29tcG9uZW50cy9zcmMvbGliL3JvdXRlci1wcm9ncmVzcy9yb3V0ZXItcHJvZ3Jlc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzNHLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFhekUsTUFBTSxPQUFPLHVCQUF1QjtJQUlsQyxZQUFZLE1BQWM7UUFIMUIsYUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUNuQixZQUFPLEdBQUcsS0FBSyxDQUFBO1FBR2IsTUFBTSxDQUFDLE1BQU07YUFDVixJQUFJLENBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2IsT0FBTyxLQUFLLFlBQVksZUFBZSxDQUFBO1FBQ3pDLENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO1FBQ3JCLENBQUMsQ0FBQyxDQUFBO1FBRUosTUFBTSxDQUFDLE1BQU07YUFDVixJQUFJLENBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2IsT0FBTyxLQUFLLFlBQVksYUFBYSxJQUFJLEtBQUssWUFBWSxnQkFBZ0IsSUFBSSxLQUFLLFlBQVksZUFBZSxDQUFBO1FBQ2hILENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO1lBQ3BCLHdEQUF3RDtZQUN4RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBQ2xFLElBQUksVUFBVSxFQUFFO2dCQUNkLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFBO2dCQUM1QyxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLFVBQVUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO2dCQUMzQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDUjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyw2R0FBK0M7Z0JBRS9DLFVBQVUsRUFBRTtvQkFDVixPQUFPLENBQUMsYUFBYSxFQUFFO3dCQUNyQixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUN6RCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNoSCxDQUFDO2lCQUNIOzthQUNGOzs7WUFkMkUsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7IE5hdmlnYXRpb25DYW5jZWwsIE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25FcnJvciwgTmF2aWdhdGlvblN0YXJ0LCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInXHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzJ1xyXG5pbXBvcnQgeyBhbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ZsaXBwZXItcm91dGVyLXByb2dyZXNzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcm91dGVyLXByb2dyZXNzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9yb3V0ZXItcHJvZ3Jlc3MuY29tcG9uZW50LnNjc3MnXSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdteUFuaW1hdGlvbicsIFtcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW3N0eWxlKHsgdG9wOiAnMHB4Jywgb3BhY2l0eTogMSB9KV0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbc3R5bGUoeyB0b3A6ICcwcHgnLCBvcGFjaXR5OiAxIH0pLCBhbmltYXRlKCc1MDBtcycsIHN0eWxlKHsgdG9wOiAnLTVweCcsIG9wYWNpdHk6IDAgfSkpXSksXHJcbiAgICBdKSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUm91dGVyUHJvZ3Jlc3NDb21wb25lbnQge1xyXG4gIGRvY3VtZW50ID0gZG9jdW1lbnRcclxuICBsb2FkaW5nID0gZmFsc2VcclxuXHJcbiAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIHJvdXRlci5ldmVudHNcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHtcclxuICAgICAgICAgIHJldHVybiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydFxyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxyXG4gICAgICB9KVxyXG5cclxuICAgIHJvdXRlci5ldmVudHNcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHtcclxuICAgICAgICAgIHJldHVybiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQgfHwgZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQ2FuY2VsIHx8IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yXHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgIC8vIFJlbW92ZSBsb2FkaW5nIGJhY2tncm91bmQgaWYgYW55IG9uIGFwcGxpY2F0aW9uIHN0YXJ0XHJcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZCA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tncm91bmQtbG9nbycpXHJcbiAgICAgICAgaWYgKGJhY2tncm91bmQpIHtcclxuICAgICAgICAgIGJhY2tncm91bmQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYWRlLW91dCcpXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC5vdXRlckhUTUwgPSAnJ1xyXG4gICAgICAgICAgfSwgMjAwKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuIl19