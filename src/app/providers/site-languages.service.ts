import { Injectable } from '@angular/core';

@Injectable()
export class SiteLanguagesService {

  languages = ['fr', 'en'];
  currentLanguage = this.languages[0];
  constructor() { }

}
