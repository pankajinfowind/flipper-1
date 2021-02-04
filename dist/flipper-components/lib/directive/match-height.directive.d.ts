import { AfterViewChecked, ElementRef } from '@angular/core';
export declare class MatchHeightDirective implements AfterViewChecked {
    private el;
    myMatchHeight: string;
    constructor(el: ElementRef);
    onResize(): void;
    ngAfterViewChecked(): void;
    matchHeight(parent: HTMLElement, className: string): void;
}
//# sourceMappingURL=match-height.directive.d.ts.map