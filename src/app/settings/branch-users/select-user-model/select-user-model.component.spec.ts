import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserModelComponent } from './select-user-model.component';

describe('SelectUserModelComponent', () => {
  let component: SelectUserModelComponent;
  let fixture: ComponentFixture<SelectUserModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectUserModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUserModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
