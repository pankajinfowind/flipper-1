import { TestBed, inject } from "@angular/core/testing";

import { HttpErrorHandler } from "./http-error-handler";

describe("HttpErrorHandler", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorHandler]
    });
  });

  it("should be created", inject(
    [HttpErrorHandler],
    (service: HttpErrorHandler) => {
      expect(service).toBeTruthy();
    }
  ));
});
