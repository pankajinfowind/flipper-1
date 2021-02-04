import { TemplateRef, ViewContainerRef } from '@angular/core';
export declare class LazyIfDirective {
    private templateRef;
    private viewContainer;
    private loaded;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
    set libLazyIf(condition: boolean);
}
//# sourceMappingURL=lazy-if.directive.d.ts.map