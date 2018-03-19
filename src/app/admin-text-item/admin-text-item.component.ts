import { Component, OnInit, Input, Output, ViewChild, QueryList } from '@angular/core';
import { AdminMultilangInputComponent } from '../admin-multilang-input/admin-multilang-input.component';

import * as $ from 'jquery'
// import { AdminMultilangInputComponent } from "../admin-multilang-input/admin-multilang-input.component";
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

    // this.currentLanguage = "es";
    console.log(this.textType);


    // this.textTypeCheckbox.dispatchEvent(new Event('click'))
    
  }

  ngAfterViewInit(){
    console.log(this.textValues)
    this.inputNode.values = this.textValues;
    if (this.textType === "textarea") {
      // this.textTypeCheckbox.checked = true;
      console.log(this.inputNode.currentLanguage);

      // $(this.textTypeCheckbox).attr("checked", true);
    }    
  }

  onCKEditorClose(){
    console.log(this.inputNode.values[this.inputNode.currentLanguage]);
    console.log(this.inputNode.editorValue);

    this.inputNode.values[this.inputNode.currentLanguage] = this.inputNode.editorValue;
  }

  onTagNameFocusOut(event){
    console.log(event);
    console.log(event.currentTarget.value);
    this.tagName = event.currentTarget.value;
  }

  onCheck(event){
    event.preventDefault();
    console.log(event.target.checked);
    console.log(event.target);

    if (event.target.checked){
      this.inputNode.inputType = "textarea";
      this.textType = "textarea"
    }else{
      this.inputNode.inputType = "text";
      this.textType = "text"
    }
    
  }
}
