import { Component, OnInit, Input, Output, ViewChild,ViewChildren, EventEmitter, ElementRef, QueryList } from '@angular/core';
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

  @Output() multilangInputEvent = new EventEmitter<(string)>();
  @ViewChild("menuToggle") menuToggle : ElementRef;
  @ViewChildren("inputNode") inputNodes : QueryList<ElementRef>;
  imgPath = "assets/img/flags/";

  // @Input() @Output() value : string= "default ...";
  @Input() @Output() values : object = {};
  @Input() @Output() currentLanguage: string;
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
      // console.log(message);
      // this.currentLanguage = message.toString();
      this.currentLanguage = message.toString();
    }); 




    ////////////   !!!!!!!!    look here is the problem !!!!!
    // console.log("______________constructor fired______________");
    
    this.currentLanguage = this.langService.currentLanguage;
    // console.log(this.currentLanguage);

    ///////
    ///////
    
  }

  ngOnInit() {

    
    // console.log("------------------- MultlilangInput INIT -------------------")
    
  }

  ngAfterViewInit(){

    this.editorValue = this.values[this.currentLanguage]
    // let myInputTest = this.inputNodes.filter((input)=>{
    //   return $(input.nativeElement).attr('hidden') === undefined;
    //   // console.log(id);
    // })[0]
    // // console.log($(myInputTest.nativeElement).position());
    // var domRect = myInputTest.nativeElement.getBoundingClientRect();
    // console.log(domRect);
    
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
  }

  onBlur(event){
    event.preventDefault();
    event.stopPropagation();
    // console.log(event.currentTarget)
    // console.log(event.currentTarget.getAttribute("data-language"))
    let curLang = event.currentTarget.getAttribute("data-language")
    // console.log(curLang);
    if(this.inputType === "text"){
      this.values[curLang] = event.currentTarget.value;
    }else if(this.inputType === "textarea"){

      // console.log("setting input component values")
      this.values[curLang] = event.currentTarget.value;
      
      // console.log(event.currentTarget.value);
    }

    // this.value = event.currentTarget.value;
    
    // this.element.nativeElement.dispatchEvent(new Event('focusout'));
    
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
  }  
}
