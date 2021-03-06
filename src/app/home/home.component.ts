import { Component, OnInit, AfterViewInit ,Inject } from '@angular/core';

import { inject } from '@angular/core/testing';

// import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
// import { AngularFireAction } from 'angularfire2/database/interfaces';
import * as $ from 'jquery';

// import { AuthService } from '../providers/auth.service.ts.service';
import { AngularFireAuth } from 'angularfire2/auth';
import{SiteUtilsService} from '../providers/site-utils.service'
import { SiteLanguagesService } from '../providers/site-languages.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , AfterViewInit{



  dbData : Observable<any[]>;

  bSiteIsOnline : boolean = false;
  adminLoggedIn : boolean = false;
  // authService : AuthService;

  galleryData : JSON;
  homeTextData : object;
  homeFullData : object;
  slidersData : object;

  clientsSlider : object;
  homeSlider : object;
  sliderItems : Array<any> = [];

  serviceBoxes: any;
  bServicesBoxesLoaded : boolean = false;


  choices : Array<number>;
  constructor(  public fireAuth : AngularFireAuth, 
                private siteUtils : SiteUtilsService,
                public siteLangService : SiteLanguagesService 
              ) {}


  ngOnInit() {


    //console.log(this.siteLangService.currentLanguage);
    // this.siteUtils.displayScreenInfos();

    let sub = this.fireAuth.authState.subscribe(user => {
      if (user) {

        // console.log(user.email)
        this.adminLoggedIn = true;
      } else {
        // console.log("logged out")
        this.adminLoggedIn = false;
      }
    });

    // console.log(sub);
    this.loadGalleryData();
    this.loadSiteData();
    this.loadHomeTextItemsData();
    this.loadServiceBoxesData();
    this.loadFullHomeData();

    this.loadSlidersData();
    
    
    
    // this.adminLoggedIn = this.authService.checkLoggedIn();
  }



  ngAfterViewInit() {

    this.resizeGoogleMap();
    
    // $(window).trigger("resize");
    

  
    
  }

  initHome(){
    this.myScrollTo($("#enter-button-wrapper"), $('#about_part'));
    $('#site-wrapper').animate({
      opacity: 1.0
    }, 400)
    $(window).trigger("resize");

  }
  myScrollTo(button, anchor) {
    let root = this;
    // console.log(button);
    
    button.click(function () {
      // console.log("ggfgfgdfgdfg");
      
      $('html, body').animate({
        scrollTop: anchor.offset().top - 60
      }, 1000);

      // root.pauseVideo();
      // $("#navbar a").each(function () {

      //   $(this).removeClass("active")
      // })
      // button.addClass("active");

    }.bind(root));

    return false;

  }
  loadSiteData(){
      $.ajax({
        method: "GET",
        url: "assets/data/siteData.json",
        dataType: "json", /// IMPORTNANT !!!!
        success: (data) => {
          // console.log(data);          
          this.bSiteIsOnline = data.isOnline;
          // console.log("Site is online  ???: "+this.bSiteIsOnline);          
        }
      });
  }

  loadFullHomeData(){
    $.ajax({
      method: "GET",
      url: "assets/data/homeFullData.json",
      dataType: "json", /// IMPORTNANT !!!!
      success: (data) => {
        // console.log(data);          
        this.homeFullData = data;
        console.log("fullHomeData -->: ");          
        console.log(this.homeFullData);          

        this.initHome();
         
      },
      error: (data ) => {
        console.log("error");        
      }
    });
  }

  loadHomeTextItemsData(){

    let textData = {}
    $.ajax({
      method: "GET",
      url: "assets/data/homeTextData.json",
      dataType: "json", /// IMPORTNANT !!!!
      success: (data) => {
        for(let key in data){
          // console.log(data[key]);
          textData[data[key].tagName] = data[key].text
        }

        this.homeTextData = textData;

        ///sets empty values to default language
        for(let key in this.homeTextData){
          let curData = this.homeTextData[key]
          // console.log(curData)
        }
      }

    })

    
  }
  
  
  loadGalleryData() {
    // console.log("GalleryData Function fired");
    $.ajax({
      method: "GET",
      url: "assets/data/galleryData.json", 
      dataType: "json", /// IMPORTNANT !!!!
      success: (data) => {


        this.galleryData = data;
        
        for( let item in this.galleryData){
          let itemTempArray = [];
          itemTempArray.push( this.galleryData[item].displayID)
          itemTempArray.push("assets/img/uploads/" + this.galleryData[item].imageUrl.replace("_thumbnail", ""))

         

          if( this.galleryData[item].imageUrl){
            this.sliderItems.push({
              url :"assets/img/uploads/"+this.galleryData[item].imageUrl.replace("_thumbnail",""), 
              displayID: this.galleryData[item].displayID
          });
          }

 
        }

        ///sorting by displayID

        this.sliderItems =  this.sliderItems.sort((a:any, b:any) => { return a.displayID - b.displayID });

      }
    });
  }

  loadSlidersData(){
    $.ajax({
      method: "GET",
      url: "assets/data/slidersData.json",
      dataType: "json", /// IMPORTNANT !!!!
      success: (data) => {

        this.slidersData = data;
        console.log("__________________________");
        
        console.log(this.slidersData);
        
        for(let key in this.slidersData){
          let curSlider = this.slidersData[key]
          if(curSlider.name === 'clients_slider'){
            // console.log(curSlider.slides);
            let tempArray = []
            for(let slide in curSlider.slides){
              let curSlide = curSlider.slides[slide];
              curSlide.imageUrl = curSlide.imageUrl.replace("_thumbnail", "");
              tempArray.push(curSlide);
            }
            
            curSlider.slides = tempArray.sort( (a : any, b :any)=>{ return a.displayID - b.displayID})
            this.clientsSlider = curSlider;
          } else if (curSlider.name === 'home_slider'){
            let tempArray = []
            for (let slide in curSlider.slides) {
              let curSlide = curSlider.slides[slide];
              curSlide.imageUrl = curSlide.imageUrl.replace("_thumbnail","");
              tempArray.push(curSlide);
              
            }
            curSlider.slides = tempArray.sort((a: any, b: any) => { return a.displayID - b.displayID })
            this.homeSlider = curSlider;              
          }
          console.log(curSlider);
        }        
      }
    })
  }

  loadServiceBoxesData(){
    $.ajax({
      method: "GET",
      url: "assets/data/serviceBoxesData.json",
      dataType: "json", /// IMPORTNANT !!!!
      success: (data) => {
        
        this.serviceBoxes = data;
        // console.log(this.serviceBoxes);

        this.choices = [0, 8, 98, 15]
        this.bServicesBoxesLoaded = true;
        
      }
    });
  }



  ngAfterViewChecked(){
    // this.resizeGoogleMap();
    // window.dispatchEvent(new Event("resize"));
  }
  getData(){
    // return this.db.list('/gallery').valueChanges();
  }

  resizeGoogleMap(){
    let titleHeight = $('#contact_part .title-container').height()
    let addressHeight = $('#contact_part .address').height()
    let totalHeight = $('#contact_part').height()
    // console.log(titleHeight);
    // console.log(addressHeight);
    $(".map-div").css({ height: totalHeight - ( titleHeight + addressHeight)})
  }

}



