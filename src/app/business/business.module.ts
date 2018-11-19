import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBusinessComponent } from './new-business/new-business.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NewBusinessComponent]
})
export class BusinessModule { }
