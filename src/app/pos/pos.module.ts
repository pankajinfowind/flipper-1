import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PosComponent],
  imports: [
    CommonModule,
    PosRoutingModule,
    SharedModule
  ]
})
export class PosModule { }
