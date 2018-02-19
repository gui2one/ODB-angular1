import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import { AngularFireAction } from 'angularfire2/database/interfaces';

import * as jQuery from 'jquery';
import { messaging } from 'firebase';
import { INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser/src/browser';

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgTemplateOutlet } from '@angular/common/src/directives/ng_template_outlet';
import { format } from 'util';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.css'],
  // providers: [ BsModalService]
})

export class ImageManagerComponent implements OnInit, AfterViewInit {
  @HostListener('dragover', ['$event']) onDragOver(event){
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = event.dataTransfer.files;
    //this.uploadFile(null,files);
  }  
  
  @Input()
  bShowHeader : boolean = true;
  holder : any;

  modalRef: BsModalRef;

  @ViewChild('template')
  templateRef: TemplateRef<any>

  deleteCandidate : string;
  deleteCandidateKey : string;

  @Output()
  selectedItem:string;
  @Output() selectedEvent = new EventEmitter<(string)>();
  @Output()
  selectedItemKey:string;

  @Input() bLoggedIn: boolean = false;
  @Output() eventEmitter =  new EventEmitter<(boolean)>();

  errorLogDiv : any;
  message : boolean = false;

  bFilterImages : boolean = true;
  dirData : any;
  imageUrls: Array<string> = []; 

  constructor(private db: AngularFireDatabase,
              private modalService: BsModalService) { }

  ngOnInit() {
    // console.log(this.errorLogDiv[0]);
    this.bLoggedIn = localStorage.getItem('ODB_connected') == 'true' ? true : false;
  }

  ngAfterViewInit(){
    this.errorLogDiv = jQuery(document.getElementById("errorLog"));
    this.holder = document.getElementById("holder");
    if (this.bLoggedIn) {

      this.readDirContent();
      // console.log(this.holder);
      this.holder.addEventListener("drop", (event) => {
        event.preventDefault();
        event.stopPropagation();
        // console.log(event);
        let files = event.dataTransfer.files;
        this.uploadFile(null, files);
        jQuery(this.holder).removeClass("hover");
      });
      this.holder.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.stopPropagation();
        // console.log("dragover");
        jQuery(this.holder).addClass("hover");
      });

      this.holder.addEventListener("dragleave", (event) => {
        event.preventDefault();
        event.stopPropagation();
        // console.log("dragleave");
        jQuery(this.holder).removeClass("hover");
      });
    }
  }
  openModal(template: TemplateRef<any>){

    this.modalRef = this.modalService.show(template);    
  }

  confirmDelete(event){
    event.preventDefault();
    event.stopPropagation();
    console.log(event)
    this.removeFile(this.deleteCandidate);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
  


  uploadFile(event = null, files = null) {
    let formData: any;
    // console.log(files);
    if(event != null){
      event.preventDefault();
      let form = jQuery(document.getElementById('uploadForm'))[0];
      formData = new FormData(form);

    }else{
      // console.log("not an event !!! ");     

      // console.log(files);
      formData = new FormData();


      for(let i=0; i< files.length; i++){
        formData.append( files[i].name, files[i]);
      }

    }


    jQuery.ajax({
      type: "POST",
      url: "assets/php/upload.php",
      data: formData,      
      contentType: false,
      processData: false,
      success: (data) => {
        console.log(data);
        if (data) {
          let jsonData;
          console.log("data -->");
          console.log(data);
          try{

            jsonData = JSON.parse(data);
            // console.log("LENGTH  : \n"+jsonData.length);
          }catch(e){
            console.log(e);
          }

          for(let i=0; i< jsonData.length; i++){
            let dat = JSON.parse(jsonData[i]);
            if (dat.success) {
              this.showLogInfos("success", dat.success.msg);
              let fileInput = jQuery(document.getElementById("fileInput"))[0];
              fileInput.value = "";
              this.addUploadToDB(dat.success);
              
            }else if (dat.error) {
              // console.log(jsonData[i].error.msg);
  
              this.showLogInfos('error', dat.error.msg);
            }

          }

          this.readDirContent();
        } else {
          console.log("no data");
        }

        // console.log(jsonData);

      },
      error: (err) => {
        console.log("error !");
        //console.log(this.errorLogDiv); 
        this.errorLogDiv[0].innerHTML = err.responseText;

      }
    })
  }

  onDeleteClick(event, item){
    this.deleteCandidate = item
    console.log(item);
    this.openModal(this.templateRef);
  }
  onItemClick(event,item){
    
    // don't know why but I have to use function() instead of arrow function => for thr each function to know about 'this'
    jQuery('.item-container').each(function(){

      jQuery(this).removeClass("selected");
    })

    jQuery(event.target).addClass("selected");

    this.selectedItem = item;
    this.selectedEvent.emit(item);
    
    //this.removeFile(event.target.src);
  }
  removeFile(fileName){

    // event.preventDefault();

    let formData = new FormData();
    formData.append('fileName',fileName);

    jQuery.ajax({
      url:'assets/php/admin/removeUploadedFile.php',
      type:'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: (data)=>{
        // console.log(data);
        this.deleteUploadFromDB(this.deleteCandidate);
        this.readDirContent();
      },
      error: (err)=>{
        console.log("error !!!");
        console.log(err);
      }

    });
  }
  receiveMessage(event){
    // console.log(event);
    this.message = event;
    this.bLoggedIn = this.message;  
    if(this.bLoggedIn) {
      this.readDirContent();

 
    }
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

  readDirContent(){
    console.log("readContentDir function");
    let formData = new FormData();
    
    jQuery.ajax({
      type: "POST",
      url: "assets/php/admin/readUploadsDir.php",
      data: formData,
      success: (data) => {
        try{

          console.log(data);
          this.dirData = JSON.parse(data);
          this.filterImages();
          
        } 
        catch(e){
          console.log(e);
        }
        // console.log(this.dirData.length);
      },
      contentType: false,
      processData: false
    })
  }

  filterImages(){
    if(this.bFilterImages){
      this.imageUrls = [];
      // console.log(this.dirData)
      this.dirData.forEach(element => {
        let ext = element.split(".").pop().toLowerCase();
        if(ext === "jpg" || ext === "jpeg"){
          this.imageUrls.push(element);
        }
      });
    }else{
      this.imageUrls = this.dirData;
    }
  }

  deleteUploadFromDB(deleteCandidate){
    deleteCandidate = deleteCandidate.replace("_thumbnail","");
    // console.log(deleteCandidate);
    deleteCandidate = deleteCandidate.split("/").pop()
    // console.log(deleteCandidate);
    const uploadsRef = this.db.database.ref().child("uploads");
    
    let ret = uploadsRef.orderByChild("fileName").equalTo(deleteCandidate).on("child_added", (snapshot)=>{
      let k = snapshot.key;
      // console.log(snapshot.key);
      this.reallyDelete(k);
    });
    //console.log(this.deleteCandidateKey);
  }

  reallyDelete(key : any){
    const uploadsRef = this.db.database.ref().child("uploads");

    let ret = uploadsRef.child(key).remove();
  }

  addUploadToDB(data:any){
    // console.log(data.fileName);
    let emptyUploadsData: object = {
      fileName: data.fileName,
      fileSize: data.fileSize,
      width: data.width,
      height: data.height
    }    
    let key = this.db.database.ref("/uploads").push(emptyUploadsData).key;
    this.readDirContent();
  }


  
}
