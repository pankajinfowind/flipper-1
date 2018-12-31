import { async, ComponentFixture, TestBed, flush, tick, fakeAsync } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { CustomerService } from '../customer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/observable/of';
import { CUSTOMER } from '../../mock-data/MOCK';
import { Customer } from '../customer';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let customerServiceMock = jasmine.createSpyObj("CustomerService", ["getCustomers", "createCustomer"]);
  let cusomerServiceInstance: CustomerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: CustomerService, useValue: customerServiceMock
      }
      ],
      declarations: [ListComponent]
    })
      .compileComponents();
  }));
  afterEach(() => {
    // component.addCustomer = null;
  });
  // create reusable function for a dry spec.
  function updateRegisterCustomerForm(full_name) {
    component.register_customer_form.controls['full_name'].setValue(full_name);
  }
  beforeEach(async(() => {
    cusomerServiceInstance = TestBed.get(CustomerService);
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form value should update from form changes', fakeAsync(() => {
    updateRegisterCustomerForm("mura");
    // expect(component.register_customer_form.value).toEqual(validUser);
  }));
  it("should list customers given []", () => {
    cusomerServiceInstance.getCustomers = () => of(CUSTOMER);
    let customers = component.listCustomers();
    customers.subscribe(cust => {
      expect(cust).toEqual(CUSTOMER);
    });
    expect(customerServiceMock.getCustomers).toHaveBeenCalled();
  });
  it("should add a new customers", () => {
    const cust: Partial<Customer[]> = [{ full_name: 'mura' }];
    cusomerServiceInstance.createCustomer = () => of(cust);
    updateRegisterCustomerForm("mura");
    component.addCustomer();
    expect(component.cust).toEqual({ full_name: "mura" });
    // expect(customerServiceMock.createCustomer).toHaveBeenCalled();
  });
  it("should edit existing customer", () => {
    const cust: Partial<Customer[]> = [{ full_name: 'mura', address: "Kigali" }];

  })
});
