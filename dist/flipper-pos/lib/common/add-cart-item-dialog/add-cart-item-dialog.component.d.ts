import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService, Taxes, SettingsService } from '@enexus/flipper-components';
import { MatDialogRef } from '@angular/material/dialog';
export declare class AddCartItemDialogComponent implements OnInit {
    dialogRef: MatDialogRef<AddCartItemDialogComponent>;
    private formBuilder;
    protected notificationSvc: NotificationService;
    private setting;
    taxes$: Taxes[];
    units: any[];
    constructor(dialogRef: MatDialogRef<AddCartItemDialogComponent>, formBuilder: FormBuilder, notificationSvc: NotificationService, setting: SettingsService, taxes$: Taxes[]);
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
//# sourceMappingURL=add-cart-item-dialog.component.d.ts.map