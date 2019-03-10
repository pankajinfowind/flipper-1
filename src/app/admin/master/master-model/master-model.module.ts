import { NgModule, APP_INITIALIZER, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterModelComponent } from './master-model.component';
import { ItemModelComponent, EditItemDialog } from './item-model/item-model.component';
import { CategoryModelComponent } from './category-model/category-model.component';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InsuranceModelComponent } from './insurance-model/insurance-model.component';
import { BrandModelComponent } from './brand-model/brand-model.component';
import { StockModelModule } from '../../../stock/stock-model/stock-model.module';
import { ChangeCustomerTypePricesComponent } from './change-customer-type-prices/change-customer-type-prices.component';


@NgModule({
  declarations:
  [EditItemDialog,MasterModelComponent,ItemModelComponent,CategoryModelComponent,InsuranceModelComponent,BrandModelComponent, ChangeCustomerTypePricesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StockModelModule
 ],
  exports:[
    EditItemDialog,MasterModelComponent,ItemModelComponent,CategoryModelComponent,InsuranceModelComponent,BrandModelComponent
  ],
  entryComponents: [EditItemDialog]
})
export class MasterModelModule {
 }
