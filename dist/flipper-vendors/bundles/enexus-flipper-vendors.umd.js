(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/button'), require('@angular/material/button-toggle'), require('@angular/material/card'), require('@angular/material/checkbox'), require('@angular/material/core'), require('@angular/material/dialog'), require('@angular/material/divider'), require('@angular/material/expansion'), require('@angular/material/form-field'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/list'), require('@angular/material/menu'), require('@angular/material/paginator'), require('@angular/material/progress-bar'), require('@angular/material/progress-spinner'), require('@angular/material/select'), require('@angular/material/sidenav'), require('@angular/material/slide-toggle'), require('@angular/material/snack-bar'), require('@angular/material/sort'), require('@angular/material/stepper'), require('@angular/material/table'), require('@angular/material/tabs'), require('@angular/material/toolbar'), require('@angular/material/tooltip'), require('@angular/material/tree'), require('@angular/cdk/a11y'), require('@angular/cdk/portal'), require('@angular/cdk/overlay'), require('@angular/cdk/observers'), require('@angular/cdk/bidi'), require('@angular/material/autocomplete'), require('@angular/material/chips'), require('@angular/material/slider'), require('@angular/material/datepicker'), require('@angular/material/grid-list'), require('@angular/material/radio'), require('@angular/material/bottom-sheet'), require('@angular/flex-layout'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@enexus/flipper-vendors', ['exports', '@angular/core', '@angular/material/button', '@angular/material/button-toggle', '@angular/material/card', '@angular/material/checkbox', '@angular/material/core', '@angular/material/dialog', '@angular/material/divider', '@angular/material/expansion', '@angular/material/form-field', '@angular/material/icon', '@angular/material/input', '@angular/material/list', '@angular/material/menu', '@angular/material/paginator', '@angular/material/progress-bar', '@angular/material/progress-spinner', '@angular/material/select', '@angular/material/sidenav', '@angular/material/slide-toggle', '@angular/material/snack-bar', '@angular/material/sort', '@angular/material/stepper', '@angular/material/table', '@angular/material/tabs', '@angular/material/toolbar', '@angular/material/tooltip', '@angular/material/tree', '@angular/cdk/a11y', '@angular/cdk/portal', '@angular/cdk/overlay', '@angular/cdk/observers', '@angular/cdk/bidi', '@angular/material/autocomplete', '@angular/material/chips', '@angular/material/slider', '@angular/material/datepicker', '@angular/material/grid-list', '@angular/material/radio', '@angular/material/bottom-sheet', '@angular/flex-layout', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.enexus = global.enexus || {}, global.enexus['flipper-vendors'] = {}), global.ng.core, global.ng.material.button, global.ng.material.buttonToggle, global.ng.material.card, global.ng.material.checkbox, global.ng.material.core, global.ng.material.dialog, global.ng.material.divider, global.ng.material.expansion, global.ng.material.formField, global.ng.material.icon, global.ng.material.input, global.ng.material.list, global.ng.material.menu, global.ng.material.paginator, global.ng.material.progressBar, global.ng.material.progressSpinner, global.ng.material.select, global.ng.material.sidenav, global.ng.material.slideToggle, global.ng.material.snackBar, global.ng.material.sort, global.ng.material.stepper, global.ng.material.table, global.ng.material.tabs, global.ng.material.toolbar, global.ng.material.tooltip, global.ng.material.tree, global.ng.cdk.a11y, global.ng.cdk.portal, global.ng.cdk.overlay, global.ng.cdk.observers, global.ng.cdk.bidi, global.ng.material.autocomplete, global.ng.material.chips, global.ng.material.slider, global.ng.material.datepicker, global.ng.material.gridList, global.ng.material.radio, global.ng.material.bottomSheet, global.ng.flexLayout, global.ng.forms));
}(this, (function (exports, core, button, buttonToggle, card, checkbox, core$1, dialog, divider, expansion, formField, icon, input, list, menu, paginator, progressBar, progressSpinner, select, sidenav, slideToggle, snackBar, sort, stepper, table, tabs, toolbar, tooltip, tree, a11y, portal, overlay, observers, bidi, autocomplete, chips, slider, datepicker, gridList, radio, bottomSheet, flexLayout, forms) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/material/material.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ɵ0 = {
        duration: 2000,
    }, ɵ1 = {
        animationDuration: '0ms',
    };
    var MaterialModule = /** @class */ (function () {
        function MaterialModule() {
        }
        return MaterialModule;
    }());
    MaterialModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        menu.MatMenuModule,
                        icon.MatIconModule,
                        toolbar.MatToolbarModule,
                        button.MatButtonModule,
                        sidenav.MatSidenavModule,
                        tree.MatTreeModule,
                        card.MatCardModule,
                        table.MatTableModule,
                        divider.MatDividerModule,
                        expansion.MatExpansionModule,
                        tabs.MatTabsModule,
                        formField.MatFormFieldModule,
                        input.MatInputModule,
                        select.MatSelectModule,
                        slideToggle.MatSlideToggleModule,
                        checkbox.MatCheckboxModule,
                        progressSpinner.MatProgressSpinnerModule,
                        progressBar.MatProgressBarModule,
                        snackBar.MatSnackBarModule,
                        tooltip.MatTooltipModule,
                        stepper.MatStepperModule,
                        paginator.MatPaginatorModule,
                        sort.MatSortModule,
                        core$1.MatOptionModule,
                        dialog.MatDialogModule,
                        list.MatListModule,
                        buttonToggle.MatButtonToggleModule,
                        a11y.A11yModule,
                        portal.PortalModule,
                        overlay.OverlayModule,
                        autocomplete.MatAutocompleteModule,
                        chips.MatChipsModule,
                        datepicker.MatDatepickerModule,
                        table.MatTableModule,
                        gridList.MatGridListModule,
                        progressSpinner.MatProgressSpinnerModule,
                        core$1.MatRippleModule,
                        select.MatSelectModule,
                        sidenav.MatSidenavModule,
                        slider.MatSliderModule,
                        core$1.MatNativeDateModule,
                        stepper.MatStepperModule,
                        radio.MatRadioModule,
                        bidi.BidiModule,
                        core$1.MatCommonModule,
                        observers.ObserversModule,
                        bottomSheet.MatBottomSheetModule,
                    ],
                    exports: [
                        menu.MatMenuModule,
                        icon.MatIconModule,
                        toolbar.MatToolbarModule,
                        button.MatButtonModule,
                        sidenav.MatSidenavModule,
                        tree.MatTreeModule,
                        card.MatCardModule,
                        table.MatTableModule,
                        divider.MatDividerModule,
                        expansion.MatExpansionModule,
                        tabs.MatTabsModule,
                        formField.MatFormFieldModule,
                        input.MatInputModule,
                        select.MatSelectModule,
                        slideToggle.MatSlideToggleModule,
                        checkbox.MatCheckboxModule,
                        progressSpinner.MatProgressSpinnerModule,
                        progressBar.MatProgressBarModule,
                        snackBar.MatSnackBarModule,
                        tooltip.MatTooltipModule,
                        stepper.MatStepperModule,
                        paginator.MatPaginatorModule,
                        sort.MatSortModule,
                        core$1.MatOptionModule,
                        dialog.MatDialogModule,
                        list.MatListModule,
                        buttonToggle.MatButtonToggleModule,
                        a11y.A11yModule,
                        portal.PortalModule,
                        overlay.OverlayModule,
                        autocomplete.MatAutocompleteModule,
                        chips.MatChipsModule,
                        datepicker.MatDatepickerModule,
                        table.MatTableModule,
                        progressSpinner.MatProgressSpinnerModule,
                        core$1.MatRippleModule,
                        select.MatSelectModule,
                        sidenav.MatSidenavModule,
                        slider.MatSliderModule,
                        core$1.MatNativeDateModule,
                        stepper.MatStepperModule,
                        radio.MatRadioModule,
                        gridList.MatGridListModule,
                        bottomSheet.MatBottomSheetModule,
                        bidi.BidiModule,
                        core$1.MatCommonModule,
                        observers.ObserversModule,
                    ],
                    providers: [
                        icon.MatIconRegistry,
                        {
                            provide: snackBar.MAT_SNACK_BAR_DEFAULT_OPTIONS,
                            useValue: ɵ0,
                        },
                        {
                            provide: tabs.MAT_TABS_CONFIG,
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
    var VendorsModule = /** @class */ (function () {
        function VendorsModule() {
        }
        /**
         * @return {?}
         */
        VendorsModule.forRoot = function () {
            return {
                ngModule: VendorsModule,
            };
        };
        return VendorsModule;
    }());
    VendorsModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [forms.FormsModule, forms.ReactiveFormsModule, MaterialModule, flexLayout.FlexLayoutModule],
                    exports: [forms.FormsModule, forms.ReactiveFormsModule, MaterialModule, flexLayout.FlexLayoutModule],
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

    exports.VendorsModule = VendorsModule;
    exports.ɵa = MaterialModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=enexus-flipper-vendors.umd.js.map
