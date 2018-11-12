import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordVerifyComponent } from './password-verify.component';

describe('PasswordVerifyComponent', () => {
  let component: PasswordVerifyComponent;
  let fixture: ComponentFixture<PasswordVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
