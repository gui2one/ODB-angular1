import { Component, OnInit, AfterViewInit ,Inject } from '@angular/core';

import { inject } from '@angular/core/testing';

// import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
// import { AngularFireAction } from 'angularfire2/database/interfaces';
import * as $ from 'jquery';

// import { AuthService } from '../providers/auth.service.ts.service';
import { AngularFireAuth } from 'angularfire2/auth';
// import{ AuthService } from '../providers/auth.service.ts.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , AfterViewInit{



  dbData : Observable<any[]>;

  bSiteIsOnline : boolean = true;
  adminLoggedIn : boolean = false;
  // authService : AuthService;

  galleryData : JSON;
  sliderItems : Array<any> = [];

  serviceBoxes: any;
  bServicesBoxesLoaded : boolean = false;


  choices : Array<number>;
  constructor( public fireAuth : AngularFireAuth ) {}


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
  
  loadGalleryData() {
    // console.log("GalleryData Function fired");
    $.ajax({
      method: "GET",
      url: "assets/data/galleryData.json", 
      dataType: "json", /// IMPORTNANT !!!!
      success: (data) => {
        // console.log(data);

        this.galleryData = data;
        
        for( let item in this.galleryData){
          let itemTempArray = [];
          itemTempArray.push( this.galleryData[item].displayID)
          itemTempArray.push("assets/img/uploads/" + this.galleryData[item].imageUrl.replace("_thumbnail", ""))
    
          // console.log(itemTempArray);
         

          if( this.galleryData[item].imageUrl){
            this.sliderItems.push({
              url :"assets/img/uploads/"+this.galleryData[item].imageUrl.replace("_thumbnail",""), 
              displayID: this.galleryData[item].displayID
          });
          }

          // this.sliderItems.push( itemTempArray);
        }

        this.sliderItems =  this.sliderItems.sort((a:any, b:any) => { return a.displayID - b.displayID });
        // console.log(ordered);
        // console.log("Slider Items  : ");
        // console.log(this.sliderItems);
        // console.log("GalleryData  : ");
        // console.log(this.galleryData);
      }
    });
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

  ngOnInit(){
    // this.dbData = this.getData();
    // console.log(this.fireAuth.auth.currentUser);
      
      let sub = this.fireAuth.authState.subscribe(user=>{ 
        if(user){

          // console.log(user.email)
          this.adminLoggedIn = true;
        }else{
          // console.log("logged out")
          this.adminLoggedIn = false;
        }
      });

    // console.log(sub);
    this.loadGalleryData();
    this.loadSiteData();
    this.loadServiceBoxesData();
    
    // this.adminLoggedIn = this.authService.checkLoggedIn();
  }

  ngAfterViewInit(){
    this.resizeGoogleMap();
  }

  ngAfterViewChecked(){
    this.resizeGoogleMap();
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



