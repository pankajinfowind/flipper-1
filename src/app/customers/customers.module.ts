import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule, MatDialogModule, MatButtonModule, MatInputModule } from '@angular/material';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [ListComponent, AddComponent],
  entryComponents: [AddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [ListComponent],

})
export class CustomersModule { }
