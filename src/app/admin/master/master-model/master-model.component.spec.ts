import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterModelComponent } from './master-model.component';

describe('MasterModelComponent', () => {
  let component: MasterModelComponent;
  let fixture: ComponentFixture<MasterModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
