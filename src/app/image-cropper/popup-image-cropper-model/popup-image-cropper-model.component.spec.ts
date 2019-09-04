import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupImageCropperModelComponent } from './popup-image-cropper-model.component';

describe('PopupImageCropperModelComponent', () => {
  let component: PopupImageCropperModelComponent;
  let fixture: ComponentFixture<PopupImageCropperModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupImageCropperModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupImageCropperModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
