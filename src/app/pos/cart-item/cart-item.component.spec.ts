import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartItemComponent } from "./cart-item.component";
import { PosModule } from "../pos.module";
import { ModelFactory } from "ngx-model";
import { CustomerService } from "../../customers/customer.service";
import { of } from "rxjs/internal/observable/of";
import { Customer } from "../../customers/customer";
import { Observable } from "rxjs";

describe("CartItemComponent", () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let service: CustomerService;
  let customers: Observable<Customer[]>;
  let customer: Array<Customer> = [
    { name: "richie", id: 1 },
    { name: "Mura", id: 2 }
  ];
  const customerMockService = jasmine.createSpyObj("CustomerService", [
    "getCustomers"
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PosModule],
      providers: [
        { provide: ModelFactory },
        { provide: CustomerService, useValue: customerMockService }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    service = TestBed.get(CustomerService);
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should list customers", () => {
    service.getCustomers = () => of(customer);
    component.ngOnInit();
    customers = component.getCustomers();
    customers.subscribe(cust => {
      expect(cust).toEqual(customer);
    });
    expect(customerMockService.getCustomers).toHaveBeenCalled();
  });
});
