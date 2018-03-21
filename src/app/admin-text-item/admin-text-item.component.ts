import { Component, OnInit, Input, Output, ViewChild, QueryList } from '@angular/core';
import { AdminMultilangInputComponent } from '../admin-multilang-input/admin-multilang-input.component';

import * as $ from 'jquery'

@Component({
  selector: 'app-admin-text-item',
  templateUrl: './admin-text-item.component.html',
  styleUrls: ['./admin-text-item.component.scss']
})
export class AdminTextItemComponent implements OnInit {

  @ViewChild("inputNode") inputNode : AdminMultilangInputComponent;
  @ViewChild("textTypeCheckbox") textTypeCheckbox : HTMLInputElement;
  @Input() name = "default shitty name"
  @Input() @Output() currentLanguage;

  @Input() tagName ="TAG NAME";
  @Input() @Output() textType = "";

  @Output() @Input() textValues : object;

  @Input() dbKey : string;
  
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){

    this.inputNode.values = this.textValues;
    if (this.textType === "textarea") {

    }    
  }

  onCKEditorClose(){


    this.inputNode.values[this.inputNode.currentLanguage] = this.inputNode.editorValue;
  }

  onTagNameFocusOut(event){

    this.tagName = event.currentTarget.value;
  }

  onTagNameKeyPress(event)  {

    if(event.code === "Enter"){
      
      $(event.target).blur();
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
    
  }
}
