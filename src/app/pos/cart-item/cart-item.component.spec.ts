import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartItemComponent } from "./cart-item.component";
import { PosModule } from "../pos.module";
import { ModelFactory } from "ngx-model";
import { CustomerService } from "../../customers/customer.service";
import { of } from "rxjs/internal/observable/of";
import { Customer } from "../../customers/customer";
import { Observable } from "rxjs";
import { PosModelService } from "../pos-model.service";
import { OrderItemsModelService } from "../cart/order-item-model.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("CartItemComponent", () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let pos: PosModelService;
  let order: OrderItemsModelService;

  let service: CustomerService;
  let customers: Observable<Customer[]>;
  let customer: Array<Customer> = [
    { name: "richie", id: 1 },
    { name: "Mura", id: 2 }
  ];
  const customerMockService = jasmine.createSpyObj("CustomerService", [
    "getCustomers"
  ]);
  const posmodelMockService = jasmine.createSpyObj("PosModelService", [
    "getCustomers" //Todo: change method to be from PosModelService
  ]);
  const orderItemMockService = jasmine.createSpyObj("OrderItemsModelService", [
    "getCustomers" //Todo: change method to be from OrderItemsModelService
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PosModule, HttpClientTestingModule],
      providers: [
        { provide: ModelFactory },
        { provide: CustomerService, useValue: customerMockService },
        { provide: PosModelService, useValue: posmodelMockService },
        { provide: OrderItemsModelService, useValue: orderItemMockService }
      ]
      // schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));
  beforeEach(() => {
    service = TestBed.get(CustomerService);
    order = TestBed.get(OrderItemsModelService);
    pos = TestBed.get(PosModelService);
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ?
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
