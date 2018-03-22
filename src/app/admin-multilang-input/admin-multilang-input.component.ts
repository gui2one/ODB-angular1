import { Component, OnInit, Input, Output, ViewChild,ViewChildren, EventEmitter, ElementRef, QueryList, OnChanges, SimpleChange } from '@angular/core';
import { style } from '@angular/animations';
import * as $ from "jquery";
import { Broadcaster } from '../providers/broadcaster';
import { LanguagesService } from '../providers/languages.service';
import { CKEditorComponent } from 'ngx-ckeditor';
@Component({
  selector: 'app-admin-multilang-input',
  templateUrl: './admin-multilang-input.component.html',
  styleUrls: ['./admin-multilang-input.component.scss']
})
export class AdminMultilangInputComponent implements OnInit {

  @Output() CKEditorClose : EventEmitter<(string)> = new EventEmitter<string>();
  @Output() EmitValues : EventEmitter<(object)> = new EventEmitter();

  @Output() multilangInputEvent = new EventEmitter<(string)>();
  @Output() changeLanguageEvent :EventEmitter<string> = new EventEmitter();

  @ViewChild("menuToggle") menuToggle : ElementRef;
  @ViewChildren("inputNode") inputNodes : QueryList<ElementRef>;
  imgPath = "assets/img/flags/";

  // @Input() @Output() value : string= "default ...";
  @Input() @Output() values : object = {};
  @Input() currentLanguage: string;
  @Input() name : string = "default name";
  @Input() inputType : string = "text";

  chosenFlagID = 0;
  globalLanguage = "fr";

  
  flagSVGs : object = {
    fr : "fr.svg",
    en : "gb.svg"
  }

  flagsArray : Array<any> = []
  
  @ViewChild("CKEditor") CKEditor : CKEditorComponent;
  @ViewChild("HTMLRender") HTMLRender : HTMLElement;
  public bEditorOpened = false;
  public editorValue = " <b>hello</b> CK !!"
  private editorConfig = {
    toolbar: [
      {
        name: 'basicstyles',
        items: ['Bold', 'Italic', 'Source']
      }
    ],
    resize_enabled: true
  }



  constructor(
    private broadcaster : Broadcaster,
    public element : ElementRef,
    public langService : LanguagesService
  ) { 

      
      for(let item in this.flagSVGs){
        this.flagsArray.push(this.flagSVGs[item]);
      }

      // init values array
      for(let lang in langService.languages){
        let curLang = langService.languages[lang];
        this.values[curLang] = "";
      }



    
    this.broadcaster.on("changeLanguage")
    .subscribe(message => {
      console.log(message);
      // this.currentLanguage = message.toString();
      this.currentLanguage = message.toString();
      this.changeLanguageEvent.emit(this.currentLanguage);
    }); 




    ////////////   !!!!!!!!    look here is the problem !!!!!
    // console.log("______________constructor fired______________");
    
    this.currentLanguage = this.langService.currentLanguage;
    // console.log(this.currentLanguage);

    ///////
    ///////
    
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let curProp = changes[propName]
      // console.log(propName, curProp.currentValue);
      // changes[propName] = changes.value

    }
  }
  ngOnInit() {

    
    // console.log("------------------- MultlilangInput INIT -------------------")
    
  }

  ngAfterViewInit(){

    this.editorValue = this.values[this.currentLanguage]

    
  }

  public getValues() : object{

    return this.values;
  }

  onChooseLanguage(event){
    event.preventDefault();
    let el : HTMLElement = event.currentTarget;

    let chosenID = $(el).attr("data-flagid");
    console.log(el.attributes);
    // console.log($(el).attr("data-flagid"));

    this.chosenFlagID = parseInt(chosenID);
    $(this.menuToggle).css({ backgroundImage: "assets/img/flags/" + this.flagSVGs[this.globalLanguage]})

    this.currentLanguage = this.langService.languages[chosenID]
    this.editorValue = this.values[this.currentLanguage];

    this.changeLanguageEvent.emit(this.currentLanguage);
  }

  onBlur(event){
    event.preventDefault();
    event.stopPropagation();
    // console.log("BLUR !!!!")
    // console.log(event.currentTarget)
    // console.log(event.currentTarget.getAttribute("data-language"))
    let curLang = event.currentTarget.getAttribute("data-language")
    // console.log(curLang);
    if(this.inputType === "text"){
      this.values[curLang] = event.currentTarget.value;
    }else if(this.inputType === "textarea"){

      this.values[curLang] = event.currentTarget.value;

    }

    this.emitValues();

    
  }

  openTextEditor(event, editorValue : string){
    this.editorValue = editorValue;
    this.bEditorOpened = true;
  }

  closeTextEditor(event, content) {
    console.log(event);
    
    this.bEditorOpened = false;
    this.editorValue = content;
    this.CKEditorClose.emit(content);
    this.values[this.currentLanguage]=content;
    this.emitValues();
  }
  
  
  onKeyPress(event){
    // console.log(event);

    if(event.code === "Enter"){
      $(event.target).blur();
    }

  }

  emitValues(){
    this.EmitValues.emit( {
      type : this.inputType,
      text : this.values
    })
  }
}
