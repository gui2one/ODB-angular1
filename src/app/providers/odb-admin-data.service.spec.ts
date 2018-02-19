import { TestBed, inject } from '@angular/core/testing';

import { OdbAdminDataService } from './odb-admin-data.service';

describe('OdbAdminDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OdbAdminDataService]
    });
  });

  it('should be created', inject([OdbAdminDataService], (service: OdbAdminDataService) => {
    expect(service).toBeTruthy();
  }));
});
