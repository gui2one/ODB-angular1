import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss']
})
export class SpacerComponent implements OnInit, AfterViewInit {


  @Input() height : any;

  private wrapper : any;

  private wHeight;
  constructor(private el:ElementRef) { }

  ngOnInit() {
    
    
    
  }
  
  ngAfterViewInit(){
    // window.addEventListener("resize", this.onResize.bind(this));
    this.wrapper = $(this.el.nativeElement).children()[0];
    $(window).on("resize", this.onResize.bind(this))
    console.log(this.parseHeight(this.height));
    window.dispatchEvent(new Event('resize'));
    // this.onResize();

    
  }

  

  ngAfterViewChecked(){

  }

  onResize(){
    // console.log("hey")
    this.wHeight = window.innerHeight;
    console.log(this.parseHeight(this.height))
    $(this.wrapper).css({
      height: this.parseHeight(this.height)
    })

  }

  parseHeight(strValue: any) {


    let pixelsValue: number;

    if (typeof strValue == "string") {
      let hasVH = strValue.indexOf("vh");

      let hasPercent = strValue.indexOf("%");


      if (hasVH !== -1) {
        let value = strValue.replace("vh", "");
        let vhValue = parseInt(value)
        pixelsValue = this.wHeight * (vhValue / 100);



      } else if (hasPercent !== -1) {
        let value = strValue.replace("%", "");
        let percentValue = parseInt(value)
        pixelsValue = this.wHeight * (percentValue / 100);
        // console.log("percent")

      } else {

        pixelsValue = parseInt(strValue);
      }
    } else if (typeof strValue == "number") {

      pixelsValue = strValue;

    }

    return Math.ceil(pixelsValue);
  }  

}
