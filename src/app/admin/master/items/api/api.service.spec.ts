import { TestBed, inject } from '@angular/core/testing';
import { ApiItemService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiItemService]
    });
  });

  it('should be created', inject([ApiItemService], (service: ApiItemService) => {
    expect(service).toBeTruthy();
  }));
});
