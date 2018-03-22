import { Component, OnInit, Input, Output, ViewChild, QueryList, EventEmitter } from '@angular/core';
import { AdminMultilangInputComponent } from '../admin-multilang-input/admin-multilang-input.component';

import * as $ from 'jquery'

@Component({
  selector: 'app-admin-text-item',
  templateUrl: './admin-text-item.component.html',
  styleUrls: ['./admin-text-item.component.scss']
})
export class AdminTextItemComponent {

  @ViewChild("inputNode") inputNode : AdminMultilangInputComponent;
  @ViewChild("textTypeCheckbox") textTypeCheckbox : HTMLInputElement;
  @ViewChild("collapseButton") collapseButton : HTMLElement;
  @Input() name = "default_shitty_name"
  hasName : string;
  @Input() tagName ="TAG NAME";
  @Input() @Output() currentLanguage;
  @Input() @Output() textType = "";
  @Output() @Input() textValues : object;
  @Input() dbKey : string;
  @Output() EmitValues : EventEmitter<object> = new EventEmitter();

  bCollapsed : boolean = false;
  constructor() { }


  ngAfterViewInit(){
    this.currentLanguage = this.inputNode.currentLanguage;
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
    this.bCollapsed = !this.bCollapsed;
    console.log(event)
  }

  onInputChangeLanguage(lang){
    this.currentLanguage = lang;
  }

}
