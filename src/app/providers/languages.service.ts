import { Injectable } from '@angular/core';

@Injectable()
export class LanguagesService {

  languages = ["fr", "en", "es"];
  flags = [ 'fr.svg', 'gb.svg', 'es.svg']
  flagsObject = {
    fr : 'fr.svg', 
    en :'gb.svg', 
    es :'es.svg'
  }
  currentLanguage = "fr";
  constructor() { }


}
