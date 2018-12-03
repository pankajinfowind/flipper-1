import { TestBed, inject } from '@angular/core/testing';
import { ApiInsuranceService } from './ap.service';


describe('ApiInsuranceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiInsuranceService]
    });
  });

  it('should be created', inject([ApiInsuranceService], (service: ApiInsuranceService) => {
    expect(service).toBeTruthy();
  }));
});
