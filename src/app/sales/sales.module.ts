import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales/sales.component';
import { SalesRoutingModule } from './sales-routing.module';
import { MaterialModule } from '../material/material.module';
import { UiModule } from '../common/core/ui/ui.module';
import { FormsModule } from '@angular/forms';
import { GlobalVariables } from '../common/core/global-variables';

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
export class SalesModule { 
  constructor(public g: GlobalVariables) {
    this.g.checkInternet();
   }
}
