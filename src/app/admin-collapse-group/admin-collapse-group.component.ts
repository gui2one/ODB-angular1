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
  @ViewChild('collapseContent') collapseContent: ElementRef;
  
  constructor() {

   }

  ngOnInit() {
    this.hashName = "#" + this.name + "";
    // console.log(this.hashName);
  }

  // calculateContentHeight(element, depth : number = 0, counter : number = 0){

  //   let childs= element.children;    

  //   for (let i=0; i< childs.length; i++){
      
  //     let curChild = childs[i];
      
  //     counter += $(curChild).height();
  //     depth += 1;
  //     // console.log(counter);
  //     this.calculateContentHeight(curChild, depth, counter)
  //   }
    
  //   return counter;
  // }
  // ngAfterContentCheched() {
  //   if (this.collapsed) {
  //     $(this.collapseContent.nativeElement).css({ height: 0 })
  //     // $(this.collapseContent.nativeElement).css({ height: 'auto' })


  //   } else {
  //     let contentHeight = this.calculateContentHeight(this.collapseContent.nativeElement)
  //     $(this.collapseContent.nativeElement).css({ height: contentHeight })
  //     // $(this.collapseContent.nativeElement).css({ height: 'auto' })
  //   }

    
  // }

  onClickToggle(event) {
    // let contentHeight = this.calculateContentHeight(this.collapseContent.nativeElement)
    // console.log(contentHeight);
    
    this.collapsed = !this.collapsed;
    // let contentHeight = $(this.collapseContent.nativeElement).height() 
    // console.log(contentHeight);
    if (this.collapsed) {
      $(this.collapseContent.nativeElement).css({ height: 0 })
    } else {
      
      // let contentHeight = $(this.collapseContent.nativeElement).height() 
      // $(this.collapseContent.nativeElement).css({ height: contentHeight })
      $(this.collapseContent.nativeElement).css({ height: 'auto' })
    }
  }

}
