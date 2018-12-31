import { TestBed } from "@angular/core/testing";

import { CustomerService } from "./customer.service";
import { ModelFactory } from "ngx-model";
import { Customer } from "./customer";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { of } from "rxjs/observable/of";
import { Observable } from "rxjs";

describe("CustomerService", () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  let customer: Array<Customer> = [
    { name: "richie", id: 1 },
    { name: "Mura", id: 2 }
  ];
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModelFactory, CustomerService]
    })
  );
  afterEach(() => {
    httpMock.verify();
  });
  beforeEach(() => {
    service = TestBed.get(CustomerService);
    customer = service.create(customer).get();
    httpMock = TestBed.get(HttpTestingController);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should create a customer", () => {
    expect(service.model.get()).toEqual(customer);
  });
  it("should list customers", () => {
    service.getCustomers().subscribe(customers => {
      expect(customers.length).toBe(2);
      expect(customers).toEqual(customer);
    });
    const request = httpMock.expectOne(`${service.ROOT_URL}`);
    expect(request.request.method).toBe("GET");
    request.flush(customer);
  });
  it("should Init customer List", () => {
    let customer: Observable<Customer[]> = of([
      { name: "richie", id: 1 },
      { name: "Mura", id: 2 }
    ]);
    service.initCustomerList(customer).subscribe(cust => {
      expect(cust).toEqual([
        { name: "richie", id: 1 },
        { name: "Mura", id: 2 }
      ]);
    });
  });
});
