import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { UiModule } from '../common/core/ui/ui.module';
import { CrupdateCustomerModelComponent } from './manage-customer/manage-customer.component';
import { HttpModule } from '../common/core/http/http.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomerRoutingModule } from './customer-routing.module';
import { DataTableModule } from '../data-table/data-table/data-table.module';
import { SelectCustomerModelComponent } from './manage-customer/select-customer-model/select-customer-model.component';
import { CustomersComponent } from './customer/customer.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { SetupModule } from '../setup/setup.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    CustomerRoutingModule,
    DataTableModule,
    SetupModule
  ],
  declarations: [CustomersComponent, CrupdateCustomerModelComponent, SelectCustomerModelComponent],
  exports: [CustomersComponent,CrupdateCustomerModelComponent,SelectCustomerModelComponent],
  entryComponents: [CrupdateCustomerModelComponent,SelectCustomerModelComponent],
  bootstrap: [CustomersComponent],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class CustomersModule { }
