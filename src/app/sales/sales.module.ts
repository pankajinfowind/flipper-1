import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales/sales.component';
import { SalesRoutingModule } from './sales-routing.module';
import { MaterialModule } from '../material/material.module';
import { UiModule } from '../common/core/ui/ui.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SalesComponent],
  exports: [SalesComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MaterialModule,
    FormsModule,
    UiModule,
  ],
  bootstrap: [SalesComponent]
})
export class SalesModule { }
