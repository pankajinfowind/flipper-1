import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule, MatNativeDateModule, MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ObserversModule } from '@angular/cdk/observers';
import { BidiModule } from '@angular/cdk/bidi';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/material/material.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const ɵ0 = {
    duration: 2000,
}, ɵ1 = {
    animationDuration: '0ms',
};
class MaterialModule {
}
MaterialModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatMenuModule,
                    MatIconModule,
                    MatToolbarModule,
                    MatButtonModule,
                    MatSidenavModule,
                    MatTreeModule,
                    MatCardModule,
                    MatTableModule,
                    MatDividerModule,
                    MatExpansionModule,
                    MatTabsModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    MatSlideToggleModule,
                    MatCheckboxModule,
                    MatProgressSpinnerModule,
                    MatProgressBarModule,
                    MatSnackBarModule,
                    MatTooltipModule,
                    MatStepperModule,
                    MatPaginatorModule,
                    MatSortModule,
                    MatOptionModule,
                    MatDialogModule,
                    MatListModule,
                    MatButtonToggleModule,
                    A11yModule,
                    PortalModule,
                    OverlayModule,
                    MatAutocompleteModule,
                    MatChipsModule,
                    MatDatepickerModule,
                    MatTableModule,
                    MatGridListModule,
                    MatProgressSpinnerModule,
                    MatRippleModule,
                    MatSelectModule,
                    MatSidenavModule,
                    MatSliderModule,
                    MatNativeDateModule,
                    MatStepperModule,
                    MatRadioModule,
                    BidiModule,
                    MatCommonModule,
                    ObserversModule,
                    MatBottomSheetModule,
                ],
                exports: [
                    MatMenuModule,
                    MatIconModule,
                    MatToolbarModule,
                    MatButtonModule,
                    MatSidenavModule,
                    MatTreeModule,
                    MatCardModule,
                    MatTableModule,
                    MatDividerModule,
                    MatExpansionModule,
                    MatTabsModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    MatSlideToggleModule,
                    MatCheckboxModule,
                    MatProgressSpinnerModule,
                    MatProgressBarModule,
                    MatSnackBarModule,
                    MatTooltipModule,
                    MatStepperModule,
                    MatPaginatorModule,
                    MatSortModule,
                    MatOptionModule,
                    MatDialogModule,
                    MatListModule,
                    MatButtonToggleModule,
                    A11yModule,
                    PortalModule,
                    OverlayModule,
                    MatAutocompleteModule,
                    MatChipsModule,
                    MatDatepickerModule,
                    MatTableModule,
                    MatProgressSpinnerModule,
                    MatRippleModule,
                    MatSelectModule,
                    MatSidenavModule,
                    MatSliderModule,
                    MatNativeDateModule,
                    MatStepperModule,
                    MatRadioModule,
                    MatGridListModule,
                    MatBottomSheetModule,
                    BidiModule,
                    MatCommonModule,
                    ObserversModule,
                ],
                providers: [
                    MatIconRegistry,
                    {
                        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
                        useValue: ɵ0,
                    },
                    {
                        provide: MAT_TABS_CONFIG,
                        useValue: ɵ1,
                    },
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/vendors.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VendorsModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: VendorsModule,
        };
    }
}
VendorsModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule],
                exports: [FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule],
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: enexus-flipper-vendors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { VendorsModule, MaterialModule as ɵa };
//# sourceMappingURL=enexus-flipper-vendors.js.map
