import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatCommonModule
} from "@angular/material";

import { OverlayModule } from "@angular/cdk/overlay";

import { PortalModule } from "@angular/cdk/portal";

import { BidiModule } from "@angular/cdk/bidi";

import { A11yModule } from "@angular/cdk/a11y";

import { ObserversModule } from "@angular/cdk/observers";

import { NgModule } from "@angular/core";

const MATERIAL_MODULES = [
  MatAutocompleteModule,

  MatButtonModule,

  MatButtonToggleModule,

  MatCardModule,

  MatChipsModule,

  MatCheckboxModule,

  MatDatepickerModule,

  MatTableModule,

  MatDialogModule,

  MatFormFieldModule,

  MatGridListModule,

  MatIconModule,

  MatInputModule,

  MatListModule,

  MatMenuModule,

  MatPaginatorModule,

  MatProgressBarModule,

  MatProgressSpinnerModule,

  MatRippleModule,

  MatSelectModule,

  MatSidenavModule,

  MatSliderModule,

  MatSlideToggleModule,

  MatSnackBarModule,

  MatSortModule,

  MatStepperModule,

  MatTabsModule,
  MatToolbarModule,
  OverlayModule,
  PortalModule,
  BidiModule,
  A11yModule,
  MatCommonModule,
  ObserversModule
];

@NgModule({
  imports: MATERIAL_MODULES,

  declarations: [],
  exports: MATERIAL_MODULES
})
export class MaterialModule {}
