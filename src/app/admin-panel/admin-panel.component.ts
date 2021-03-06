import { Component, OnInit, Input, Output, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, ViewChildren, QueryList } from '@angular/core';
import { EventEmitter } from '@angular/core';
//import { Output, Input } from '@angular/core/src/metadata/directives';
import { Router, Route } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
import { AngularFireAction, DatabaseSnapshot, AngularFireList } from 'angularfire2/database/interfaces';

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
import { ToggleComponent } from '../toggle/toggle.component';
import { CKEditorComponent } from 'ngx-ckeditor';
import { viewParentEl } from '@angular/core/src/view/util';
import { AdminTextItemComponent } from '../admin-text-item/admin-text-item.component';
import { SaveStateService } from '../providers/save-state.service';
import { sortable } from 'jquery-ui/ui/widgets/sortable';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: [
    '../admin/admin.component.scss',
    './admin-panel.component.scss']
})

// @NgModule({imports:[]})
export class AdminPanelComponent implements OnInit {

  @ViewChild("siteOnlineToggle") siteOnlineToggle : ToggleComponent;
  @ViewChild("serviceBoxes") serviceBoxes : ElementRef;
  @ViewChild("testModal") testModal: ConfirmModalComponent;
  @ViewChild("overwriteDatabaseModal") overwriteDatabaseModal: ConfirmModalComponent;


  @ViewChild("adminNotification") adminNotification : AdminNotificationComponent;
  // @Output() sendNotificationEvent = new EventEmitter<(object)>();

  @ViewChildren("serviceBoxesTitleMultiInput") serviceBoxesTitleMultiInputs : QueryList<AdminMultilangInputComponent>;
  @ViewChildren("serviceBoxesTextMultiInput") serviceBoxesTextMultiInputs : QueryList<AdminMultilangInputComponent>;
  
  @ViewChildren("homeTextItem") homeTextItems : QueryList<AdminTextItemComponent>;

  @ViewChild("CKEditor") CKEditor: CKEditorComponent;
  @ViewChild("CKEditorDialog") CKEditorDialog: HTMLElement;

  @ViewChild("homeTextItemsContainer") homeTextItemsContainer : ElementRef;


  siteDbData: any;
  // homeDbData : object;
  homeDbData : DatabaseSnapshot;
  // serviceBoxesTitles : object = {};

  bSiteOnline: boolean = false;
  dbData: Observable<any[]>;
  bLoggedIn: boolean = false;

  message: boolean = false;

  galleryData: object;
  dataBase: any = firebase.database();
  errorLogDiv: any;

  homeTextData: Observable<any[]>;

  constructor(
    public authService: AuthService,
    private db: AngularFireDatabase,
    private dataService: OdbAdminDataService,
    public router: Router,
    public confirmModal : ConfirmModalModule,
    public broadcaster: Broadcaster,
    public element : ElementRef,
    private siteUtils : SiteUtilsService,
    public langService : LanguagesService,
    private multilangModule : AdminMultilangInputModule,
    public saveStateService : SaveStateService
    

  ) { }

  emptySiteData : object = {
    isOnline : false
  };





  
  

  presentationText : Q.Promise<any>;

  emptyHomeData : object = {
    presentationText: this.dataService.emptyTextObject,
    serviceBoxes: [
      {
        title:{ fr: "aaa" },
        icon:"",
        text:{fr:"aaa"}
      },
      {
        title: { fr: "aaa" },
        icon: "",
        text: { fr: "aaa" }
      },
      {
        title: { fr: "aaa" },
        icon: "",
        text: { fr: "aaa" }
      },
      {
        title: { fr: "aaa" },
        icon: "",
        text: { fr: "aaa" }
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

    // console.log("------------------ Full INIT ------------------------")
    
    window.addEventListener("backupFileSavedEvent", (e) => {
      // console.log("event occured");
      // console.log(e['detail']);
      this.onDataBaseSaved(e['detail']);

    })  

    this.errorLogDiv = $(document.getElementById("errorLog"));
    // this.bLoggedIn = localStorage.getItem('ODB_connected') == 'true' ? true : false;
    this.bLoggedIn = this.authService.loggedIn

  

    // if (this.bLoggedIn) {

      // this.dbData = this.getGalleryData();

      this.homeTextData = this.dataService.loadHomeTextFromDB()
      // console.log(this.homeTextItemsContainer)
      $(this.homeTextItemsContainer.nativeElement).sortable({
        axis: 'y',
        placeholder: "sortable-highlight",
        start : function(event){
          console.log(event);
          
        }, stop : function(event){
          // console.log(event.target.children);

          for (let i = 0; i < event.target.children.length; i++){
            let curItem = event.target.children[i];
            
            let displayID = $(curItem).attr('data-display-id')
            // console.log(displayID);
            
            let itemKey = $(curItem).attr('data-item-key')
            this.db.database.ref("/home-data/home-text/" + itemKey).update({ displayID: i })
            
          }

          
        }.bind(this)
      })


      let presentationPromise = this.dataService.loadPresentationTextFromDB().then((snapshot) => {
        this.presentationText = snapshot.val();
      })

      let prom = this.dataService.loadSiteDataFromDB();
      prom.then((data) => {

        if (data.val() === null) {

          // console.log("no site-data");

          let data = this.emptySiteData;
          let siteData = this.db.database.ref("/").child('site-data').set(data).then((snapshot) => {
            // console.log("initiated site-data")
            this.db.database.ref("/").child('site-data').on("value", (snapshot) => {

              // console.log(snapshot)
              // $('#toggle1')[0].checked = snapshot.val().isOnline;
              this.siteOnlineToggle.state = snapshot.val().isOnline;
              this.siteDbData = snapshot.val()
            })
          });
        } else {

          // $('#toggle1')[0].checked = data.val().isOnline;
          this.siteOnlineToggle.state = data.val().isOnline;
          this.bSiteOnline = data.val().isOnline;
          this.siteDbData = data.val()
        }
      });




   

  }

  // testLangParam(){
  //   this.homeTextItems.forEach( (item, id) =>{
  //     console.log(item, id)
  //     item.currentLanguage = "en"
  //   })
  // }
  saveViewParams(){
    this.saveStateService.save();
  }
  restoreViewParams(){
    this.saveStateService.restore();
  }
  ngAfterViewInit(){

    this.saveStateService.addSaveSet(this, "serviceBoxesTitleMultiInputs", ["currentLanguage", "name", "bShowAllLang"]);
    this.saveStateService.addSaveSet(this, "serviceBoxesTextMultiInputs", ["currentLanguage", "name"]);
    this.saveStateService.addSaveSet(this, "homeTextItems", ["currentLanguage", "bCollapsed", "bShowAllLang"]);

    let loadTest = this.dataService.loadHomeDataFromDB2();
    // console.log(loadTest.forEach( (item, id)=>{
    //   return 
    // }));

    

    let prom2 = this.dataService.loadHomeDataFromDB();
    prom2.then((data) => {
      if (data.val() === null) {
        // console.log("no home-data");
        let data = this.emptyHomeData;
        let homeData = this.db.database.ref("/").child('home-data')
          .set(data)
          .then((snapshot) => {
            // console.log("initiated home-data")
          });
      }

      this.db.database.ref("/").child('home-data')
        .on("value", (snapshot) => {
          // console.log("got home data")
          this.serviceBoxesTitleMultiInputs.changes.subscribe((data) => {

            // console.log(data);

          })

          //////////////////
          //// SAVE STATE
          //////////////////
          this.saveStateService.save();
          this.homeDbData = snapshot.val()
          this.presentationText = this.homeDbData["presentationText"].text;
          
          // console.log(this.presentationText);
          
          // this.presentationText = this.homeDbData
          setTimeout(() => {
            this.saveStateService.restore();
          }, 0);
          //////////////////
          //// END SAVE STATE
          //////////////////
          

        })

    })        
  }


  resetServiceBoxesMultilangInputs(titleParams, textParams){
    this.serviceBoxesTitleMultiInputs.forEach((item, id) => {
      item.currentLanguage = titleParams[id]
      // console.log("reset !!!!!");
      // console.log("titleParams[id] -->", titleParams[id]);      
      
    })

    this.serviceBoxesTextMultiInputs.forEach((item, id) => {
      item.currentLanguage = textParams[id]
      // console.log("reset !!!!!");
      // console.log("titleParams[id] -->", titleParams[id]);      

    })    
  
  }

  resetHomeTextItems(params){
    this.homeTextItems.forEach( (item, id)=>{
      
      let type = params[id].type;
      let language = params[id].language;

      item.inputNode.currentLanguage = language;
      item.textType = type;
      // item.textTypeCheckbox.che = true;
      // console.log(language)

    })

  }

  notify(event, type:string, message:string){
    // this.broadcaster.broadcast("errorNotification", message)
    this.adminNotification.success("good", "Nicely Done");
  }
  inputEvent(event){
    // event.preventDefault();
    // console.log("----------->",event);
  }

  public saveAllToSite(){
    this.saveToSite(null);
    this.saveHomeTextToSite(null);
    this.saveServiceBoxesToSite(null);
  }
  saveToSite(event) {
    // console.log("saveToSite function fired");
    this.dataService.getSiteDataToJSON();
  }

  saveServiceBoxesToSite(event){
    // console.log("saveServiceBoxesToSite function fired");
    this.dataService.getServiceBoxesDataAsJSON();
  }

  saveHomeTextToSite(event){
    this.dataService.getHomeTextDataAsJSON();
  }



  onClickToggle1(event) {
    // console.log(" clicked")
    let val = this.siteOnlineToggle.state
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

  showLogInfos(type: string, message: string) {
    if (type === "success") {
      this.errorLogDiv.css({ backgroundColor: 'green' });
    } else if (type === "error") {
      this.errorLogDiv.css({ backgroundColor: 'red' });
    } else {
      // console.log("bad infos type ( \"success\" or \"error\" )");
      return 0;
    }

    let div = this.errorLogDiv[0];
    div.innerHTML = message;
    this.errorLogDiv.css({ opacity: '1' });
    setTimeout(() => this.errorLogDiv.css({ opacity: '0' }), 3000);
  }

  onCKEditorClose(content, id) {

    
    let title: object = {};
    let text: object = {};

    let titleFilter = this.serviceBoxesTitleMultiInputs.filter(input => {
      // console.log(event);
      return parseInt(input.element.nativeElement.id) === parseInt(id)
    })

    title = titleFilter[0].values

    let textFilter = this.serviceBoxesTextMultiInputs.filter(input => {
      // console.log("textFilter !!");
      
      return parseInt(input.element.nativeElement.id) === parseInt(id)
    })
    // console.log(content);
    textFilter[0].values[textFilter[0].currentLanguage] = textFilter[0].editorValue;
    // console.log(textFilter[0].editorValue);
    for(let item in textFilter[0].values){
      let textValue = textFilter[0].values[item];
      let converted = textValue.replace(/\n/g, "")

      // console.log(converted);
      
      // converted = converted.replace("\r", "")
      textFilter[0].values[item] = converted;        
    }
    text = textFilter[0].values     
    
    this.dataService.updateServiceBoxesItemData(id, title, text, undefined)
  }
  onFocusOut(event){
    event.preventDefault();
    event.stopPropagation();
    
    
    if(event.target.getAttribute("type") === "text"){

      let title: object = {};
      let text: object = {};
 
      let titleFilter = this.serviceBoxesTitleMultiInputs.filter(input => {
        // console.log(event);
        return parseInt(input.element.nativeElement.id) === parseInt(event.currentTarget.id)
      })
      for (let item in titleFilter[0].values) {
        let textValue = titleFilter[0].values[item];
        let converted = textValue.replace(/\n/g, "")
        titleFilter[0].values[item] = converted;
      }      
 
       title = titleFilter[0].values

      let textFilter = this.serviceBoxesTextMultiInputs.filter(input => {
        // console.log(event);
        return parseInt(input.element.nativeElement.id) === parseInt(event.currentTarget.id)
      })

      for (let item in textFilter[0].values) {
        let textValue = textFilter[0].values[item];
        let converted = textValue.replace(/\n/g, "")
        textFilter[0].values[item] = converted;
      }   

      text = textFilter[0].values      
      
      this.dataService.updateServiceBoxesItemData(event.currentTarget.id, title, text, undefined)
    }
  }



  collaspeAllHomeTextItems(){
    this.homeTextItems.forEach( (item, id)=>{
      item.bCollapsed = true
    })
  }
  expandAllHomeTextItems() {
    this.homeTextItems.forEach((item, id) => {
      item.bCollapsed = false
    })
  }  
  onHomeTextItemEmitValues(data, displayID) {
    // console.log(data);
    for (let item in data.text) {
      let textValue = data.text[item];
      let converted = textValue.replace(/\n/g, "")
      data.text[item] = converted;
    }

    this.dataService.updateHomeTextItem(data.type, data.tagName, data.text, data.key, displayID);
  }  

  onHomeTextItemDeleteClick(event, itemKey){
    event.stopPropagation();
    // console.log(event.target);
    
    this.testModal.show(" confirm Detlete text item !","yes", "no", this.deleteHomeTextItem.bind(this), itemKey)
  }

  deleteHomeTextItem(itemKey){
    // console.log(itemKey)
    this.dataService.deleteHomeTextItem(itemKey);
  }
  onChooseIcon(event, iconID){
    event.preventDefault();

    let tag_name: string = event.currentTarget.tagName
    // console.log("tag_name : " , tag_name)
    // event.stopPropagation();

    // ///// go up 3 elements to find the parentBox
    let parentBox = event.currentTarget.parentNode.parentNode.parentNode
    // console.log("parentBox : ", parentBox)

    let title: object = {};
    
    for (let lang in this.langService.languages) {
      let curLang = this.langService.languages[lang]
      let langInput = parentBox.children[0].querySelector(".multilang-wrapper div div div input[name='text_" + curLang + "'");
      
      title[curLang] = langInput.value
    } 
    
    let text: object = {};
    for (let lang in this.langService.languages) {
      let curLang = this.langService.languages[lang]
      let langInput = parentBox.children[2].querySelector(".multilang-wrapper div div div");
      // console.log(parentBox.children[2])
      // console.log(langInput)
      text[curLang] = langInput.innerHTML
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

  onDataBaseSaved(fileName){
    // console.log("try and download the file named :", fileName);
    this.dataService.downloadDataBasBackup(fileName)
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

  onOverwriteDataBaseInputChange(event){
    this.testModal.show('Confirm overwiting data base ?! really  really ????','yes really !','', this.overwriteDatabase.bind(this), event, this)
  }

  onOverwriteDatabaseClick(event){
  
    //reset input value to nothing 
    let input = $(event.target).parent().children()[1];
    $(input).val("")
    
     
    
  }





  addHomeTextItem(event){

    this.dataService.addHomeTextItem()
  }

  testJsonSave(){
    this.dataService.saveFirebaseDataToJSON("test_data.json", "/home-data");
  }

  
  onPresentationTextEmitValues(data){
    console.log(data);
    this.dataService.savePresentationTextToDB(data)
  }

}
