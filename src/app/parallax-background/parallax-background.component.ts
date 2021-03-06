import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-parallax-background',
  templateUrl: './parallax-background.component.html',
  styleUrls: ['./parallax-background.component.scss']
})
export class ParallaxBackgroundComponent implements OnInit {

  constructor(private element: ElementRef) { }


  @Input() imgUrl: string = "assets/img/oeufs_1.jpg";
  @Input() height: number = 200;
  @Input() parallaxRatio: number = 0.5;

  @Input() overlayColor : any = "orange";
  @Input() overlayOpacity : number = 0.5;

  wrapper: HTMLElement;
  parent : HTMLElement;
  movingBg: HTMLElement;
  overlay: HTMLElement;

  wHeight: any;

  elHeight: number;
  ngOnInit() {

    window.addEventListener("resize", this.onResize.bind(this));

  }


  ngAfterViewInit() {
    this.wHeight = window.innerHeight;
    this.parent = $(this.element.nativeElement).parent()[0];
    this.wrapper = $(this.element.nativeElement).children()[0];

    this.movingBg = $(this.wrapper).children()[0];
    this.overlay = $(this.wrapper).children()[1];
    // console.log(this.wrapper);
   

    // console.log(this.elHeight, this.elHeight * (1 / this.parallaxRatio));
    
    $(window).scroll(function (e) {
      this.onScroll(e)
    }.bind(this))

    $(window).trigger("scroll");

  }

  ngAfterViewChecked(){
    let computedHeight = this.elHeight * (1 / this.parallaxRatio);
    $(this.movingBg).css({ height : computedHeight + "px" });
    
    $(this.overlay).css(
      { 
        height : computedHeight + "px",
        backgroundColor : this.overlayColor,
        opacity : this.overlayOpacity 
      });
  }

  onScroll(event) {
    
    
    this.wHeight = window.innerHeight;
    let rect = this.element.nativeElement.getBoundingClientRect();
    let scrollTop = $(window).scrollTop();
    let elTop = $(this.wrapper).offset().top;
    this.elHeight = $(this.parent).height();

    let computedHeight = this.elHeight * (1 / this.parallaxRatio)
    //$(this.wrapper).css({ height: this.parseHeight(this.height) * this.parallaxRatio })


    if ((elTop - scrollTop) + this.elHeight < 0) {
      //console.log("way up top");
    } else if (elTop - scrollTop > this.wHeight) {
      //console.log("down the bottom");

    } else {
      //console.log("in the page");
      let heightOnPage = this.wHeight - (elTop - scrollTop);

      // console.log("height on page  -->"+ heightOnPage / (this.wHeight + this.elHeight))

      // let calculation = (     (     (heightOnPage / (this.wHeight + this.elHeight))    * this.wHeight   ) *  this.parallaxRatio   ) - (this.wHeight / 2.0);
      let calculation = (((heightOnPage / (this.wHeight + this.elHeight)) * this.wHeight) * this.parallaxRatio) - (this.wHeight / 2.0);

      // calculation -= this.elHeight * (1-this.parallaxRatio) * 2;
      $(this.movingBg).css({
        // top: calculation + "px",
        transform :  "translateY("+calculation+"px)"

      }


      )
    }
  }


  onResize(event) {
    

    $(window).trigger("scroll");
  }
  parseHeight(strValue: any) {

    // console.log(strValue);
    let pixelsValue: number;
    // console.log("parsing height : ....");
    if (typeof strValue == "string") {
      let hasVH = strValue.indexOf("vh");

      let hasPercent = strValue.indexOf("%");


      if (hasVH !== -1) {
        let value = strValue.replace("vh", "");
        let vhValue = parseInt(value)
        pixelsValue = this.wHeight * (vhValue / 100);

        // console.log("VH -->", pixelsValue);

      } else if (hasPercent != -1) {
        let value = strValue.replace("%", "");
        let percentValue = parseInt(value)
        pixelsValue = this.wHeight * (percentValue / 100);

        // console.log("percentage -->", pixelsValue);
      } else {

        pixelsValue = parseInt(strValue);
      }
    } else if (typeof strValue == "number") {

      pixelsValue = strValue;

    }

    return Math.ceil(pixelsValue);
  }


}
