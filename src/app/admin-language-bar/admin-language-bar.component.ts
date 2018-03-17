import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as $ from 'jquery'

import { Broadcaster } from "../providers/broadcaster";
import { LanguagesService } from '../providers/languages.service';
@Component({
  selector: 'app-admin-language-bar',
  templateUrl: './admin-language-bar.component.html',
  styleUrls: ['./admin-language-bar.component.scss']
})
export class AdminLanguageBarComponent implements OnInit {

  @ViewChild("menuToggle") menuToggle: HTMLElement;
  imgPath = "assets/img/flags/";

  chosenFlagID = 0;
  flagSVGs: Array<string> = [
    "fr.svg",
    "gb.svg",
  ]
  @Input() name: string = "default name";


  constructor(
    private broadcaster : Broadcaster,
    private langService : LanguagesService
  ) { }

  ngOnInit() {
  }

  onChooseLanguage(event) {
    event.preventDefault();
    let el: HTMLElement = event.currentTarget;

    let chosenID = $(el).attr("data-flagid");
    // console.log(el.attributes);
    // console.log($(el).attr("data-flagid"));

    this.chosenFlagID = parseInt(chosenID);
    $(this.menuToggle).css({ backgroundImage: "assets/img/flags/" + this.flagSVGs[chosenID] })

    if(this.chosenFlagID === 0){

      this.broadcaster.broadcast("changeLanguage","fr");
      this.langService.currentLanguage = "fr";
    } else if (this.chosenFlagID === 1) {
      this.broadcaster.broadcast("changeLanguage", "en");
      this.langService.currentLanguage = "en";
    }

  }
}
