import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; // into app.component.ts
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  navbarHeight = 54;
  scrollDuration = 1000;
  constructor() { }

  ngOnInit() {

    
    let root = this;
    // jQuery.get('/assets/php/test.php').then(data =>console.log(data));
    // console.log("menu init");
    // $('#navbar').css({ backgroundColor: 'rgba(0,0,0,1.0)' });
    $('.nav-link').click( function(){
      $('#navbarsExample04').removeClass('show');
    })
  

    this.myScrollTo($("#headerButton"), $("#header_part"));
    this.myScrollTo($("#homeButton"), $("#about_part"));
    this.myScrollTo($("#contactButton"), $("#contact_part"));
    this.myScrollTo($("#galleryButton"),$("#gallery_part"));
    document.onscroll = function (event) {
      let triggerHeight = 100;
      let trigger : boolean = false;

      // console.log("scroll event");
      // we need to check both body and documentElement scrollTops because of microsoft EDGE mainly
      if ( $(document.body).scrollTop() > triggerHeight 
        || $(document.documentElement).scrollTop() > triggerHeight){
          trigger = true;
      }
      
      if (trigger) {
        this.menuFadeIn();
      }else{
        this.menuFadeOut();
      }
      
    }.bind(this)

    $(document).trigger('scroll'); // trigger scroll to init menu state : black or tansparent
    
  }


  ngAfterViewInit() {
    // this.pauseVideo();
  }

  pauseVideo() {
    // console.log($("video"));
    $("video")[0].pause();
  }

  myScrollTo(button, anchor){
    let root = this;
    button.click( function(){
      $('html, body').animate({
        scrollTop: anchor.offset().top - root.navbarHeight
      }, root.scrollDuration);

      root.pauseVideo();
      $("#navbar a").each( function(){
        
        $(this).removeClass("active")
      })
      button.addClass("active");
      
    }.bind(root));   

    return false;
  
  }

  onScroll(){

  }
  menuFadeIn() {
    $('#navbar-wrapper').addClass("fade-in").removeClass("fade-out");
  }
  menuFadeOut() {
    $('#navbar-wrapper').addClass("fade-out").removeClass("fade-in");
  }



}
