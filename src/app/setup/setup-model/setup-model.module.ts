import { NgModule, APP_INITIALIZER, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { TaxRateModelComponent } from './tax-rate-model/tax-rate-model.component';
import { SetUpModelComponent } from './setup-model.component';
import { ReasonModelComponent } from './reason-model/reason-model.component';


@NgModule({
  declarations:
  [TaxRateModelComponent,
    SetUpModelComponent,
    ReasonModelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    TaxRateModelComponent,
    SetUpModelComponent,
    ReasonModelComponent
  ]
})
export class SetUpModelModule {

 }
