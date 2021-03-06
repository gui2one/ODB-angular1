import { Component, OnInit,ViewChild, ElementRef, Input } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-parallax-spacer',
  templateUrl: './parallax-spacer.component.html',
  styleUrls: ['./parallax-spacer.component.scss']
})
export class ParallaxSpacerComponent implements OnInit {

  constructor(private element : ElementRef) { }


  @Input() imgUrl : string = "assets/img/oeufs_2.jpg";
  @Input() height : number = 200;
  @Input() parallaxRatio : number = 0.5;

  wrapper : HTMLElement;
  movingBg : HTMLElement;

  wHeight : any;

  elHeight : number;
  ngOnInit() {

    window.addEventListener("resize", this.onResize.bind(this));
    
  }


  ngAfterViewInit(){
    this.wHeight = window.innerHeight;
    this.elHeight = $(this.wrapper).height();
    this.wrapper = $(this.element.nativeElement).children()[0];
    this.movingBg = $(this.wrapper).children()[0];
    // console.log(this.movingBg);
    $(this.wrapper).css({ height : this.parseHeight(this.height)})
    $(window).scroll(function (e) {
      this.onScroll()
    }.bind(this))

    $(window).trigger("scroll");
    
  }

  onScroll(event){

    // this.parseHeight(this.height);
    this.wHeight = window.innerHeight;
    let rect = this.element.nativeElement.getBoundingClientRect();
    let scrollTop = $(window).scrollTop();
    let elTop = $(this.wrapper).offset().top;
    this.elHeight = $(this.wrapper).height();

    // console.log(elTop - scrollTop)
    // console.log("scrollTop -->" + scrollTop)
    // console.log("this.elHeight -->" + this.elHeight)

    if ((elTop - scrollTop) + this.elHeight < 0){
      //  console.log("way up top");
    } else if (elTop - scrollTop > this.wHeight){
      //  console.log("down the bottom");

    }else{
      //  console.log("in the page");
      let heightOnPage = this.wHeight - (elTop - scrollTop);

      // console.log("height on page  -->"+ heightOnPage / (this.wHeight + this.elHeight))
      $(this.movingBg).css(
        'top', ((((heightOnPage / (this.wHeight + this.elHeight)) * this.wHeight) * this.parallaxRatio) - (this.wHeight / 2.0))+"px"

      )
    }
  }


  onResize(event){   

    $(window).trigger("scroll");
  }
   parseHeight(strValue : any){

    
    let pixelsValue : number;
    
    if(typeof strValue == "string"){
      let hasVH = strValue.indexOf("vh");
      
      let hasPercent = strValue.indexOf("%");
      

      if(hasVH !== -1){
        let value = strValue.replace("vh","");
        let vhValue = parseInt(value)
        pixelsValue = this.wHeight * (vhValue / 100);

        
       
      }else if(hasPercent != -1){
        let value = strValue.replace("%","");
        let percentValue = parseInt(value)
        pixelsValue = this.wHeight * (percentValue / 100);

        
      }else{

        pixelsValue = parseInt(strValue);
      }
    } else if (typeof strValue == "number") {
      
      pixelsValue = strValue;
      
    }
    
    return Math.ceil(pixelsValue);
  }

  
}
