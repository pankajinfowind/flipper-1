import { TestBed, inject, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { AppHttpClientService } from "./app-http-client.service";

describe("AppHttpClientService", () => {
  let injector: TestBed;
  let service: AppHttpClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppHttpClientService]
    });
    injector = getTestBed();
    service = injector.get(AppHttpClientService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    //to make sure that there is no outstanding request.
    httpMock.verify();
  });
  it("should be created", inject(
    [AppHttpClientService],
    (service: AppHttpClientService) => {
      expect(service).toBeTruthy();
    }
  ));
});
