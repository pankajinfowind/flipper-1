import { async, ComponentFixture, TestBed, flush, tick } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { CustomerService } from '../customer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/observable/of';
import { CUSTOMER } from '../../mock-data/MOCK';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let customerServiceMock = jasmine.createSpyObj("CustomerService", ["mock"]);
  let cusomerServiceInstance: CustomerService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: CustomerService, useValue: customerServiceMock
      }],
      declarations: [ListComponent]
    })
      .compileComponents();
  }));
  beforeEach(async(() => {
    cusomerServiceInstance = TestBed.get(CustomerService);
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should list customers given []", () => {
    cusomerServiceInstance.getCustomers = () => of(CUSTOMER);
    let customers = component.listCustomers();
    customers.subscribe(cust => {
      // expect(cust).toEqual(customer);
    });
    // expect(customerServiceMock.getCustomers).toHaveBeenCalled(); // ?
  });
  it("should add a new customers", () => {

  });
  it("should edit a customer", () => {

  });
});
