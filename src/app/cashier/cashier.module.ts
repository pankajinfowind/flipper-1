import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierRoutingModule } from './cashier-routing.module';
import { UiModule } from '../common/core/ui/ui.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CashierRoutingModule,
    UiModule
  ]
})
export class CashierModule { }
