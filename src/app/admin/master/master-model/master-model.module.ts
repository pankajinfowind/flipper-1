import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterModelComponent } from './master-model.component';
import { ItemModelComponent, EditItemDialog } from './item-model/item-model.component';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StockModelModule } from '../../../stock/stock-model/stock-model.module';
import { ChangeCustomerTypePricesComponent } from './change-customer-type-prices/change-customer-type-prices.component';


@NgModule({
  declarations:
  [EditItemDialog,MasterModelComponent,ItemModelComponent, ChangeCustomerTypePricesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StockModelModule
 ],
  exports:[
    EditItemDialog,MasterModelComponent,ItemModelComponent
  ],
  entryComponents: [EditItemDialog]
})
export class MasterModelModule {
 }
