import { TestBed } from '@angular/core/testing';

import { NgxService } from './ngx-service';

describe('NgxServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxService = TestBed.get(NgxService);
    expect(service).toBeTruthy();
  });
});
