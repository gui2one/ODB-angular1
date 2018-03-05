import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';

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
import { ElementRef } from '@angular/core/src/linker/element_ref';
@Component({
  selector: 'app-gallery-manager',
  templateUrl: './gallery-manager.component.html',
  styleUrls: ['./gallery-manager.component.scss'],

})
export class GalleryManagerComponent implements OnInit{

  bLoggedIn: boolean = false;
  bShowImageManager : boolean = false;
  galleryDBData : Observable<any>;
  galleryItems : Array<object> = []

  bDisplayEditDialog : boolean = false;

  bOldDisplayEditDialog : boolean = this.bDisplayEditDialog;

  bDisplayUploadsDialog : boolean = false;
  modalRef: BsModalRef;

  uploadsModalRef : BsModalRef;

  selectedImageUrl : string = '';

  @ViewChild('template')
  templateRef: TemplateRef<any>;

  @ViewChild('editGalleryItemTemplate')
  editItemTemplate: TemplateRef<any>;

  @ViewChild('uploadsDialogTemplate')
  uploadsDialogTemplate: TemplateRef<any>;

  deleteCandidate: string;
  deleteCandidateKey: string;

  editCandidateKey : string;

  editItemData : Object;

  // galleryItemData: object = {
  //   key: "",
  //   title: "title",
  //   width: 400,
  //   height: 500
  // };

  message: boolean = false;
  constructor(
    private authService: AuthService, 
    private db: AngularFireDatabase, 
    private OdbAdminData : OdbAdminDataService,
    private modalService : BsModalService,
    private vcRef: ViewContainerRef,
    // public sortable : sortable
  ) 
  { 

    
  }
  
  ngOnInit() {

    
    this.bLoggedIn = localStorage.getItem('ODB_connected') == 'true' ? true : false;

    this.galleryDBData = this.OdbAdminData.loadGalleryDataFromDB();
    
    // this.OdbAdminData.loadGalleryDataFromDB().then( (snapshot) =>{
    //   this.galleryDBData = snapshot.toJSON();

    //   for( let item in this.galleryDBData){
    //     this.galleryItems.push( this.galleryDBData[item] )
    //   }

    //   console.log(this.galleryItems);
    // });

  }
  
  ngAfterViewInit(){    
    
    let dummy_variable = sortable; /// VERY STRANGE !! dont remove this line or the sortable jquery-ui function won't work ....
    let dummy_variable2 = draggable; /// VERY STRANGE !! dont remove this line or the sortable jquery-ui function won't work ....
    // console.log($("#items-wrapper"))
    $(".gallery-item").each( (item)=>{
      item.draggable();
    });
    $("#items-wrapper").sortable({
      start:function(event,ui){
        console.log(event);
      },
      stop: function(event, ui){
        let keysArray = [];
        console.log(event);
        $("#items-wrapper .gallery-item").each( function(i,el){
          keysArray.push(el.id);
          // console.log(el.id);
        })

        keysArray.forEach((element, index) => {
          // console.log(this.db);
          this.db.database.ref("/gallery").child(element).update({displayID:index})
        });
      }.bind(this)
    });
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
  
  onClickEdit(event, key){
    event.preventDefault();
    // event.stopPropagation();

    //console.log(key);
    this.editCandidateKey = key;

    // console.log(this.galleryDBData.filter(key));
    let prom = this.OdbAdminData.getGalleryItemData(key);
    
    prom.then( (snapshot) =>{
      // console.log(snapshot.toJSON());
      this.editItemData = snapshot.toJSON();
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
    this.editItemData['title'] = $('#edit-form')[0]['item-title'].value;

    if(this.selectedImageUrl !== ""){

      this.editItemData['imageUrl'] = this.selectedImageUrl;
    }
    // reset imageUrl param to none
    this.selectedImageUrl ='';
    let data = {};
    this.OdbAdminData.updateGalleryItemData(this.editCandidateKey, this.editItemData);

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
  addGalleryItem(event) {
    event.preventDefault();
    this.OdbAdminData.addGalleryItem(event);
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
    this.OdbAdminData.deleteGalleryItem(this.deleteCandidateKey);
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
    // this.OdbAdminData.saveGalleryDataToJSON();
    this.OdbAdminData.getGalleryDataAsJSON();
  }


}
