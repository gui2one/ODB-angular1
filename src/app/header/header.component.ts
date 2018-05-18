import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery'
// import { clearInterval } from 'timers';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  defaultImage = 'assets/img/oeufs_2.jpg';
  
  backgroundImage = 'assets/img/loeuf_dubreil_FINAL_02.mp4';
  

  @Input() title : string;
  @Input() subTitle : string;
  offset = 0;

  @Input() menuTitle : string = "Menu Title here";
  @Input() menuLinks: Array<string> = ["aaa", "bbb", "ccc"];
  @Input() menuLanguagesLinkText: string;
  checkInterval;

  video : any;
  isPlaying : boolean;
  userPaused : boolean = false;
  bVideoHidden : boolean = true;
  constructor() { }

  ngOnInit() {
    this.video = $('#video')[0];
    let videoType  = $("video");

    this.isPlaying = !this.video.paused;

    $(document.body).trigger('scroll')
    this.checkInterval = setInterval(this.checkState.bind(this), 500);
  }

  checkState(){
    // console.log(this.isPlaying);
    if(this.isPlaying){

      window.clearInterval(this.checkInterval);
    }
  }
  ngAfterViewInit(){


    this.isPlaying = !this.video.paused;
    let bSmallScreen: boolean = $(window).outerWidth() < 450 || $(window).outerHeight() < 450
    // console.log(bSmallScreen);
    this.bVideoHidden = bSmallScreen;

    if(this.bVideoHidden){
      $(".video-controls").css({
        display : "none"
      })
    }


  }
  ngAfterViewChecked(){
    if (!this.bVideoHidden){

    
          let sourceRatio = 1280.0 / 720.0;
          let width = $("#video")[0].offsetWidth;

          // console.log("width -->",width);
          
          let height = $("#video")[0].offsetHeight;     
          let windowWidth = window.innerWidth;
          let windowHeight = window.innerHeight;

          let windowRatio = windowWidth / windowHeight;

          if( windowRatio > sourceRatio ){
            let width = $("#video")[0].offsetWidth;
            let height = $("#video")[0].offsetHeight;      
            // console.log( "window ratio > video ratio")
            $("#video").css({
              width : windowWidth,
              height: "auto",
              marginLeft: 0,
              marginTop: -((height - windowHeight) / 2)
              // height:500
            })

          }else{
      
            $("#video").css({
              height: "100vh",
              width:"auto",
              marginLeft: -((width - windowWidth) / 2),
              marginTop:0
              // height:500
            })

          }
          

          if(window.scrollY +200 >  windowHeight){
            // this.video.pause();
            
          } else if( window.scrollY < 100 && !this.userPaused){


              
            this.video.play();

            // this.isPlaying = !this.video.paused
          }

          this.isPlaying = !this.video.paused

    }

  }

  onClickPlay(event){
    // event.preventDefault();
    // console.log("play button click");
    this.video.play();
    this.isPlaying = !this.video.paused
    this.userPaused = false;
  }

  onClickPause(){
    this.video.pause();
    this.isPlaying = !this.video.paused
    this.userPaused = true;
  }


}
