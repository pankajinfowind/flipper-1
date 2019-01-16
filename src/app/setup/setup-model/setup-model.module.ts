import { NgModule, APP_INITIALIZER, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { TaxRateModelComponent } from './tax-rate-model/tax-rate-model.component';
import { SetUpModelComponent } from './setup-model.component';


@NgModule({
  declarations:
  [TaxRateModelComponent,
    SetUpModelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    TaxRateModelComponent,
    SetUpModelComponent
  ]
})
export class SetUpModelModule {

 }
