import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterModule } from './master/master.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MasterModule,
    MaterialModule,
    AdminRoutingModule
  ],
  exports:[
    AdminComponent
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
