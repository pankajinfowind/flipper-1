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
import { ApiPosService } from '../api/api.service';
import { MatDialog } from '@angular/material';
import { OrderModelService } from '../../orders/order-model.service';
import { StockModelService } from '../../stock/stock-model.service';
import { MasterModelService } from '../../admin/master/master-model.service';
import { CurrentUser } from '../../common/auth/current-user';


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

  const posmodelMockService = jasmine.createSpyObj("ApiPosService", [
    "updateOrderItem"
  ]);
  const orderItemMockService = jasmine.createSpyObj("PosModelService", [
    "update"
  ]);
  const model = jasmine.createSpyObj("MatDialog", [
    "dummy"
  ]);
  const posModelService = jasmine.createSpyObj("PosModelService", [
    "master"
  ]);
  const currentUser = jasmine.createSpyObj("CurrentUser", [
    "dummy"
  ]);
  let user: CurrentUser;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PosModule, HttpClientTestingModule],
      providers: [
        { provide: ApiPosService, useValue: posmodelMockService },
        { provide: currentUser, useValue: CurrentUser },
        { provide: OrderItemsModelService, useValue: orderItemMockService },
        { provide: PosModelService, useValue: posModelService },
        { provide: customerMockService, useValue: CustomerService },
        { provide: MatDialog, useValue: model }
      ]

    }).compileComponents();
  }));

  beforeEach(() => {
    user = TestBed.get(CurrentUser);
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
    customers = component.cu();
    customers.subscribe(cust => {
      expect(cust).toEqual(customer);
    });
    // expect(customerMockService.getCustomers).toHaveBeenCalled(); // ?
  });

});
