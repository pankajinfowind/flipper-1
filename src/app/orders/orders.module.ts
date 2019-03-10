import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [OrdersComponent],
  exports: [OrdersComponent],
  imports: [
    CommonModule,MaterialModule
  ]
})
export class OrdersModule { }
