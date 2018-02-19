import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; // into app.component.ts
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  navbarHeight = 56;
  scrollDuration = 750;
  constructor() { }

  ngOnInit() {

    let root = this;
    // jQuery.get('/assets/php/test.php').then(data =>console.log(data));
    // console.log("menu init");
    $('#navbar').css({ backgroundColor: 'rgba(0,0,0,1.0)' });
    $('.nav-link').click( function(){
      $('#navbarsExample04').removeClass('show');
    })
    $("#headerButton").click(function () {
      // console.log("click Home");
      $('.navbar-toggler').click()
      $('html, body').animate({
        scrollTop: $("#header_part").offset().top
      }, this.scrollDuration);
    }.bind(this));  

    $("#homeButton").click(function () {
      // console.log("click Home");
      $('html, body').animate({
        scrollTop: $("#about_part").offset().top - this.navbarHeight
      }, this.scrollDuration);
    }.bind(this));   
    
    $("#contactButton").click(function () {
      // console.log("click Home");
      $('html, body').animate({
        scrollTop: $("#contact_part").offset().top - this.navbarHeight
      }, this.scrollDuration);
    }.bind(this));        

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


  myScrollTo(button, anchor){
    button.click( function(){
      $('html, body').animate({
        scrollTop: anchor.offset().top - this.navbarHeight
      }, this.scrollDuration);
    }.bind(this));   
  
  }

  onScroll(){

  }
  menuFadeIn() {
    $('#navbar').addClass("fade-in").removeClass("fade-out");
  }
  menuFadeOut() {
    $('#navbar').addClass("fade-out").removeClass("fade-in");
  }



}
