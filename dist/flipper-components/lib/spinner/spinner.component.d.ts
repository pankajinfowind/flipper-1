import { OnInit } from '@angular/core';
import { ColorToFillClassPipe, Color } from '@enexus/flipper-color';
export declare class SpinnerComponent implements OnInit {
    private toFill;
    color: Color;
    size: number;
    get hostClass(): string;
    constructor(toFill: ColorToFillClassPipe);
    ngOnInit(): void;
}
//# sourceMappingURL=spinner.component.d.ts.map