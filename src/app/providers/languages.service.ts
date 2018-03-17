import { Injectable } from '@angular/core';

@Injectable()
export class LanguagesService {

  languages = ["fr", "en"];

  currentLanguage = "fr";
  constructor() { }


}
