import { TestBed, inject } from '@angular/core/testing';

import { ApiStockService } from './api.service';

describe('ApiStockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiStockService]
    });
  });

  it('should be created', inject([ApiStockService], (service: ApiStockService) => {
    expect(service).toBeTruthy();
  }));
});
