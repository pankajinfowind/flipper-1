import { TestBed } from "@angular/core/testing";

import { CustomerService } from "./customer.service";
import { ModelFactory } from "ngx-model";
import { Customer } from "./customer";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { CUSTOMER } from '../mock-data/MOCK';

describe("CustomerService", () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  let customer: Array<Customer> = CUSTOMER;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModelFactory, CustomerService]
    }).compileComponents()
  );
  afterEach(() => {
    httpMock.verify();
  });
  beforeEach(() => {
    service = TestBed.get(CustomerService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should list customers", (done) => {
    service.getCustomers().subscribe(customers => {
      expect(customers.length).toBe(1);
      expect(customers).toEqual(customer);
    });
    const request = httpMock.expectOne(`http://localhost:8000/secure/${service.ROOT_URL}`);
    expect(request.request.method).toBe("GET");
    request.flush(customer);
    done();
  });

});
