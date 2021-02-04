import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
export class LazyIfDirective {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.loaded = false;
    }
    set libLazyIf(condition) {
        if (condition && !this.loaded) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.loaded = true;
        }
    }
}
LazyIfDirective.decorators = [
    { type: Directive, args: [{
                selector: '[flipperLibLazyIf]',
            },] }
];
LazyIfDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
LazyIfDirective.propDecorators = {
    libLazyIf: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1pZi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLWNvbXBvbmVudHMvc3JjL2xpYi9sYXp5LWlmLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFLL0UsTUFBTSxPQUFPLGVBQWU7SUFHMUIsWUFBb0IsV0FBNkIsRUFBVSxhQUErQjtRQUF0RSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFGbEYsV0FBTSxHQUFHLEtBQUssQ0FBQTtJQUV1RSxDQUFDO0lBRTlGLElBQWEsU0FBUyxDQUFDLFNBQWtCO1FBQ3ZDLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtTQUNuQjtJQUNILENBQUM7OztZQWJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2FBQy9COzs7WUFKMEIsV0FBVztZQUFFLGdCQUFnQjs7O3dCQVVyRCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbZmxpcHBlckxpYkxhenlJZl0nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF6eUlmRGlyZWN0aXZlIHtcclxuICBwcml2YXRlIGxvYWRlZCA9IGZhbHNlXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cclxuXHJcbiAgQElucHV0KCkgc2V0IGxpYkxhenlJZihjb25kaXRpb246IGJvb2xlYW4pIHtcclxuICAgIGlmIChjb25kaXRpb24gJiYgIXRoaXMubG9hZGVkKSB7XHJcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZilcclxuICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==