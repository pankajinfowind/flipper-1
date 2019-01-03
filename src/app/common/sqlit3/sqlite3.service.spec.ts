import { TestBed } from '@angular/core/testing';

import { Sqlite3Service } from './sqlite3.service';

describe('Sqlite3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Sqlite3Service = TestBed.get(Sqlite3Service);
    expect(service).toBeTruthy();
  });
});
