import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery'
import { ElementDef } from '@angular/core/src/view';
@Component({
  selector: 'app-admin-collapse',
  templateUrl: './admin-collapse.component.html',
  styleUrls: ['./admin-collapse.component.scss']
})
export class AdminCollapseComponent implements OnInit {

  @Input() name : string = "defaultName";
  @Input() label: string = "default label";

  @ViewChild('collapseHeader') collapseHeader : ElementRef;
  @ViewChild('collapseContent') collapseContent : ElementRef;
  hashName :string = "#"+this.name+"";
  
  @Input() collapsed : string;
  constructor() {

   }

  ngOnInit() {
    this.hashName = "#" + this.name + "";
    // console.log(this.collapsed === "true");


  }

  ngAfterViewInit(){
    if (this.collapsed === "true") {
 
      $(this.collapseHeader.nativeElement).addClass('collapsed')
      $(this.collapseContent.nativeElement).removeClass('show')

    }
  }

}
