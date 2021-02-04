import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from '@enexus/flipper-components';
import { MatDialogRef } from '@angular/material/dialog';
export declare class UpdatePriceDialogComponent implements OnInit {
    dialogRef: MatDialogRef<UpdatePriceDialogComponent>;
    price: any;
    private formBuilder;
    protected notificationSvc: NotificationService;
    constructor(dialogRef: MatDialogRef<UpdatePriceDialogComponent>, price: any, formBuilder: FormBuilder, notificationSvc: NotificationService);
    get formControl(): {
        [key: string]: import("@angular/forms").AbstractControl;
    };
    submitted: boolean;
    form: FormGroup;
    isFocused: string;
    onKeydownHandler(event: KeyboardEvent): void;
    ngOnInit(): void;
    onSubmit(): void;
    focusing(value: any): void;
    focusingOut(): void;
}
//# sourceMappingURL=update-price-dialog.component.d.ts.map