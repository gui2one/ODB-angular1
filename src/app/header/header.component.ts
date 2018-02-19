import { Component, OnInit } from '@angular/core';
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
  
  offset = 0;

  checkInterval;

  video : any;
  isPlaying : boolean;
  constructor() { }

  ngOnInit() {
    this.video = $('#video')[0];
    // console.log(this.video.paused)
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
  }
  ngAfterViewChecked(){
    let sourceRatio = 1280 / 720;
    let width = $("#video")[0].offsetWidth;
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
    this.isPlaying = !this.video.paused

    // if( ! this.isPlaying){

    //   // $('#playButton').trigger('click');
    //   // console.log($('#playButton'));    
    // }

  }

  onClickPlay(event){
    // event.preventDefault();
    console.log("play button click");
    this.video.play();
    this.isPlaying = !this.video.paused
  }

  onClickPause(){
    this.video.pause();
    this.isPlaying = !this.video.paused
  }


}
