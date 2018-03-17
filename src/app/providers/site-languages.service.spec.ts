import { TestBed, inject } from '@angular/core/testing';

import { SiteLanguagesService } from './site-languages.service';

describe('SiteLanguagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteLanguagesService]
    });
  });

  it('should be created', inject([SiteLanguagesService], (service: SiteLanguagesService) => {
    expect(service).toBeTruthy();
  }));
});
