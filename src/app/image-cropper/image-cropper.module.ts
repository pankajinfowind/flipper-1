import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent } from './component/image-cropper.component';
import { PopupImageCropperModelComponent } from './popup-image-cropper-model/popup-image-cropper-model.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        ImageCropperComponent,
        PopupImageCropperModelComponent
    ],
    exports: [
        ImageCropperComponent,PopupImageCropperModelComponent
    ],
    entryComponents: [PopupImageCropperModelComponent]
})
export class ImageCropperModule {}
