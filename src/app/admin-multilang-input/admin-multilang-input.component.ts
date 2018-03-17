import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { style } from '@angular/animations';
import * as $ from "jquery";
import { Broadcaster } from '../providers/broadcaster';
import { LanguagesService } from '../providers/languages.service';
@Component({
  selector: 'app-admin-multilang-input',
  templateUrl: './admin-multilang-input.component.html',
  styleUrls: ['./admin-multilang-input.component.scss']
})
export class AdminMultilangInputComponent implements OnInit {

  @Output() multilangInputEvent = new EventEmitter<(string)>();
  @ViewChild("menuToggle") menuToggle : HTMLElement;
  imgPath = "assets/img/flags/";

  // @Input() @Output() value : string= "default ...";
  @Input() @Output() values : object = {};
  @Input() @Output() currentLanguage: string = "fr";

  chosenFlagID = 0;
  globalLanguage = "fr";
;
  
  flagSVGs : object = {
    fr : "fr.svg",
    en : "gb.svg"
  }

  flagsArray : Array<any> = []
  

  @Input() name : string = "default name";
  constructor(
    private broadcaster : Broadcaster,
    private element : ElementRef,
    private langService : LanguagesService
  ) { 

      
      for(let item in this.flagSVGs){
        this.flagsArray.push(this.flagSVGs[item]);
      }

      // init values array
      for(let lang in langService.languages){
        let curLang = langService.languages[lang];
        this.values[curLang] = "";
      }


    console.log(this.values)
    
    this.broadcaster.on("changeLanguage")
    .subscribe(message => {
      console.log(message);
      this.currentLanguage = message.toString();
    }); 


    
  }

  ngOnInit() {
  }

  onChooseLanguage(event){
    event.preventDefault();
    let el : HTMLElement = event.currentTarget;

    let chosenID = $(el).attr("data-flagid");
    console.log(el.attributes);
    console.log($(el).attr("data-flagid"));

    this.chosenFlagID = parseInt(chosenID);
    $(this.menuToggle).css({ backgroundImage: "assets/img/flags/" + this.flagSVGs[this.globalLanguage]})

    this.currentLanguage = this.langService.languages[chosenID]
    
  }

  onBlur(event){
    event.preventDefault();
    
    console.log(event.currentTarget)
    console.log(event.currentTarget.getAttribute("data-language"))
    let curLang = event.currentTarget.getAttribute("data-language")
    this.values[curLang] = event.currentTarget.value;

    // this.value = event.currentTarget.value;
    
    // this.element.nativeElement.dispatchEvent(new Event('focusout'));
    
  }

}
