import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundNumberPipe } from './round-number.pipe';

@NgModule({
  declarations: [RoundNumberPipe],
  imports: [
    CommonModule
  ],
  exports: [RoundNumberPipe]
})
export class PipeModuleModule { }
