import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetPassLinkComponent } from './send-reset-pass-link.component';

describe('SendResetPassLinkComponent', () => {
  let component: SendResetPassLinkComponent;
  let fixture: ComponentFixture<SendResetPassLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendResetPassLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendResetPassLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
