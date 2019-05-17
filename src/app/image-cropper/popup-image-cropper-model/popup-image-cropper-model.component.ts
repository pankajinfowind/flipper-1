import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ImageCropperComponent } from '../component/image-cropper.component';
import { ImageCroppedEvent } from '../interfaces/image-cropped-event.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface ImageModalData {
  title?: string;
}
@Component({
  selector: 'app-popup-image-cropper-model',
  templateUrl: './popup-image-cropper-model.component.html',
  styleUrls: ['./popup-image-cropper-model.component.scss']
})
export class PopupImageCropperModelComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  constructor(  private dialogRef: MatDialogRef<PopupImageCropperModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageModalData) { }

  ngOnInit() {
  }
  public close() {
    this.dialogRef.close(this.croppedImage?this.croppedImage:null);
}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
}
imageLoaded() {
  this.showCropper = true;
}
cropperReady() {
}
loadImageFailed () {
}
rotateLeft() {
  this.imageCropper.rotateLeft();
}
rotateRight() {
  this.imageCropper.rotateRight();
}
flipHorizontal() {
  this.imageCropper.flipHorizontal();
}
flipVertical() {
  this.imageCropper.flipVertical();
}
}
