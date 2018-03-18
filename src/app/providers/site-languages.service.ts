import { Injectable } from '@angular/core';

@Injectable()
export class SiteLanguagesService {

  languages = ["fr", "en", "es"];
  flags = ['fr.svg', 'gb.svg', 'es.svg']
  flagsObject = {
    fr: 'fr.svg',
    en: 'gb.svg',
    es: 'es.svg'
  }

  currentLanguage = this.languages[0];
  constructor() { }

}
