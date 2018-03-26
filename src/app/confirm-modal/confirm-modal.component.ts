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


  @Input() message : string = "default message (change it) : ";

  private defaultConfirmText = "Yes";
  private defaultDeclineText = "No";
  @Input() confirmBtnText: string = this.defaultConfirmText;
  @Input() declineBtnText: string = this.defaultDeclineText;
  wrapper : HTMLElement;
  modalBox : HTMLElement;

  public callbackFunction : Function;
  callbackFunctionArgs : Array<any>[];
  constructor(private element : ElementRef) { }

  ngOnInit() {

    // console.log("confirm modal Triggered");

    // console.log(this.display);
    this.wrapper = $(this.element.nativeElement)[0].children[0];
    this.modalBox = $(this.element.nativeElement)[0].children[0].children[1];

    // console.log(this.modalBox);
  
  }

  ngAfterViewInit(){
    if (this.display === "false") {

      $(this.wrapper).css({ 
        visibility: "hidden",
        opacity : 0.0
       });
      // console.log("hidden")
    }else{
      $(this.wrapper).css({ 
        visibility: "visible",
        opacity : 1.0
      });
    }
  }

  broadcastMessage(bool : boolean){
    this.onDecide.emit(bool);
    if(bool){
      this.callbackFunction(...this.callbackFunctionArgs);
    }

    console.log(bool)
    this.hide();
  }

  public show( message : string = this.message, 
        confirmText : string = this.confirmBtnText, 
        declineText : string = this.declineBtnText, 
        callback : Function = undefined, 
        ...args
    ){
      
      this.message = message;
      this.callbackFunction = callback;
      this.callbackFunctionArgs = args;
      
      if(confirmText !== undefined && confirmText != ''){
        this.confirmBtnText = confirmText;
      }else{
        this.confirmBtnText = this.defaultConfirmText;
      }
      
      if (declineText !== undefined && declineText != '') {
        this.declineBtnText = declineText;
      }else{
        this.declineBtnText = this.defaultDeclineText;
      }
      
    console.log(this.modalBox)
        $(this.wrapper).css({ 
          visibility: "visible",
          opacity: 1.0
        });

        $(this.modalBox).css({
          
          transform: 'translateY(0px)'
        });   
    
    
  }
  hide() {
    $(this.wrapper).css({ 
      visibility: "hidden",
      opacity: 0.0
    });

    $(this.modalBox).css({

      transform: 'translateY(50px)'
    });    
  }

}
