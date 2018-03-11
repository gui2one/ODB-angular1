import { TestBed, inject } from '@angular/core/testing';

import { SiteUtilsService } from './site-utils.service';

describe('SiteUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteUtilsService]
    });
  });

  it('should be created', inject([SiteUtilsService], (service: SiteUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
