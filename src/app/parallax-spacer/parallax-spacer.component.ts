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
  ngOnInit() {

    // window.addEventListener("scroll", this.onScroll.bind(this));

  }

  ngAfterViewInit(){
    $("#wrapper").css({ height : this.height})
    $(window).scroll(function (e) {
      this.onScroll()
    }.bind(this))
  }

  onScroll(event){
    let wHeight = window.innerHeight;
    let rect = this.element.nativeElement.getBoundingClientRect();
    let scrollTop = ($(window).scrollTop());
    let elTop = $("#wrapper").offset().top
    let elHeight = $("#wrapper").height()

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
      $("#movingBackground").css(
        'top', -(((heightOnPage / (wHeight + elHeight)) * wHeight) * 0.35)+"px"

      )
    }
  }
}
