import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptSettingComponent } from './receipt-setting.component';

describe('ReceiptSettingComponent', () => {
  let component: ReceiptSettingComponent;
  let fixture: ComponentFixture<ReceiptSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
