import { TestBed } from '@angular/core/testing';

import { ApiCustomizeInvoiceService } from './api-customize-invoice.service';

describe('ApiCustomizeInvoiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCustomizeInvoiceService = TestBed.get(ApiCustomizeInvoiceService);
    expect(service).toBeTruthy();
  });
});
