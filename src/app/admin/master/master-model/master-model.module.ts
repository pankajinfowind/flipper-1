import { NgModule, APP_INITIALIZER, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterModelComponent } from './master-model.component';
import { ItemModelComponent } from './item-model/item-model.component';
import { CategoryModelComponent } from './category-model/category-model.component';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InsuranceModelComponent } from './insurance-model/insurance-model.component';
import { PricingModelComponent } from './pricing-model/pricing-model.component';


@NgModule({
  declarations:
  [MasterModelComponent,ItemModelComponent,CategoryModelComponent,InsuranceModelComponent,PricingModelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MasterModelComponent,ItemModelComponent,CategoryModelComponent,InsuranceModelComponent,PricingModelComponent
  ]
})
export class MasterModelModule {

 }
