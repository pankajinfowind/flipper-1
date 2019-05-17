import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCompanyComponent } from './set-company.component';

describe('SetCompanyComponent', () => {
  let component: SetCompanyComponent;
  let fixture: ComponentFixture<SetCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
