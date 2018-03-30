import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable'
import * as $ from 'jquery'
import { Promise } from 'q';
import {Location} from '@angular/common'

import { Broadcaster } from "./broadcaster";
import { LanguagesService } from './languages.service';


@Injectable()
export class OdbAdminDataService {

  @Output() backupFileSavedEventEmitter : EventEmitter<string> = new EventEmitter<(string)>()

  galleryDBData : Observable<any[]>;
  galleryJsonData : any;
  siteJsonData :any;
  
  
  emptyTextObject = (() => {
    let temp = {
      type: "text",
      text: {}
    }
    for (let lang in this.langService.languages) {
      let curLang = this.langService.languages[lang]
      temp.text[curLang] = "title_" + curLang + ""
    }
    return temp
  })()

  galleryItemData: object = {
    key: "",
    displayID: 0,
    title: {},
    width: 400,
    height: 500,
    imageUrl: ""
  };

  constructor(private db:AngularFireDatabase,
  private broadcaster : Broadcaster,
  public langService : LanguagesService)   
  {
    
  }


  // myFunc(){
  //   console.log("my function !!!!");
  // }


  deleteBreakLines(data : any){
    console.log(typeof data);
    if(typeof data === "object"){
      
      for (let item in data) {
        
        let textValue = data[item];
        let converted = textValue.replace(/\n/g, "")
        data[item] = converted;
      }  
    }else if (typeof data === "string"){
      data = data.replace(/\n/g, "")
    }
    
    return data;
  }

  convertTabsToSpaces(data: any) {
    console.log(typeof data);
    if (typeof data === "object") {

      for (let item in data) {
        let textValue = data[item];
        console.log(textValue);
        let converted = textValue.replace(/\t/g, "")
        data[item] = converted;
      }
    } else if (typeof data === "string") {
      data = data.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
    }

    return data;
  }

  saveFirebaseDataToJSON( fileName: string, dataPath : string, orderByChild: string = undefined, downloadFile : boolean = false){
    let promise : any;
    if( orderByChild === undefined){

      // console.log("not ordered by child ", orderByChild);
      promise = this.db.database.ref("/").child(dataPath).once("value")
    }else{
      console.log("order by child ", orderByChild);
      
      promise = this.db.database.ref("/").child(dataPath).orderByChild(orderByChild).once("value")
      // console.log(promise);
    }

    promise.then((snapshot) => {
        // this.galleryJsonData = 
        // console.log(snapshot.val());
        
        let data = JSON.stringify(snapshot.val());
        
        // console.log("_______data to save_______");
        let formData = new FormData();
        formData.append("jsonString" , data)
        formData.append("fileName" , fileName)
        // console.log(data)

          $.ajax({
            url: "assets/php/admin/saveFirebaseDataToJSON.php",
            type: "POST",
            data: formData,
            contentType: false,
            dataType: 'json',
            processData: false,
            success: (phpResponse) => {
              console.log(phpResponse);
              if(phpResponse.type === "success"){
                this.broadcaster.broadcast("successNotification", phpResponse.message)

                if(downloadFile){
                  let ev = new CustomEvent("backupFileSavedEvent", { detail: phpResponse.message  });
                  window.dispatchEvent(ev);
                }
                // window.dispatchEvent( new Event("backupFileSavedEvent", {bubbles:true}))

              } else if (phpResponse.type === "error"){
                this.broadcaster.broadcast("errorNotification", "An error occured")
              }
              // console.log('data successfully saved');
            },
            error: (data) => {
              console.log(data);
              // console.log('data successfully saved');
            },

          })        
      })
  }

  loadSiteDataFromDB(){
   
    let prom =  this.db.database.ref().child('/site-data').once('value');
    return prom;
  }

  getSiteDataToJSON(){
    let data2 = this.db.database.ref("/").child("site-data").once("value")
      .then( (snapshot) =>{
        this.siteJsonData = JSON.stringify(snapshot.val());
        this.saveSiteDataToJSON();        
      })

  }

  saveSiteDataToJSON(){

    let formData = new FormData();
    formData.append("jsonString", this.siteJsonData);

    $.ajax({
      url: "assets/php/admin/saveSiteDataToJSON.php",
      method: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: (data) => {
        // console.log("data saved success");
        // console.log(data);
        // this.sendNotificationEvent.emit(data)        
        this.broadcaster.broadcast('successNotification', 'Data Saved');
      },

    })
  }
  
  loadGalleryDataFromDB(dataPath) {
    // return this.db.list("gallery").valueChanges();
    // return this.db.database.ref("gallery").orderByChild("displayID").once('value');
    return this.db.list(dataPath)
      .valueChanges()
      .map(items => items.sort((a: any, b: any) => { return a.displayID - b.displayID}));
    
  }

  saveGalleryDataToJSON(){
    let formData = new FormData();
    formData.append("jsonString", this.galleryJsonData);
    let dbData = this.db.list("gallery");

    $.ajax({
      url:"assets/php/admin/saveGalleryDataToJSON.php",
      type:"POST",
      data: formData,
      contentType: false,
      processData:false,
      success:(data) =>{
        // console.log(data);
        this.broadcaster.broadcast("successNotification", "Gallery Items Saved")
        // console.log('data successfully saved');
      },
      error: (data) => {
        console.log(data);
        // console.log('data successfully saved');
      },      

    })
  }

  getGalleryDataAsJSON(){

    let data2 = this.db.database.ref("/").child("gallery").orderByChild("displayID").once("value")
      .then((snapshot) => {
        // this.galleryJsonData = 
      
          this.galleryJsonData = JSON.stringify(snapshot.val());
          this.saveGalleryDataToJSON();
        
        
      })
  }
  
  addGalleryItem(event) {

    event.preventDefault();
    this.db.database.ref("/").child('gallery').once("value", (snapshot)=>{
      console.log(snapshot.numChildren());     
      let key = this.db.database.ref("/").child('gallery').push().key;

      let updates: object = {};
      this.galleryItemData["key"] = key;
      this.galleryItemData["title"] = this.emptyTextObject
      this.galleryItemData["displayID"] = snapshot.numChildren();
      updates["/gallery/" + key] = this.galleryItemData;

      this.db.database.ref("/").update(updates);
      // console.log(key);   

    })
  }

  getGalleryItemData(key){
    let prom = this.db.database.ref().child('gallery').child(key).once('value');    
    return prom;
  }

  updateGalleryItemData(key, data){
    this.db.database.ref().child("gallery").child(key).update(data)
  }

  deleteGalleryItem(key){
    // event.preventDefault();
    this.db.database.ref('gallery').child(key).remove();

  }

  loadSlidersFromDB(){
    return this.db.list("/sliders").valueChanges();
  }
  loadSliderDataFromDB(sliderKey : string) {
    
    let data = this.db.database.ref("/sliders").child(sliderKey).once('value')
    let slides = this.db.list("/sliders/"+sliderKey+"/slides").valueChanges()
    .map( item => { return item.sort( (a : any ,b : any)=> { return a.displayID-b.displayID})})
    return [data, slides]
  }
  
  addSlider(){
    let emptySliderData = {
      name : "default_name",
      slides : []
    }
    let ref = this.db.database.ref("/sliders").push(emptySliderData)

    let update = emptySliderData
    update["key"] = ref.key;
    ref.update(update);

    console.log(ref);
  }

  deleteSlider(sliderKey){
    this.db.database.ref("/sliders").child(sliderKey).remove()
  }
  addSlideToSlider(sliderKey : string){
    event.preventDefault();
    this.db.database.ref("/").child('sliders/'+sliderKey).once("value", (snapshot) => {
      console.log(snapshot.numChildren());
      let key = this.db.database.ref("/").child('sliders/' + sliderKey).push().key;

      let updates: object = {};
      this.galleryItemData["key"] = key;
      this.galleryItemData["title"] = this.emptyTextObject
      this.galleryItemData["displayID"] = snapshot.numChildren();
      updates['sliders/' + sliderKey+"/slides/"+key] = this.galleryItemData;

      this.db.database.ref("/").update(updates);
      // console.log(key);   

    })
  }
  deleteSliderSlide(sliderKey : string , slideKey : string){
      console.log(sliderKey, slideKey);

      this.db.database.ref("/sliders/").child(sliderKey).child("slides").child(slideKey).remove()
      
  }

  updateSliderName(sliderKey, sliderName){
    this.db.database.ref("/sliders").child(sliderKey).update({ name: sliderName});
  }
  updateSliderSlideData(sliderKey, slideKey, slideData){

    console.log("updating :", sliderKey);
    console.log("with :", slideData);
    
    this.db.database.ref("/sliders/"+sliderKey+"/slides/"+slideKey+"").update(slideData);
  }

  loadUploadsDataFromDB(){
    return this.db.list("uploads")
      .valueChanges()
      .map(items => items.sort((a: any, b: any) => { return a.unix_time - b.unix_time }));
  }

  loadHomeDataFromDB(){
    let prom = this.db.database.ref().child('/home-data').once('value');
    return prom;
  }

  loadHomeDataFromDB2(){
    let homeData = this.db.list("/home-data")
    
    return homeData.valueChanges()
      //.map(items => items.sort((a: any, b: any) => { return a.displayID - b.displayID }));
  }


  updateServiceBoxesItemData(id:number, title:object, text:object, icon: any = undefined){

    console.log("-------------------updateServiceBoxesItemData-------------------")
    let newData = {
      title: title,
      icon: icon,
      text: text
    }

    console.log(newData); 
    let child = this.db.database.ref().child("home-data/serviceBoxes/"+id.toString());
    // console.log(child);

    if (icon === undefined) {
      // console.log("ICONE is undefined !!!!!");
      child.child("icon").once("value", (snapshot)=>{
        newData.icon = snapshot.val()
        if(newData.icon === null){
          newData.icon = "aaa";
        }
        child.update(newData) 
        // console.log(newData.icon);  
      })
    } else{
      child.update(newData)    
    }
  }

  getServiceBoxesDataAsJSON() {

    let data2 = this.db.database.ref("/").child("home-data/serviceBoxes").orderByChild("displayID").once("value")
      .then((snapshot) => {
        // this.galleryJsonData = 
        
        let data = JSON.stringify(snapshot.val());
        this.saveServiceBoxesDataToJSON(data);

      })
  }

  saveServiceBoxesDataToJSON(jsonData) {
    let formData = new FormData();
    formData.append("jsonString", jsonData);
    // let dbData = this.db.list("home-data/serviceBoxes");

    $.ajax({
      url: "assets/php/admin/saveServiceBoxesDataToJSON.php",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: (data) => {
        console.log(data);
        this.broadcaster.broadcast('successNotification', 'Boxes Data Saved Boxes Data Saved Boxes Data Saved');
      },
      error: (data) => {
        // console.log(data);
        console.log('error saving data');
      },

    })
  }

  overwriteDatabase(jsonData){

    console.log("function activated for now")
    console.log(jsonData);
    console.log(JSON.parse(jsonData));
    this.db.database.ref("/").set(JSON.parse(jsonData)).then(()=>{
      this.getGalleryDataAsJSON();
      this.getServiceBoxesDataAsJSON();
      this.getSiteDataToJSON();
      this.getHomeTextDataAsJSON();
    })
  }

  generateEmptyLangData(){
    let items = {};
    for( let key in this.langService.languages){
      let curLang = this.langService.languages[key]
      items[curLang] = "text_"+curLang;
    }
    return items
  }

  addHomeTextItem(){
    let obj = {
      key: '',
      displayID : 0,
      type :'text',
      tagName: "default_tag",
      text: this.generateEmptyLangData()
    }

    let prom = this.db.database.ref("/home-data/home-text").once('value').then((snapshot)=>{
      let key = this.db.database.ref("/home-data/home-text").push().key
      console.log(key);
      obj.key = key;
      obj.displayID = snapshot.numChildren()
      let updates: object = {};
      updates["/home-data/home-text/" + key] = obj;

      this.db.database.ref("/").update(updates);            
    })   
  }

  loadHomeTextFromDB() {
    return this.db.list("/home-data/home-text")
    .valueChanges()
    .map(item => {
       item.sort((a : any, b :any )=>{
         return a.displayID - b.displayID
       }) 
       
       return item
    });

      // .map(items => items.sort((a: any, b: any) => { return a.displayID - b.displayID }));
  }

  updateHomeTextItem(type, tagName, values, key, displayID) {

    // if(displayID === undefined){
    //   displayID = -1
    // }
    // console.log("-------------------updateServiceBoxesItemData-------------------")
    let obj = {
      type : type,
      displayID: displayID,
      key: key,
      tagName: tagName,
      text: values
    }

    // console.log(obj);
    let child = this.db.database.ref().child("home-data/home-text/");
    // console.log(child);
    let updates: object = {};
    updates["/home-data/home-text/" + obj.key] = obj;

    // console.log(updates)
    this.db.database.ref("/").update(updates); 

    
  }

  deleteHomeTextItem(itemKey){

    this.db.database.ref("/home-data/home-text").child(itemKey).remove()
  }
  getHomeTextDataAsJSON() {

    let data2 = this.db.database.ref("/").child("home-data/home-text").once("value")
      .then((snapshot) => {
        // this.galleryJsonData = 

        let data = JSON.stringify(snapshot.val());
        this.saveHomeTextDataToJSON(data);


      })
  }

  saveHomeTextDataToJSON(jsonData) {
    let formData = new FormData();
    formData.append("jsonString", jsonData);
    // let dbData = this.db.list("home-data/serviceBoxes");

    $.ajax({
      url: "assets/php/admin/saveHomeTextDataToJSON.php",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: (data) => {
        console.log(data);
        this.broadcaster.broadcast('successNotification', 'Home Text Data saved');
      },
      error: (data) => {
        // console.log(data);
        console.log('error saving Home data');
      },

    })
  }  


  backupDataBase(){

    let padZeros = (num : number, data : any) : string =>{
      let str = data.toString();
      let returnStr = "";
      if( str.length < num){
        for (let i = 0; i < num - str.length; i++) {
          
          returnStr += "0"
          
        }


      }

      returnStr += str;
      return returnStr
    }

    console.log(padZeros(4,12));
    
    let data = this.db.database.ref("/").once("value", (snapshot)=>{
      let jsonData = JSON.stringify(snapshot.val());
      let formData = new FormData();
      let date = new Date();

      let backupFileName = 
        "backup_database__" + 
        padZeros(4,date.getFullYear()) + "_" + 
        padZeros(2,date.getMonth()) +"_"+
        padZeros(2,date.getDate()) +"__"+
        padZeros(2,date.getHours()) +"h_"+
        padZeros(2,date.getMinutes()) +"m_"+
        padZeros(2,date.getSeconds())+"s.json"
      console.log(backupFileName)

      this.saveFirebaseDataToJSON("backup/"+backupFileName,"/", undefined, true);
      

    })
  }

  downloadDataBasBackup(fileName){
    window.location.replace('assets/php/admin/downloadBackupFile.php?fileName='+fileName+'');
  }

  saveAll(){
    this.getGalleryDataAsJSON();
    this.getServiceBoxesDataAsJSON();
    this.getSiteDataToJSON();
    this.getHomeTextDataAsJSON();
    this.saveFullHomeDataToJSON();

      // console.log("save all");
      
    this.saveFirebaseDataToJSON('slidersData.json', "/sliders");
  }

  saveFullHomeDataToJSON(){
    this.saveFirebaseDataToJSON("homeFullData.json","home-data");
  }

  loadPresentationTextFromDB(){ 
    return this.db.database.ref("/home-data/presentationText/text").once('value')
  }
  savePresentationTextToDB(textData){
    this.deleteBreakLines(textData.text);
    this.convertTabsToSpaces(textData.text);
    this.db.database.ref("/home-data").child("presentationText").set(textData)
  }


}
