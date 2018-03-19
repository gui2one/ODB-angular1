import { Component, OnInit , Input} from '@angular/core';
import * as $ from 'jquery'; // into app.component.ts
import { SiteLanguagesService } from '../providers/site-languages.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  navbarHeight = 54;
  scrollDuration = 1000;

  flagsArray = [ 'fr.svg', 'gb.svg']
  flagSVGs = {fr : 'fr.svg', en :'gb.svg'}

  @Input() title : string = "site title here"
  @Input() menuLinks : Array<string> = ["Link 1", "Link2", "Link3"];
  @Input() menuLanguagesLinkText : string;
  constructor(
    public siteLangService : SiteLanguagesService
  ) { }

  ngOnInit() {

    let root = this;

    $('.menu-link').click( function(){
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

  onFlagClick(event){
    event.preventDefault();
    console.log(event.currentTarget);
    console.log(event.currentTarget.id);

    this.siteLangService.currentLanguage = this.siteLangService.languages[ parseInt(event.currentTarget.id)]
  }



}
