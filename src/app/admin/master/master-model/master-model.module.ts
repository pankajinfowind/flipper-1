import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterModelComponent } from './master-model.component';
import { ItemModelComponent } from './item-model/item-model.component';
import { CategoryModelComponent } from './category-model/category-model.component';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations:
  [MasterModelComponent,ItemModelComponent,CategoryModelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MasterModelComponent,ItemModelComponent,CategoryModelComponent
  ]
})
export class MasterModelModule { }
