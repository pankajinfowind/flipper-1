import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PayComponent } from './pay/pay.component';

@NgModule({
  declarations: [PayComponent],
  exports: [PayComponent],
  imports: [
    CommonModule,MaterialModule
  ]
})
export class  PayModule { }
