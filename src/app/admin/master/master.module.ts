import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    ItemsComponent,
    CategoriesComponent
  ],
  declarations: [ItemsComponent, CategoriesComponent]
})
export class MasterModule { }
