import { TestBed } from '@angular/core/testing';

import { StockModelService } from './stock-model.service';

describe('StockModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockModelService = TestBed.get(StockModelService);
    expect(service).toBeTruthy();
  });
});
