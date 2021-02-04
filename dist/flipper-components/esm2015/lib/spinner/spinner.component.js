import { Component, HostBinding, Input } from '@angular/core';
import { ColorToFillClassPipe } from '@enexus/flipper-color';
export class SpinnerComponent {
    constructor(toFill) {
        this.toFill = toFill;
        this.color = 'primary';
        this.size = 24;
    }
    get hostClass() {
        return this.toFill.transform(this.color);
    }
    ngOnInit() { }
}
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'flipper-spinner',
                template: "<svg version=\"1.1\" id=\"Calque_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 70 70\" [style.width.px]=\"size\" [style.height.px]=\"size\" xml:space=\"preserve\">\r\n  <rect x=\"30\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"40\" width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"50\" y=\"10\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"60\" y=\"20\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"60\" y=\"30\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"60\" y=\"40\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"50\" y=\"50\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"40\" y=\"60\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"30\" y=\"60\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"20\" y=\"60\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"10\" y=\"50\"  width=\"10\" height=\"10\"></rect>\r\n  <rect y=\"40\"  width=\"10\" height=\"10\"></rect>\r\n  <rect y=\"30\"  width=\"10\" height=\"10\"></rect>\r\n  <rect y=\"20\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"10\" y=\"10\"  width=\"10\" height=\"10\"></rect>\r\n  <rect x=\"20\"  width=\"10\" height=\"10\"></rect>\r\n</svg>\r\n",
                styles: ["rect{animation-duration:1s;animation-iteration-count:infinite;animation-name:spinner}rect:first-child{animation-delay:.0625s;visibility:hidden}rect:nth-child(2){animation-delay:.125s;visibility:hidden}rect:nth-child(3){animation-delay:.1875s;visibility:hidden}rect:nth-child(4){animation-delay:.25s;visibility:hidden}rect:nth-child(5){animation-delay:.3125s;visibility:hidden}rect:nth-child(6){animation-delay:.375s;visibility:hidden}rect:nth-child(7){animation-delay:.4375s;visibility:hidden}rect:nth-child(8){animation-delay:.5s;visibility:hidden}rect:nth-child(9){animation-delay:.5625s;visibility:hidden}rect:nth-child(10){animation-delay:.625s;visibility:hidden}rect:nth-child(11){animation-delay:.6875s;visibility:hidden}rect:nth-child(12){animation-delay:.75s;visibility:hidden}rect:nth-child(13){animation-delay:.8125s;visibility:hidden}rect:nth-child(14){animation-delay:.875s;visibility:hidden}rect:nth-child(15){animation-delay:.9375s;visibility:hidden}rect:nth-child(16){animation-delay:1s;visibility:hidden}@keyframes spinner{0%{visibility:visible}40%{visibility:visible}70%{visibility:hidden}to{visibility:hidden}}"]
            },] }
];
SpinnerComponent.ctorParameters = () => [
    { type: ColorToFillClassPipe }
];
SpinnerComponent.propDecorators = {
    color: [{ type: Input }],
    size: [{ type: Input }],
    hostClass: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLWNvbXBvbmVudHMvc3JjL2xpYi9zcGlubmVyL3NwaW5uZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQTtBQUNyRSxPQUFPLEVBQUUsb0JBQW9CLEVBQVMsTUFBTSx1QkFBdUIsQ0FBQTtBQU9uRSxNQUFNLE9BQU8sZ0JBQWdCO0lBUzNCLFlBQW9CLE1BQTRCO1FBQTVCLFdBQU0sR0FBTixNQUFNLENBQXNCO1FBUnZDLFVBQUssR0FBVSxTQUFTLENBQUE7UUFDeEIsU0FBSSxHQUFHLEVBQUUsQ0FBQTtJQU9pQyxDQUFDO0lBTHBELElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFJRCxRQUFRLEtBQUksQ0FBQzs7O1lBaEJkLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixzdUNBQXVDOzthQUV4Qzs7O1lBTlEsb0JBQW9COzs7b0JBUTFCLEtBQUs7bUJBQ0wsS0FBSzt3QkFFTCxXQUFXLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQgeyBDb2xvclRvRmlsbENsYXNzUGlwZSwgQ29sb3IgfSBmcm9tICdAZW5leHVzL2ZsaXBwZXItY29sb3InXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ZsaXBwZXItc3Bpbm5lcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NwaW5uZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NwaW5uZXIuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNwaW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGNvbG9yOiBDb2xvciA9ICdwcmltYXJ5J1xyXG4gIEBJbnB1dCgpIHNpemUgPSAyNFxyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcclxuICBnZXQgaG9zdENsYXNzKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50b0ZpbGwudHJhbnNmb3JtKHRoaXMuY29sb3IpXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvRmlsbDogQ29sb3JUb0ZpbGxDbGFzc1BpcGUpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxufVxyXG4iXX0=