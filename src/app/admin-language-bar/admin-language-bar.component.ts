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
  // flagSVGs: Array<string> = [
  //   "fr.svg",
  //   "gb.svg",
  //   "es.svg"
  // ]
  @Input() name: string = "default name";


  constructor(
    private broadcaster : Broadcaster,
    public langService : LanguagesService
  ) { }

  ngOnInit() {

    // this.broadcaster.broadcast("changeLanguage", this.langService.languages[0]);
    this.langService.currentLanguage = this.langService.languages[0];    

    // console.log("____admin-language init_____");
    
  }

  onChooseLanguage(event) {
    event.preventDefault();
    let el: HTMLElement = event.currentTarget;

    let chosenID = $(el).attr("data-flagid");
    // console.log(el.attributes);
    // console.log($(el).attr("data-flagid"));

    this.chosenFlagID = parseInt(chosenID);
    $(this.menuToggle).css({ backgroundImage: "assets/img/flags/" + this.langService.flags[chosenID] })



    this.broadcaster.broadcast("changeLanguage", this.langService.languages[chosenID]);
    this.langService.currentLanguage = this.langService.languages[chosenID];


  }
}
