import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import {StoreModule} from '@ngrx/store';
import {reducers,effect} from '../store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/material.module';
import { UiModule } from '../common/core/ui/ui.module';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { HttpModule } from '../common/core/http/http.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListComponent, AddComponent, ManageCustomerComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    StoreModule.forFeature('customers',reducers),
    EffectsModule.forFeature(effect),
  ],
  exports: [ListComponent,ManageCustomerComponent],

})
export class CustomersModule { }
