import { Injectable, OnInit } from '@angular/core';
import * as $ from "jquery";

@Injectable()
export class SiteUtilsService {

  private window : $;
  private div : HTMLElement;
  constructor() { 
    
  }

  displayScreenInfos(){
    window.addEventListener("resize", this.onResize.bind(this))
    console.log("displayScreenInfos Function triggered");
    
    this.window = $(window);
    let divElement = document.createElement("div");
    this.div = $(document)[0].body.appendChild(divElement);
    this.div.innerHTML = "hello";
    $(this.div).css({
      position: "fixed",
      width:200,
      height: 200,
      top:"100%",
      left:0,
      backgroundColor : "green",
      zIndex : 100,
      transform : 'translateY(-100%)'
    })
    // console.log(this.window.outerHeight());
    // console.log(div);

  }

  onResize(e){
    this.updateDivData();
    console.log("resize from infos div")
  }

  updateDivData(){
    this.div.innerHTML = this.window.innerWidth() + " / " + this.window.innerHeight();
  }

  
}
