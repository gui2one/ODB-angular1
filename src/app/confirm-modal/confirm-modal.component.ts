import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';

import * as $  from "jquery";
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Output() onDecide = new EventEmitter<(boolean)>();
  @Input() display : any;

  wrapper : HTMLElement;
  constructor(public element : ElementRef) { }

  ngOnInit() {

    console.log("confirm modal Triggered");

    console.log(this.display);
    this.wrapper = $(this.element.nativeElement)[0].children[0];
    console.log(this.wrapper);


  
  }

  ngAfterViewInit(){
    if (this.display === "false") {

      $(this.wrapper).css({ visibility: "hidden" });
      console.log("hidden")
    }
  }

  broadcastMessage(bool : boolean){
    this.onDecide.emit(bool);
    
  }

}
