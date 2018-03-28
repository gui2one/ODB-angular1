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
  @ViewChild('headerButton') headerButton : ElementRef;

  @ViewChild('collapseContent') collapseContent : ElementRef;
  @ViewChild('collapseBody') collapseBody : ElementRef;
  hashName :string = "#"+this.name+"";
  
  @Input() collapsed : boolean = false;

  constructor() {

   }

  
  ngOnInit() {
    this.hashName = "#" + this.name + "";
    if (this.collapsed) {
      $(this.headerButton.nativeElement).addClass('collapsed')

    } else {
      $(this.headerButton.nativeElement).removeClass('collapsed')
      // $(this.collapseContent.nativeElement).css({ height: 'auto' })
    }
  }
  
  calculateContentHeight(element, depth: number = 0, heightCounter: number = 0) {
    
    let childs = element.children;
    // console.log(childs.length);
    for (let i = 0; i < childs.length; i++) {

      let curChild = childs[i];

      heightCounter += $(curChild).height();
      depth += 1;
      

      //// no recursion neeeded you dummy
      //this.calculateContentHeight(curChild, depth, heightCounter)
    }

    return heightCounter;
  }

  ngAfterViewChecked(){
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
      $(this.collapseContent.nativeElement).css({ height: 0 });
      $(this.headerButton.nativeElement).addClass('collapsed')

    }else{
      let contentHeight = this.calculateContentHeight(this.collapseBody.nativeElement) + 32
      $(this.collapseContent.nativeElement).css({ height: contentHeight })
      $(this.headerButton.nativeElement).removeClass('collapsed')
      // $(this.collapseContent.nativeElement).css({ height: 'auto' })
    }
  }

}
