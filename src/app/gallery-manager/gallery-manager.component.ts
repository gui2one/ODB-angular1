import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { trigger, state, style, transition, animate, AnimationBuilder } from '@angular/animations';

import { AuthService } from '../providers/auth.service.ts.service'
import { Observable } from 'rxjs/Observable'
import { OdbAdminDataService } from "../providers/odb-admin-data.service"
import {AngularFireDatabase} from 'angularfire2/database'
import { AngularFireList } from 'angularfire2/database/interfaces';

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as $ from 'jquery';
import {sortable, draggable} from 'jquery-ui/ui/widgets/sortable';
// import { ElementRef } from '@angular/core/src/linker/element_ref';
import { LanguagesService } from '../providers/languages.service';
import { SaveStateService } from '../providers/save-state.service';
import { AdminCollapseComponent } from '../admin-collapse/admin-collapse.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-gallery-manager',
  templateUrl: './gallery-manager.component.html',
  styleUrls: ['./gallery-manager.component.scss'],

})
export class GalleryManagerComponent implements OnInit{

  bLoggedIn: boolean = false;
  bShowImageManager : boolean = false;

  galleryDBData : Observable<any>;

  slidersDBData: Observable<{}[]>;

  currentSliderData : object;
  currentSliderData2  : Observable<any[]>;
  currentSliderID  : number;
  currentSlides : Observable<any[]>;


  slidersArray: Array<any> = [];
  slidesArray: Array<any> = [];


  galleryItems : Array<object> = []

  bDisplayEditDialog : boolean = false;

  bOldDisplayEditDialog : boolean = this.bDisplayEditDialog;

  bDisplayUploadsDialog : boolean = false;
  modalRef: BsModalRef;

  uploadsModalRef : BsModalRef;

  selectedImageUrl : string = '';

  tempEditTitleTextData : object = {};

  @ViewChild('template')
  templateRef: TemplateRef<any>;

  @ViewChild('editGalleryItemTemplate')
  editItemTemplate: TemplateRef<any>;

  @ViewChild('uploadsDialogTemplate')
  uploadsDialogTemplate: TemplateRef<any>;

  @ViewChild("slidesWrapper") slidesWrapper : ElementRef;
  @ViewChildren("sliderCollapse") sliderCollapses : QueryList<AdminCollapseComponent>;

  @ViewChild("testModal") testModal: ConfirmModalComponent;

  deleteCandidate: string;
  deleteCandidateKey: string;

  editCandidateKey : string;

  editItemData : Object;


  message: boolean = false;
  constructor(
    private authService: AuthService, 
    private db: AngularFireDatabase, 
    private dataService : OdbAdminDataService,
    private modalService : BsModalService,
    public langService : LanguagesService,
    private saveState : SaveStateService,

  ) 
  { 

    
  }
  
  ngOnInit() {

    
    // this.bLoggedIn = localStorage.getItem('ODB_connected') == 'true' ? true : false;

    this.galleryDBData = this.dataService.loadGalleryDataFromDB("gallery");  
    this.reloadSlidersData();

    console.log(this.galleryDBData);

    // this.saveState.addSaveSet(this, 'sliderCollapses',['collapsed']);

    

  }
  
  reloadSlidersData(){
    console.log("reloading slider data_____________");
    
    this.slidersArray = [];
    this.slidersDBData = this.dataService.loadSlidersFromDB();
  
  }
  getKeys(obj : object) : Array<string>{

    let keys : Array<string> = [];
    
    for( let key in obj){
      let curValue = obj[key];
      keys.push(key);
    }
    return keys
  }
  ngAfterViewInit(){    
    
    let dummy_variable = sortable; /// VERY STRANGE !! dont remove this line or the sortable jquery-ui function won't work ....
    // let dummy_variable2 = draggable; /// VERY STRANGE !! dont remove this line or the sortable jquery-ui function won't work ....

    
    this.slidersDBData.forEach((item) => {
    
      item.forEach(( item2 , id)=>{
        if (id === this.currentSliderID){    
          this.onChooseSlider(item2["key"], this.currentSliderID)
        }        
      })
    })    
  }

  receiveMessage(event) {
    this.message = event;
    this.bLoggedIn = this.message;
    //localStorage.setItem('ODB_connected', 'true');
    // console.log(localStorage);    
  }

  logOut(event) {
    // console.log("log out ????");
    this.authService.logOut();
    this.bLoggedIn = false;
    //localStorage.setItem('ODB_connected', 'false');
  }

  imageSelected(event){
    // console.log("selected Event !!!")
    // console.log(event)
    this.selectedImageUrl = event;
    this.editItemData['imageUrl'] = this.selectedImageUrl;
  }

  onDragStart(event, displayID){
    event.preventDefault();
    // console.log(event.target);
    // console.log(displayID);

  }

  onTouchMove(event, displayID){
    event.preventDefault();
    console.log(event)
  }
  
  onSlideClickEdit(event, slideData = undefined, sliderKey = undefined){
    
    // console.log("gggg",event);
    
    // console.log(slideData)
    // console.log(sliderKey)

    this.editCandidateKey = slideData.key;
    this.editItemData = slideData;
    this.editItemData["sliderKey"] = sliderKey;
    this.tempEditTitleTextData = slideData.title
    this.bDisplayEditDialog = true;

    $('#main-wrapper').addClass('blur');    
  }


  onClickEdit(event, key){
    event.preventDefault();
    // event.stopPropagation();

    //console.log(key);
    this.editCandidateKey = key;

    // console.log(this.galleryDBData.filter(key));
    let prom = this.dataService.getGalleryItemData(key);
    
    prom.then( (snapshot) =>{
      // console.log(snapshot.toJSON());
      this.editItemData = snapshot.toJSON();
      this.tempEditTitleTextData = this.editItemData["title"];
      this.bDisplayEditDialog = true;   

      $('#main-wrapper').addClass('blur');

    })

    
  }

  ngAfterViewChecked(){
    if(this.bOldDisplayEditDialog !== this.bDisplayEditDialog){
      // console.log("DO CHECK");


      $("#edit-dialog").css({ left : -50, opacity:0.0});
      $("#edit-dialog").animate({left : 0, opacity:1.0});

      //$('#edit-dialog').css({ left: 0, opacity:1.0});
      //$('#edit-dialog').addClass("animate-in");
      this.bOldDisplayEditDialog = this.bDisplayEditDialog;

    }

  }

  ngAfterContentInit()
  {
    // console.log("After Content Init");
  }


  onAddSliderClick($event){
    this.saveState.save();
    this.dataService.addSlider();
    // this.reloadSlidersData();
    // setTimeout(() => {
    //   console.log(this.saveState)
    //   this.saveState.restore();
    // }, 500);
  }

  onChooseSlider(sliderKey : string, id : number){
    console.log(sliderKey);
    let loadedVal : Array<any> = this.dataService.loadSliderDataFromDB(sliderKey)
    console.log(loadedVal[0]);
    
    if (id === undefined){
      this.currentSliderID = 0;
      console.log('just initialized currentSlide ID');
      
    }else{
      this.currentSliderID = id;
      
    }
    console.log("this.currentSliderID --->", this.currentSliderID);
    loadedVal[0].then((snapshot)=>{
      this.currentSliderData2 = snapshot.toJSON()
    });
    
    this.currentSlides = loadedVal[1]

    this.currentSlides.forEach((val)=>{

      // console.log(this.slidesWrapper)
      $(this.slidesWrapper.nativeElement).sortable({
        start : function(event){
          console.log(event);
          
        },stop : function(event){

              event.target.querySelectorAll(".gallery-item").forEach((galleryItem, id2) => {
                let sliderKey = galleryItem.getAttribute("data-slider-key");
                let slideKey = galleryItem.getAttribute("id");
                console.log(sliderKey, id2);
                console.log(galleryItem);
                this.db.database.ref("/sliders/" + sliderKey + "/slides/").child(slideKey).update({ displayID: id2 })
              })
        }.bind(this)
      })
    })
    
    
    


    
    
    // this.dataService.loadSliderDataFromDB(sliderKey).then((snapshot)=>{

    //   this.currentSliderData = snapshot.toJSON();
    //   console.log(snapshot.toJSON());
      
    // });
  }

  onModalDecide(event){
    console.log(event);
    
  }

  
  onAddSlideClick(sliderKey){
    console.log(sliderKey);
    
    if(sliderKey !== undefined){

      this.dataService.addSlideToSlider(sliderKey);
      this.reloadSlidersData();
    }

    
  }
  newSlideClick(){
    console.log("ggggggggggggggggg");
    
  }

  onEditSliderNameClick(event){
    console.log(event);
    
    $("#slider_title_field").attr("contenteditable","true")
    $("#slider_title_field").addClass("title-editing")  
  }

  validateSliderTitle(event, sliderKey){
    if(event.type === "keypress"){
      if(event.code === "Enter"){

        event.stopPropagation();
        console.log(sliderKey);
        console.log(event.type);
        let sliderName = event.target.innerHTML;
        event.target.setAttribute("contenteditable", "false");
        event.target.classList.remove("title-editing"); 

        //// keep only alpha numeric characters and underscores
        sliderName = sliderName.replace(/([^A-Za-z0-9_])( *)/g ,"_")
        this.dataService.updateSliderName(sliderKey, sliderName)


        let loadedVal: Array<any> = this.dataService.loadSliderDataFromDB(sliderKey)
        console.log(loadedVal[0]);
        loadedVal[0].then((snapshot) => {
          this.currentSliderData2 = snapshot.toJSON()
        });
        console.log(event);
      }
    }

    
 
  }

  getSlides(slidesObject) : Array<any>{
    
    let arr = [];
    
    
    for(let key in slidesObject){
      let curSlide  = slidesObject[key];
      let obj = {
        key : curSlide.key,
        displayID : curSlide.displayID,
        url : curSlide.imageUrl
      }
      arr.push(obj)
    }

    return arr.sort( (a, b)=> { return a.displayID - b.displayID})
    // return arr
  }
  declineEdit(event){
    // console.log($('#edit-dialog'));
    this.bDisplayEditDialog = false;
    $('#main-wrapper').removeClass('blur');
    
  }


  confirmEdit(event){
    
    event.preventDefault();
    event.stopPropagation();

    $('#main-wrapper').removeClass('blur');
    // this.modalRef.hide();
    // console.log("editing item -->"+ this.editCandidateKey);
    // console.log($('#edit-form')[0]['item-title'].value);

    // this.editItemData['title_fr'] = $('#edit-form')[0]['item-title-fr'].value;
    // this.editItemData['title_en'] = $('#edit-form')[0]['item-title-en'].value;

    this.editItemData["title"] = this.tempEditTitleTextData;
    
    if(this.selectedImageUrl !== ""){

      this.editItemData['imageUrl'] = this.selectedImageUrl;
    }
    // reset imageUrl param to none
    this.selectedImageUrl ='';
    let data = {};

    // this.dataService.updateGalleryItemData(this.editCandidateKey, this.editItemData);

    console.log("selected slider -->", this.currentSliderData2);
    
    this.dataService.updateSliderSlideData(this.editItemData["sliderKey"], this.editItemData["key"],this.editItemData)
    this.bDisplayEditDialog = false;


  }

  onKeyPress(event) {
    // console.log(event.key);
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();


      // console.log("enter");
      // this.confirmEdit(event);
    }
  }
  
  onClick(event, key) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(key);
    this.deleteCandidateKey = key;
    // console.log(this.deleteCandidate);
    
    this.openModal(this.templateRef);
    //this.removeFile(event.target.src);
  }  

  onDeleteClick(event, sliderKey, slideKey){
    event.stopPropagation();
    this.testModal.show("Confirm Delete ?", "yes", "no", this.dataService.deleteSliderSlide.bind(this), sliderKey, slideKey)
  }
  
  onTouchTap(event){
    // location.reload();
    // event.preventDefault();
    // event.stopPropagation();
    let target = $(event.currentTarget);
    // console.log(target)
    target[0].draggable = true;
    console.log(target[0].draggable)

    target.trigger("drag");
    target.css({
      border : "2px solid red"
    })
  }
  addGalleryItem(event) {
    event.preventDefault();
    this.dataService.addGalleryItem(event);
  }

  deleteGalleryItem(key){
    // console.log(key);
    event.preventDefault();
  }

  openUploadsDialog(event){
    event.preventDefault();
    this.bDisplayUploadsDialog = !this.bDisplayUploadsDialog;
    $('#edit-dialog').addClass('blur')
    // console.log($('#edit-dialog'));
  }

  closeUploadsDialog(event){
    event.preventDefault();
    this.bDisplayUploadsDialog = false;
    $('#edit-dialog').removeClass('blur')
  }

  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);
  }

  confirmDelete(event): void {
    // console.log("confirm delete")
    event.preventDefault();
    event.stopPropagation();
    this.dataService.deleteGalleryItem(this.deleteCandidateKey);
    this.modalRef.hide();
  }

  declineDelete(event): void {
    // console.log("decline delete")
    event.preventDefault();
    event.stopPropagation();
    this.modalRef.hide();
    this.bDisplayUploadsDialog = false;
  }  

  saveToSite(event){
    event.preventDefault();
    event.stopPropagation();
    // this.dataService.saveGalleryDataToJSON();
    this.dataService.getGalleryDataAsJSON();
  }

  onEditItemTitleEmitValues(textData){
    console.log(textData);
    this.tempEditTitleTextData = textData;
    
  }
}
