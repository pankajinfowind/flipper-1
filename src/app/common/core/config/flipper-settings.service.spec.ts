import { TestBed, inject } from "@angular/core/testing";

import { Settings } from "./flipper-settings.service";

describe("Settings", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Settings]
    });
  });

  it("should be created", inject([Settings], (service: Settings) => {
    expect(service).toBeTruthy();
  }));
});
