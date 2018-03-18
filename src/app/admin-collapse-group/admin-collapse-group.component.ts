import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-admin-collapse-group',
  templateUrl: './admin-collapse-group.component.html',

  ////get scss file from admin-collapse.component
  styleUrls: ['../admin-collapse/admin-collapse.component.scss']
})
export class AdminCollapseGroupComponent implements OnInit {

  @Input() name : string = "defaultName";
  @Input() label : string = "default label";
  hashName :string = "#"+this.name+"";

  @Input() collapsed : string;

  @ViewChild('collapseHeader') collapseHeader: ElementRef;
  @ViewChild('collapseContent') collapseContent: ElementRef;
  
  constructor() {

   }

  ngOnInit() {
    this.hashName = "#" + this.name + "";
    // console.log(this.hashName);
  }
  ngAfterViewInit() {
    if (this.collapsed === "true") {

      $(this.collapseHeader.nativeElement).addClass('collapsed')
      $(this.collapseContent.nativeElement).removeClass('show')

    }
  }

}
