import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardValidationComponent } from './validate-card.component';


describe('CardValidationComponent', () => {
  let component: CardValidationComponent;
  let fixture: ComponentFixture<CardValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
