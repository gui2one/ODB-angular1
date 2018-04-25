import { Component, OnInit} from '@angular/core';
import * as $ from "jquery"

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  
  navbarHeight = 54;
  scrollDuration = 1000;
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(){

    console.log($("#footer_menu_top"));
    let headerAnchor = $("#header_anchor");
    console.log(headerAnchor);
    this.myScrollTo($("#footer_menu_top"), $("#header_anchor"));
    this.myScrollTo($("#footer_menu_accueil"), $("#about_part"));
    this.myScrollTo($("#footer_menu_contact"), $("#contact_part"));
    this.myScrollTo($("#footer_menu_gallery"),$("#gallery_part"));
  }

  myScrollTo(button, anchor){
    
    let root = this;
    button.click( function(){
      console.log(button);
      $('html, body').animate({
        scrollTop: anchor.offset().top - root.navbarHeight
      }, root.scrollDuration);

      // root.pauseVideo();
      $("#navbar a").each( function(){
        
        $(this).removeClass("active")
      })
      button.addClass("active");
      
    }.bind(root));   

    return false;
  
  }
}
