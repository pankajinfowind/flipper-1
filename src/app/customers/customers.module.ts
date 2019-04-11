import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { MaterialModule } from '../material/material.module';
import { UiModule } from '../common/core/ui/ui.module';
import { CrupdateCustomerModelComponent } from './manage-customer/manage-customer.component';
import { HttpModule } from '../common/core/http/http.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomerRoutingModule } from './customer-routing.module';
import { DataTableModule } from '../data-table/data-table/data-table.module';

@NgModule({
  declarations: [ListComponent, AddComponent, CrupdateCustomerModelComponent],
  entryComponents: [CrupdateCustomerModelComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    CustomerRoutingModule,
    DataTableModule
  ],
  exports: [ListComponent,CrupdateCustomerModelComponent],

})

export class CustomersModule { }
