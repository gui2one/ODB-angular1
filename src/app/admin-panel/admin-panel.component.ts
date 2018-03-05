import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
//import { Output, Input } from '@angular/core/src/metadata/directives';
import { Router, Route } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
import { AngularFireAction } from 'angularfire2/database/interfaces';

import { AuthService } from '../providers/auth.service.ts.service'
import { OdbAdminDataService } from '../providers/odb-admin-data.service'
import * as firebase from 'firebase'

import * as $ from 'jquery';
import { NgModule } from '@angular/core/src/metadata/ng_module';
import { Promise } from 'q';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: [
    '../admin/admin.component.scss',
    './admin-panel.component.scss']
})

// @NgModule({imports:[]})
export class AdminPanelComponent implements OnInit {

  @ViewChild("serviceBoxes") serviceBoxes : ElementRef;


  siteDbData: any;
  homeDbData : object;
  bSiteOnline: boolean = false;
  dbData: Observable<any[]>;
  bLoggedIn: boolean = false;

  message: boolean = false;

  galleryData: object;
  dataBase: any = firebase.database();
  errorLogDiv: any;

  constructor(
    public authService: AuthService,
    private db: AngularFireDatabase,
    private dataService: OdbAdminDataService,
    public router: Router) { }

  emptySiteData : object = {
    isOnline : false
  };

  emptyHomeData : object = {
    serviceBoxes: [
      {
        title:"box 1",
        icon:"",
        text:""
      },
      {
        title: "box 2",
        icon: "",
        text: ""
      },
      {
        title: "box 3",
        icon: "",
        text: ""
      },
      {
        title: "box 4",
        icon: "",
        text: ""
      }
    ]
  }  
  galleryItemData: object = {
    key: "",
    title: "title",
    width: 400,
    height: 500
  };

  iconsList: Array<string> = [
    "fa fa-cogs",
    "fa fa-hourglass-half",
    "fa fa-compass",
    "fa fa-file-alt"
  ]

  ngOnInit() {

    // console.log("ADMIN COMPONENT LOADED !!");
    // console.log(this.router.url);


    // console.log(this.authService.loggedIn);

    // console.log(this.authService.checkLoggedIn());
    this.errorLogDiv = $(document.getElementById("errorLog"));
    this.bLoggedIn = localStorage.getItem('ODB_connected') == 'true' ? true : false;

    if (this.bLoggedIn) {

      this.dbData = this.getGalleryData();

      let prom = this.dataService.loadSiteDataFromDB();
      prom.then((data) => {

        if (data.val() === null) {

          console.log("no site-data");

          let data = this.emptySiteData;
          let siteData = this.db.database.ref("/").child('site-data').set(data).then((snapshot) => {
            console.log("initiated site-data")
            this.db.database.ref("/").child('site-data').on("value", (snapshot) => {

              console.log(snapshot)
              $('#toggle1')[0].checked = snapshot.val().isOnline;
              this.siteDbData = snapshot.val()
            })
          });
        } else {

          $('#toggle1')[0].checked = data.val().isOnline;
          this.bSiteOnline = data.val().isOnline;
          this.siteDbData = data.val()
        }
      });

      let prom2 = this.dataService.loadHomeDataToDB();
      prom2.then((data) => {
        if (data.val() === null) {
          console.log("no home-data");
          let data = this.emptyHomeData;
          let homeData = this.db.database.ref("/").child('home-data')
            .set(data)
            .then((snapshot) => {
              console.log("initiated home-data")
            });
        }

        this.db.database.ref("/").child('home-data')          
          .on("value", (snapshot) => {
            // console.log(snapshot)
            this.homeDbData = snapshot.val()
          })

      })
    }

  }

  saveToSite(event) {
    console.log("saveToSite function fired");
    this.dataService.getSiteDataToJSON();
  }

  saveServiceBoxesToSite(event){
    console.log("saveServiceBoxesToSite function fired");
    this.dataService.getServiceBoxesDataAsJSON();
  }

  onClickToggle1() {
    // console.log(" clicked")
    let val = $('#toggle1')[0].checked
    this.db.database.ref().child("site-data/isOnline").set(val);
    this.bSiteOnline = val;
    // console.log(this);
  }

  receiveMessage(event) {
    this.message = event;
    this.bLoggedIn = this.message;
    //localStorage.setItem('ODB_connected','true');
    // console.log(localStorage);    
  }

  logOut(event) {
    // console.log("log out ????");

    this.authService.logOut();
    this.bLoggedIn = false;
    //localStorage.setItem('ODB_connected', 'false');
  }

  addGalleryItem(event) {

    event.preventDefault();
    let key = this.dataBase.ref().child('gallery').push().key;

    let updates: object = {};
    this.galleryItemData["key"] = key;
    updates["/gallery/" + key] = this.galleryItemData;

    this.dataBase.ref().update(updates);
    // console.log(key);   
  }


  getGalleryData() {
    return this.db.list('/gallery').valueChanges();
  }



  showLogInfos(type: string, message: string) {
    if (type === "success") {
      this.errorLogDiv.css({ backgroundColor: 'green' });
    } else if (type === "error") {
      this.errorLogDiv.css({ backgroundColor: 'red' });
    } else {
      console.log("bad infos type ( \"success\" or \"error\" )");
      return 0;
    }

    let div = this.errorLogDiv[0];
    div.innerHTML = message;
    this.errorLogDiv.css({ opacity: '1' });
    setTimeout(() => this.errorLogDiv.css({ opacity: '0' }), 3000);
  }

  onFocusOut(event){
    event.preventDefault();
    let currrentBox = this.serviceBoxes.nativeElement.children[event.currentTarget.id]
    // console.log(currrentBox);
    let title = currrentBox.children[0].innerHTML
    let text = currrentBox.children[3].value

    // console.log($(event.target.parentNode)[0].childNodes);
    this.dataService.updateServiceBoxesItemData(event.target.id, title, text, undefined)
  }

  onChooseIcon(event, iconID){
    event.preventDefault();

    let tag_name: string = event.currentTarget.tagName
    // event.stopPropagation();

    ///// go up 3 elements to find the parentBox
    let parentBox = event.currentTarget.parentNode.parentNode.parentNode

    // console.log(parentBox.childNodes)
    let title = parentBox.children[0].innerHTML
    let text = parentBox.children[3].value
 
    // console.log(title)
    this.dataService.updateServiceBoxesItemData(event.currentTarget.id, title, text, this.iconsList[iconID])
  }

}
