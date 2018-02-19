import { Component, OnInit, Directive, Output, Input } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  @Input() 
  toggleName : string = "default";

  @Output()
  state: boolean;

  constructor() { }

  ngOnInit() {
   // console.log($('#checkbox').checked);
    this.state = $('#' + this.toggleName).is(":checked");
  }

  onClick(event){

    this.state = $('#' + this.toggleName).is(":checked");
    // console.log(this.state);
  }

}
