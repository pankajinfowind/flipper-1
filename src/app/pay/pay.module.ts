import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PayComponent } from './pay/pay.component';
import { InvoicesModule } from '../invoices/invoices.module';
import { UiModule } from '../common/core/ui/ui.module';

@NgModule({
  declarations: [PayComponent],
  exports: [PayComponent],
  imports: [
    CommonModule,MaterialModule,InvoicesModule,
    UiModule
  ]
})
export class  PayModule { }
