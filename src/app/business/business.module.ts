import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBusinessComponent } from './new-business/new-business.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../common/core/ui/ui.module';
import { ImageCropperModule } from '../image-cropper/image-cropper.module';
import { TitleBarModule } from '../title-bar/title-bar.module';

@NgModule({
  imports: [
    CommonModule,MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    ImageCropperModule
  ],
  declarations: [NewBusinessComponent],
  exports:[NewBusinessComponent]
})
export class BusinessModule { }
