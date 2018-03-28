import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-admin-collapse-group',
  templateUrl: './admin-collapse-group.component.html',

  ////get scss file from admin-collapse.component
  styleUrls: ['../admin-collapse/admin-collapse.component.scss']
})
export class AdminCollapseGroupComponent implements OnInit {

  @Output() collapseEvent : EventEmitter<any> = new EventEmitter();
  @Input() name : string = "defaultName";
  @Input() label : string = "default label";
  hashName :string = "#"+this.name+"";

  @Input() collapsed : boolean = false;

  @ViewChild('collapseHeader') collapseHeader: ElementRef;
  // @ViewChild('headerButton') headerButton: ElementRef;
  @ViewChild('collapseContent') collapseContent: ElementRef;
  
  constructor() {

   }

  ngOnInit() {
    this.hashName = "#" + this.name + "";
    if (this.collapsed) {
      $(this.collapseHeader.nativeElement).addClass('collapsed')
    } else {
      $(this.collapseHeader.nativeElement).removeClass('collapsed')
    }
  }



  onClickToggle(event) {    
    this.collapsed = !this.collapsed;
    if (this.collapsed) {
      $(this.collapseContent.nativeElement).css({ height: 0 })
      $(this.collapseHeader.nativeElement).addClass('collapsed')
    } else {

      $(this.collapseContent.nativeElement).css({ height: 'auto' })
      $(this.collapseHeader.nativeElement).removeClass('collapsed')
    }
  }

}
