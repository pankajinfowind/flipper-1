import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryModelComponent } from './category-model.component';


describe('CategoryModelComponent', () => {
  let component: CategoryModelComponent;
  let fixture: ComponentFixture<CategoryModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
