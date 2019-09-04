import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
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
  MatCommonModule,
  MatRadioModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatTreeModule,
  MatExpansionModule,
  MatBottomSheetModule
} from "@angular/material";
import {MatDatepickerModule} from '@angular/material/datepicker';

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
  MatTooltipModule,
  MatPaginatorModule,

  MatProgressBarModule,

  MatProgressSpinnerModule,

  MatRippleModule,

  MatSelectModule,

  MatSidenavModule,

  MatSliderModule,

  MatSlideToggleModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatTreeModule,
  MatSortModule,
  MatNativeDateModule,
  MatStepperModule,
  MatRadioModule,
  MatTabsModule,
  MatToolbarModule,
  OverlayModule,
  PortalModule,
  BidiModule,
  A11yModule,
  MatCommonModule,
  ObserversModule,
  MatBottomSheetModule
];

@NgModule({
  imports: MATERIAL_MODULES,

  declarations: [],
  exports: MATERIAL_MODULES
})
export class MaterialModule {}
