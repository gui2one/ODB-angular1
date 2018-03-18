import { Component, OnInit, Input, Output, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, ViewChildren, QueryList } from '@angular/core';
import { EventEmitter } from '@angular/core';
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
import { ConfirmModalModule } from "../confirm-modal/confirm-modal.module";
import { ConfirmModalComponent } from "../confirm-modal/confirm-modal.component";

import { AdminNotificationModule } from "../admin-notification/admin-notification.module";
import { AdminNotificationComponent } from "../admin-notification/admin-notification.component";
import { SiteUtilsService } from "../providers/site-utils.service";

import { Broadcaster } from "../providers/broadcaster";
import { LanguagesService } from '../providers/languages.service';

import { AdminMultilangInputModule } from "../admin-multilang-input/admin-multilang-input.module";
import { AdminMultilangInputComponent } from '../admin-multilang-input/admin-multilang-input.component';
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
  @ViewChild("testModal") testModal: ConfirmModalComponent;
  @ViewChild("overwriteDatabaseModal") overwriteDatabaseModal: ConfirmModalComponent;


  @ViewChild("adminNotification") adminNotification : AdminNotificationComponent;
  // @Output() sendNotificationEvent = new EventEmitter<(object)>();

  @ViewChildren("serviceBoxesTitleMultiInput") serviceBoxesTitleMultiInputs : QueryList<AdminMultilangInputComponent>;
  @ViewChildren("serviceBoxesTextMultiInput") serviceBoxesTextMultiInputs : QueryList<AdminMultilangInputComponent>;
  

  siteDbData: any;
  homeDbData : object;
  serviceBoxesTitles : object = {};

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
    public router: Router,
    public confirmModal : ConfirmModalModule,
    public broadcaster: Broadcaster,
    public element : ElementRef,
    private siteUtils : SiteUtilsService,
    private langService : LanguagesService,
    private multilangModule : AdminMultilangInputModule

    // private resolver: ComponentFactoryResolver
  ) { }

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
    "fa fa-file-alt",
    "far fa-comment-alt",
    "fas fa-comments",
    "far fa-comments",
    "fas fa-book",    
  ]

  ngOnInit() {





    
    this.errorLogDiv = $(document.getElementById("errorLog"));
    this.bLoggedIn = localStorage.getItem('ODB_connected') == 'true' ? true : false;

    if (this.bLoggedIn) {

      // this.dbData = this.getGalleryData();

      let prom = this.dataService.loadSiteDataFromDB();
      prom.then((data) => {

        if (data.val() === null) {

          console.log("no site-data");

          let data = this.emptySiteData;
          let siteData = this.db.database.ref("/").child('site-data').set(data).then((snapshot) => {
            console.log("initiated site-data")
            this.db.database.ref("/").child('site-data').on("value", (snapshot) => {

              // console.log(snapshot)
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
            // console.log("got home data")
            this.homeDbData = snapshot.val()

            // console.log("---------------- INIT FUNCTION --------------")
            // console.log(this.serviceBoxesTitleMultiInputs)
            this.serviceBoxesTitleMultiInputs.changes.subscribe((data) => {
              

              
            })


          })

      })
    }

  }

  notify(event, type:string, message:string){
    // this.broadcaster.broadcast("errorNotification", message)
    this.adminNotification.success("good", "Nicely Done");
  }
  inputEvent(event){
    // event.preventDefault();
    console.log("----------->",event);
  }
  saveToSite(event) {
    // console.log("saveToSite function fired");
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

  // addGalleryItem(event) {

  //   event.preventDefault();
  //   let key = this.dataBase.ref().child('gallery').push().key;

  //   let updates: object = {};
  //   this.galleryItemData["key"] = key;
  //   updates["/gallery/" + key] = this.galleryItemData;

  //   this.dataBase.ref().update(updates);
  //   // console.log(key);   
  // }


  // getGalleryData() {
  //   return this.db.list('/gallery').valueChanges();
  // }



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
    // event.stopPropagation();
    
    
    if(event.target.getAttribute("type") === "text"){
      let currrentBox = this.serviceBoxes.nativeElement.children[event.currentTarget.id]
      let inputNode = currrentBox.children[0].querySelector(".multilang-wrapper div label input");

      let title: object = {};

      console.log(event.currentTarget);


      for (let lang in this.langService.languages) {
        let curLang = this.langService.languages[lang]
        // console.log(curLang)
        let langInput = currrentBox.children[0].querySelector(".multilang-wrapper div label input[name='text_" + curLang + "'");
        title[curLang] = langInput.value
      }

      let text: object = {};
      for (let lang in this.langService.languages) {
        let curLang = this.langService.languages[lang]
        let langInput = currrentBox.children[2].querySelector(".multilang-wrapper div label textarea[name='text_" + curLang + "'");
        // console.log(currrentBox.children[2])

        text[curLang] = langInput.value
      }      
      // console.log(text);

      let titleFilter = this.serviceBoxesTitleMultiInputs.filter(input => {
        // console.log(event);
        return parseInt(input.element.nativeElement.id) === parseInt(event.currentTarget.id)
      })
 
       title = titleFilter[0].values

      let textFilter = this.serviceBoxesTextMultiInputs.filter(input => {
        console.log(event);
        return parseInt(input.element.nativeElement.id) === parseInt(event.currentTarget.id)
      })
      console.log(textFilter);
      text = textFilter[0].values      
      
      this.dataService.updateServiceBoxesItemData(event.currentTarget.id, title, text, undefined)
    }
  }



  onChooseIcon(event, iconID){
    event.preventDefault();

    let tag_name: string = event.currentTarget.tagName
    // console.log("tag_name : " , tag_name)
    // event.stopPropagation();

    // ///// go up 3 elements to find the parentBox
    let parentBox = event.currentTarget.parentNode.parentNode.parentNode
    console.log("parentBox : ", parentBox)

    let title: object = {};
    
    for (let lang in this.langService.languages) {
      let curLang = this.langService.languages[lang]
      console.log(curLang)
      let langInput = parentBox.children[0].querySelector(".multilang-wrapper div label input[name='text_" + curLang + "'");
      title[curLang] = langInput.value
    } 
    
    let text: object = {};
    for (let lang in this.langService.languages) {
      let curLang = this.langService.languages[lang]
      let langInput = parentBox.children[2].querySelector(".multilang-wrapper div label textarea[name='text_" + curLang + "'");
      console.log(parentBox.children[2])

      text[curLang] = langInput.value
    }      
    // console.log(parentBox.children[0].getAttribute("data-value"));
    
    // let title = parentBox.children[0].getAttribute("data-value")

    // console.log("text : ", text);
 
    // // console.log(title)
    this.dataService.updateServiceBoxesItemData(event.currentTarget.id, title, text, this.iconsList[iconID])
  }


  backupDataBase(event){
    event.preventDefault();
    this.dataService.backupDataBase();
  }

  overwriteDatabase(event,fileData){
    event.preventDefault();
    let file = event.target.files[0];
    event.target.value = "";
    // console.log(file);
    let reader = new FileReader();
    reader.onload = (e)=>{
      // console.log(reader.result);

      this.dataService.overwriteDatabase(reader.result);
    }
    reader.readAsText(file);

  }


  testModalCallback(){
    console.log('my funck!!!!! BETTER ....  STRONGER')
    console.log(this);
  }

  testModalCallback2(arg1 : string, arg2 : string) {

    console.log('22222222222222')
    console.log(arg2);
    console.log(this);
  }


  testModalDecide(event :boolean){
    console.log("decide ....")
    console.log(event)

  }

  testModalDecide2(event : boolean){
    console.log("decide 2 ....")
    console.log(event)
  }



}
