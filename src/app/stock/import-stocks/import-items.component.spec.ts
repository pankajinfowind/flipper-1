import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportStocksComponent } from './import-stocks.component';


describe('ImportStocksComponent', () => {
  let component: ImportStocksComponent;
  let fixture: ComponentFixture<ImportStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
