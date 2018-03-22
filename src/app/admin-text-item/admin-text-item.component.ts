import { Component, OnInit, Input, Output, ViewChild, QueryList, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { AdminMultilangInputComponent } from '../admin-multilang-input/admin-multilang-input.component';
import { LanguagesService } from "../providers/languages.service";
import * as $ from 'jquery'

@Component({
  selector: 'app-admin-text-item',
  templateUrl: './admin-text-item.component.html',
  styleUrls: ['./admin-text-item.component.scss']
})
export class AdminTextItemComponent implements OnChanges {

  @ViewChild("inputNode") inputNode : AdminMultilangInputComponent;
  @ViewChild("textTypeCheckbox") textTypeCheckbox : HTMLInputElement;
  @ViewChild("collapseButton") collapseButton : HTMLElement;
  @Input() name = "default_shitty_name"
  hasName : string;
  @Input() tagName ="TAG NAME";
  @Input() currentLanguage : string;
  @Input() @Output() textType = "";
  @Output() @Input() textValues : object;
  @Input() dbKey : string;
  @Output() EmitValues : EventEmitter<object> = new EventEmitter();

  @Input() bCollapsed : boolean = false;
  constructor( public langService : LanguagesService) { }


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let curProp = changes[propName]
      // console.log("Admin TextItem OnChange fired ---->",propName, curProp.currentValue);
      // changes[propName] = changes.value

    }
  }

  ngAfterViewInit(){
    this.currentLanguage = this.langService.currentLanguage;
    this.inputNode.values = this.textValues;
    this.hasName = "#" + this.name;
 
  }

  onCKEditorClose(){

    this.inputNode.values[this.inputNode.currentLanguage] = this.inputNode.editorValue;
    this.emitValues();
  }

  onTagNameFocusOut(event){

    this.tagName = event.currentTarget.value;
    this.emitValues();
  }

  onTagNameKeyPress(event)  {

    if(event.code === "Enter"){
      this.tagName = event.target.value;
      $(event.target).blur();
      this.emitValues();
    }
  }

  onCheck(event){
    event.preventDefault();

    if (event.target.checked){
      this.inputNode.inputType = "textarea";
      this.textType = "textarea"
    }else{
      this.inputNode.inputType = "text";
      this.textType = "text"
    }

    this.emitValues();
    
  }

  emitValues(){
    this.EmitValues.emit({
      tagName : this.tagName,
      type : this.textType,
      text : this.textValues,
      key : this.dbKey
    })
  }

  onMultilangInputEmitValues(data){
    // console.log(data);
    this.textType = data.type
    this.textValues = data.text

    this.emitValues();

  }

  onCollapseClick(event){
    // console.log("before : ", this.bCollapsed)
    this.bCollapsed = !this.bCollapsed;
    // console.log("after : ", this.bCollapsed)
  }

  onInputChangeLanguage(lang){
    this.currentLanguage = lang;
    // console.log(this.currentLanguage)
  }

}
