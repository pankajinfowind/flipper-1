import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpirationSettingComponent } from './expiration_setting.component';


describe('ExpirationSettingComponent', () => {
  let component: ExpirationSettingComponent;
  let fixture: ComponentFixture<ExpirationSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpirationSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpirationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
