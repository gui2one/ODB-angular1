import { Component, OnInit, Input } from '@angular/core';
//import { Output, Input } from '@angular/core/src/metadata/directives';
import { Router, Route } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
import { AngularFireAction } from 'angularfire2/database/interfaces';

import { AuthService } from '../providers/auth.service.ts.service'
import { OdbAdminDataService } from '../providers/odb-admin-data.service'
import * as firebase from 'firebase'

import * as jQuery from 'jquery';
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


  siteDbData: any;
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

  galleryItemData: object = {
    key: "",
    title: "title",
    width: 400,
    height: 500
  };

  ngOnInit() {

    // console.log("ADMIN COMPONENT LOADED !!");
    // console.log(this.router.url);


    // console.log(this.authService.loggedIn);

    // console.log(this.authService.checkLoggedIn());
    this.errorLogDiv = jQuery(document.getElementById("errorLog"));
    this.bLoggedIn = localStorage.getItem('ODB_connected') == 'true' ? true : false;

    if (this.bLoggedIn) {

      this.dbData = this.getGalleryData();

      let prom = this.dataService.loadSiteDataFromDB();
      prom.then((data) => {

        if (data.val() === null) {

          console.log("no site-data");

          let data = {
            isOnline: true
          }
          let siteData = this.db.database.ref("/").child('site-data').set(data).then((snapshot) => {
            console.log("initiated site-data")
            this.db.database.ref("/").child('site-data').on("value", (snapshot) => {

              console.log(snapshot)
              jQuery('#toggle1')[0].checked = snapshot.val().isOnline;
              this.siteDbData = snapshot.val()
            })
          });
        } else {

          jQuery('#toggle1')[0].checked = data.val().isOnline;
          this.bSiteOnline = data.val().isOnline;
          this.siteDbData = data.val()
        }
      });
    }

  }

  saveToSite(event) {
    console.log("saveToSite function fired");
    this.dataService.getSiteDataToJSON();
  }

  onClickToggle1() {
    // console.log(" clicked")
    let val = jQuery('#toggle1')[0].checked
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


}
