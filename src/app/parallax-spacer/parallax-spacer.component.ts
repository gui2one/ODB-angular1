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
  ngOnInit() {

    // window.addEventListener("scroll", this.onScroll.bind(this));

  }

  ngAfterViewInit(){
    this.wrapper = $(this.element.nativeElement).children()[0];
    this.movingBg = $(this.wrapper).children()[0];
    console.log(this.movingBg);
    $(this.wrapper).css({ height : this.height})
    $(window).scroll(function (e) {
      this.onScroll()
    }.bind(this))
  }

  onScroll(event){
    let wHeight = window.innerHeight;
    let rect = this.element.nativeElement.getBoundingClientRect();
    let scrollTop = $(window).scrollTop();
    let elTop = $(this.wrapper).offset().top;
    let elHeight = $(this.wrapper).height();

    // console.log(elTop - scrollTop)
    // console.log("scrollTop -->" + scrollTop)
    // console.log("elHeight -->" + elHeight)

    if (elTop - scrollTop + elHeight < 0){
      // console.log("up in the header");
    } else if (elTop - scrollTop > wHeight){
      //  console.log("down bottom");

    }else{
      // console.log("in the page");
      let heightOnPage = wHeight - (elTop - scrollTop);

      // console.log("height on page  -->"+ heightOnPage / (wHeight + elHeight))
      $(this.movingBg).css(
        'top', -(((heightOnPage / (wHeight + elHeight)) * wHeight) * this.parallaxRatio)+"px"

      )
    }
  }
}
