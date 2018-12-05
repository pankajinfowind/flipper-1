import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InsuranceModelComponent } from './insurance-model.component';


describe('InsuranceModelComponent', () => {
  let component: InsuranceModelComponent;
  let fixture: ComponentFixture<InsuranceModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
