import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { CategoriesComponent } from './categories/categories.component';
import { MasterComponent } from './master/master.component';
import { MaterialModule } from '../../material/material.module';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ItemsComponent,
    CategoriesComponent,
    MasterComponent,
    ModalComponent
  ],
  declarations: [ItemsComponent, CategoriesComponent, MasterComponent, ModalComponent],

})
export class MasterModule { }
