import { NgModule } from "@angular/core";

import { OverlayModule } from "@angular/cdk/overlay";

import { A11yModule } from "@angular/cdk/a11y";

import { BidiModule } from "@angular/cdk/bidi";

import { ObserversModule } from "@angular/cdk/observers";

import { PortalModule } from "@angular/cdk/portal";

import { MatCommonModule, MatRippleModule } from "@angular/material";

import { MatCheckboxModule } from "@angular/material";

import { MatSlideToggleModule } from "@angular/material";

import { MatSliderModule } from "@angular/material";

import { MatSidenavModule } from "@angular/material";

import { MatListModule } from "@angular/material";

import { MatGridListModule } from "@angular/material";

import { MatCardModule } from "@angular/material";

import { MatChipsModule } from "@angular/material";

import { MatIconModule } from "@angular/material";

import { MatProgressSpinnerModule } from "@angular/material";

import { MatProgressBarModule } from "@angular/material";

import { MatInputModule } from "@angular/material/input";

import { MatSnackBarModule } from "@angular/material";

import {
  MatTabsModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatSelectModule
} from "@angular/material";

import { MatToolbarModule } from "@angular/material";

import { MatMenuModule } from "@angular/material";

import { MatDialogModule } from "@angular/material";

import { MatAutocompleteModule } from "@angular/material";

import { MatDatepickerModule } from "@angular/material";

import { MatTableModule } from "@angular/material";

import { MatSortModule } from "@angular/material";

import { MatPaginatorModule } from "@angular/material";

import { MatFormFieldModule } from "@angular/material";

import { MatStepperModule } from "@angular/material";

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
