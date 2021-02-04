import { Directive, Input, ElementRef, HostListener } from '@angular/core';
export class MatchHeightDirective {
    constructor(el) {
        this.el = el;
    }
    onResize() {
        // call our matchHeight function here
        this.matchHeight(this.el.nativeElement, this.myMatchHeight);
    }
    ngAfterViewChecked() {
        // call our matchHeight function here later
        this.matchHeight(this.el.nativeElement, this.myMatchHeight);
    }
    matchHeight(parent, className) {
        // match height logic here
        if (!parent) {
            return;
        }
        // step 1: find all the child elements with the selected class name
        const children = parent.getElementsByClassName(className);
        if (!children) {
            return;
        }
        // step 2a: get all the child elements heights
        const itemHeights = Array.from(children).map(x => x.getBoundingClientRect().height);
        // step 2b: find out the tallest
        const maxHeight = itemHeights.reduce((prev, curr) => {
            return curr > prev ? curr : prev;
        }, 0);
        // step 3: update all the child elements to the tallest height
        Array.from(children).forEach((x) => (x.style.height = `${maxHeight}px`));
    }
}
MatchHeightDirective.decorators = [
    { type: Directive, args: [{
                selector: '[flipperMyMatchHeight]',
            },] }
];
MatchHeightDirective.ctorParameters = () => [
    { type: ElementRef }
];
MatchHeightDirective.propDecorators = {
    myMatchHeight: [{ type: Input }],
    onResize: [{ type: HostListener, args: ['window:resize',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtaGVpZ2h0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsaXBwZXItY29tcG9uZW50cy9zcmMvbGliL2RpcmVjdGl2ZS9tYXRjaC1oZWlnaHQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLEtBQUssRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBSzVGLE1BQU0sT0FBTyxvQkFBb0I7SUFJL0IsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDO0lBR3RDLFFBQVE7UUFDTixxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELGtCQUFrQjtRQUNoQiwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUFtQixFQUFFLFNBQWlCO1FBQ2hELDBCQUEwQjtRQUUxQixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTTtTQUNQO1FBRUQsbUVBQW1FO1FBQ25FLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV6RCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTTtTQUNQO1FBRUQsOENBQThDO1FBQzlDLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFbkYsZ0NBQWdDO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbEQsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUNsQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFFTCw4REFBOEQ7UUFDOUQsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDdkYsQ0FBQzs7O1lBNUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2FBQ25DOzs7WUFKNEMsVUFBVTs7OzRCQU1wRCxLQUFLO3VCQUtMLFlBQVksU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdDaGVja2VkLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2ZsaXBwZXJNeU1hdGNoSGVpZ2h0XScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRjaEhlaWdodERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQge1xyXG4gIEBJbnB1dCgpXHJcbiAgbXlNYXRjaEhlaWdodDogc3RyaW5nXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxyXG4gIG9uUmVzaXplKCkge1xyXG4gICAgLy8gY2FsbCBvdXIgbWF0Y2hIZWlnaHQgZnVuY3Rpb24gaGVyZVxyXG4gICAgdGhpcy5tYXRjaEhlaWdodCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMubXlNYXRjaEhlaWdodClcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgIC8vIGNhbGwgb3VyIG1hdGNoSGVpZ2h0IGZ1bmN0aW9uIGhlcmUgbGF0ZXJcclxuICAgIHRoaXMubWF0Y2hIZWlnaHQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLm15TWF0Y2hIZWlnaHQpXHJcbiAgfVxyXG5cclxuICBtYXRjaEhlaWdodChwYXJlbnQ6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgLy8gbWF0Y2ggaGVpZ2h0IGxvZ2ljIGhlcmVcclxuXHJcbiAgICBpZiAoIXBhcmVudCkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGVwIDE6IGZpbmQgYWxsIHRoZSBjaGlsZCBlbGVtZW50cyB3aXRoIHRoZSBzZWxlY3RlZCBjbGFzcyBuYW1lXHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlcclxuXHJcbiAgICBpZiAoIWNoaWxkcmVuKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0ZXAgMmE6IGdldCBhbGwgdGhlIGNoaWxkIGVsZW1lbnRzIGhlaWdodHNcclxuICAgIGNvbnN0IGl0ZW1IZWlnaHRzID0gQXJyYXkuZnJvbShjaGlsZHJlbikubWFwKHggPT4geC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpXHJcblxyXG4gICAgLy8gc3RlcCAyYjogZmluZCBvdXQgdGhlIHRhbGxlc3RcclxuICAgIGNvbnN0IG1heEhlaWdodCA9IGl0ZW1IZWlnaHRzLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xyXG4gICAgICByZXR1cm4gY3VyciA+IHByZXYgPyBjdXJyIDogcHJldlxyXG4gICAgfSwgMClcclxuXHJcbiAgICAvLyBzdGVwIDM6IHVwZGF0ZSBhbGwgdGhlIGNoaWxkIGVsZW1lbnRzIHRvIHRoZSB0YWxsZXN0IGhlaWdodFxyXG4gICAgQXJyYXkuZnJvbShjaGlsZHJlbikuZm9yRWFjaCgoeDogSFRNTEVsZW1lbnQpID0+ICh4LnN0eWxlLmhlaWdodCA9IGAke21heEhlaWdodH1weGApKVxyXG4gIH1cclxufVxyXG4iXX0=