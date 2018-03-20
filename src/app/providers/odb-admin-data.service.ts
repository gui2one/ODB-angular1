import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable'
import * as $ from 'jquery'
import { Promise } from 'q';
import {Location} from '@angular/common'

import { Broadcaster } from "./broadcaster";

@Injectable()
export class OdbAdminDataService {

  // @Output() sendNotificationEvent : EventEmitter<any> = new EventEmitter<(any)>()

  galleryDBData : Observable<any[]>;
  galleryJsonData : any;
  siteJsonData :any;

  galleryItemData: object = {
    key: "",
    displayID: 0,
    title_fr: "title fr",
    title_en: "title en",
    width: 400,
    height: 500,
    imageUrl: ""
  };

  constructor(private db:AngularFireDatabase,
  private broadcaster : Broadcaster)   
  {
    
  }

  onInit(){
    this.broadcaster.broadcast('globalCountUpdate', 'I am your friend!');
  }

  myFunc(){
    console.log("my function !!!!");
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
        console.log(data);
        // this.sendNotificationEvent.emit(data)
        // this.broadcaster.broadcast('globalCountUpdate', 'admin notif !!!!');
        this.broadcaster.broadcast('successNotification', 'Data Saved');
      },

    })
  }

  
  loadGalleryDataFromDB() {
    // return this.db.list("gallery").valueChanges();
    // return this.db.database.ref("gallery").orderByChild("displayID").once('value');
    return this.db.list("gallery")
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
        console.log(data);
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


  loadUploadsDataFromDB(){
    return this.db.list("uploads")
      .valueChanges()
      .map(items => items.sort((a: any, b: any) => { return a.unix_time - b.unix_time }));
  }

  loadHomeDataToDB(){
    let prom = this.db.database.ref().child('/home-data').once('value');
    return prom;
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


  backupDataBase(){
    let data = this.db.database.ref("/").once("value", (snapshot)=>{
      let jsonData = JSON.stringify(snapshot.val());
      let formData = new FormData();
      formData.append("jsonString", jsonData);
      window.location.replace('assets/php/admin/downloadBackupFile.php?jsonString='+ jsonData+'');

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

  saveAll(){
    this.getGalleryDataAsJSON();
    this.getServiceBoxesDataAsJSON();
    this.getSiteDataToJSON();
    this.getHomeTextDataAsJSON();
  }

  addHomeTextItem(){
    let obj = {
      key: '',
      type :'text',
      tagName: "default_tag",
      text: {
        fr: "Texte Fr",
        en: "Hello"
      }
    }
    let prom = this.db.database.ref("/home-data/home-text").once('value').then((snapshot)=>{
      let key = this.db.database.ref("/home-data/home-text").push().key
      console.log(key);
      obj.key = key;
      let updates: object = {};
      updates["/home-data/home-text/" + key] = obj;

      this.db.database.ref("/").update(updates);            
    })   
  }

  loadHomeTextFromDB() {
    return this.db.list("/home-data/home-text")

      // .map(items => items.sort((a: any, b: any) => { return a.displayID - b.displayID }));
  }

  updateHomeTextItem(type, tagName, values, key) {

    console.log("-------------------updateServiceBoxesItemData-------------------")
    let obj = {
      type : type,
      key: key,
      tagName: tagName,
      text: values
    }

    console.log(obj);
    let child = this.db.database.ref().child("home-data/home-text/");
    // console.log(child);
    let updates: object = {};
    updates["/home-data/home-text/" + obj.key] = obj;

    console.log(updates)
    this.db.database.ref("/").update(updates); 

    
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
}
