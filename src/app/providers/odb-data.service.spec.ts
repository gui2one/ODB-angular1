import { TestBed, inject } from '@angular/core/testing';

import { OdbDataService } from './odb-data.service';

describe('OdbDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OdbDataService]
    });
  });

  it('should be created', inject([OdbDataService], (service: OdbDataService) => {
    expect(service).toBeTruthy();
  }));
});
