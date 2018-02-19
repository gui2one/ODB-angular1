import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable'
import * as $ from 'jquery'
import { Promise } from 'q';
@Injectable()
export class OdbAdminDataService {

  galleryDBData : Observable<any[]>;
  galleryJsonData : any;
  siteJsonData :any;

  galleryItemData: object = {
    key: "",
    displayID: 0,
    title: "title",
    width: 400,
    height: 500,
    imageUrl: ""
  };

  constructor(private db:AngularFireDatabase) { 
    // this.galleryDBData = this.loadGalleryDataFromDB();
    // console.log(this.galleryDBData);

  }

  onInit(){

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
        console.log("data saved success");
        console.log(data);
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
      method:"POST",
      data: formData,
      contentType: false,
      processData:false,
      success:(data) =>{
        console.log('data successfully saved');
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
    this.db.database.ref().child('gallery').once("value", (snapshot)=>{
      console.log(snapshot.numChildren());
    

     
      let key = this.db.database.ref().child('gallery').push().key;

      let updates: object = {};
      this.galleryItemData["key"] = key;
      this.galleryItemData["displayID"] = snapshot.numChildren();
      updates["/gallery/" + key] = this.galleryItemData;

      this.db.database.ref().update(updates);
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


}
