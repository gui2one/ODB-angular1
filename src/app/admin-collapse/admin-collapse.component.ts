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
  @ViewChild('collapseBody') collapseBody : ElementRef;
  hashName :string = "#"+this.name+"";
  
  @Input() collapsed : boolean = false;
  constructor() {

   }

  ngOnInit() {
    this.hashName = "#" + this.name + "";
    // console.log(this.collapsed === "true");
    // if (this.collapsed) {
    //   $(this.collapseContent.nativeElement).css({ height: 0 })


    // } else {
    //   let contentHeight = $(this.collapseBody.nativeElement).height() + 12
    //   $(this.collapseContent.nativeElement).css({ height: contentHeight })
    // }

  }
  calculateContentHeight(element, depth: number = 0, counter: number = 0) {

    let childs = element.children;

    for (let i = 0; i < childs.length; i++) {

      let curChild = childs[i];

      counter += $(curChild).height();
      depth += 1;
      // console.log(counter);
      this.calculateContentHeight(curChild, depth, counter)
    }

    return counter;
  }


  ngAfterContentChecked(){
    if (this.collapsed) {
      $(this.collapseContent.nativeElement).css({ height: 0 })
      // $(this.collapseContent.nativeElement).css({ height: 'auto' })


    } else {
      let contentHeight = this.calculateContentHeight(this.collapseBody.nativeElement) + 32
      $(this.collapseContent.nativeElement).css({ height: contentHeight })
      // $(this.collapseContent.nativeElement).css({ height: 'auto' })
    }
  }



  onClickToggle(event){
    this.collapsed = !this.collapsed;

    // console.log(contentHeight);
    if(this.collapsed){
      $(this.collapseContent.nativeElement).css({ height: 0 })
    }else{
      let contentHeight = this.calculateContentHeight(this.collapseBody.nativeElement) + 32
      $(this.collapseContent.nativeElement).css({ height: contentHeight })
      // $(this.collapseContent.nativeElement).css({ height: 'auto' })
    }
  }

}
