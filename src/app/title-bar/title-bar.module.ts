import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [TitleBarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [TitleBarComponent]
})
export class TitleBarModule { }
