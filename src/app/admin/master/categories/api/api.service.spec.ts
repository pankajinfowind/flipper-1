import { TestBed, inject } from '@angular/core/testing';

import { ApiCategoryService } from './api.service';

describe('ApiCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiCategoryService]
    });
  });

  it('should be created', inject([ApiCategoryService], (service: ApiCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
