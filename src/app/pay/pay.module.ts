import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PayComponent } from './pay/pay.component';
import { InvoicesModule } from '../invoices/invoices.module';
import { UiModule } from '../common/core/ui/ui.module';
import { PayRoutingModule } from '../routing/pay-routing.module';
import { NgxsModule } from '@ngxs/store';
import { PosOrderState } from '../store/states/PosOrderStates';
import { PrintOutModule } from '../print-out/print-out.module';

@NgModule({
  declarations: [PayComponent],
  exports: [PayComponent],
  imports: [
    CommonModule,MaterialModule,
    UiModule,
    PayRoutingModule,
    PrintOutModule,
    NgxsModule.forFeature([PosOrderState]),
  ],
  bootstrap: [PayComponent]
})
export class  PayModule { }
