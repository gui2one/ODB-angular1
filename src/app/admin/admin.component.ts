import { Component, OnInit, Input, OnChanges, SimpleChange, OnDestroy, HostListener} from '@angular/core';
//import { Output, Input } from '@angular/core/src/metadata/directives';
import { Router, Route, NavigationExtras } from '@angular/router';
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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


// @HostListener('window:unload', ['$event'])
// @NgModule({imports:[]})
export class AdminComponent implements OnInit {

  bGotData : boolean = false;

  siteDbData: any;
  bSiteOnline : boolean = false;
  dbData: Observable<any[]>;
  bLoggedIn : boolean = false;
  userEmail : string = "";

  bSideBarCollapsed : boolean;
  message : boolean = false;

  galleryData : object;
  dataBase: any = firebase.database();
  errorLogDiv : any; 

  constructor(
    public authService: AuthService, 
    private db : AngularFireDatabase, 
    private dataService : OdbAdminDataService,
    private router : Router) { }

  galleryItemData : object = {
    key:"",
    title:"title",
    width:400,
    height:500
  };

  ngOnChanges(change){
    console.log(change);
  }

  // onUnload(event){
  //   alert(event);
  //   this.authService.logOut();
  // }

  ngOnInit() {

    this.errorLogDiv = $(document.getElementById("errorLog"));
    this.authService.checkLoggedIn().subscribe((auth) =>{
      this.bLoggedIn = auth !== null;

      if(auth !== null){
        this.userEmail = auth.email;
        
      }
      this.bGotData = true;
    });



  }

  ngAfterViewChecked(){
    // console.log("view init");
    let content = $("#admin-content");
    content.css({ marginLeft: $("#side-bar-wrapper").width() })
  }

  onCollapse(event){
    if (event) {
      $("#side-bar-wrapper").addClass("collapsed");
    }else{
      $("#side-bar-wrapper").removeClass("collapsed");
    }

    window.dispatchEvent(new Event('resize'));

  }

  collapseSideBar(cond : boolean){

  }

  onResize(event){
    // console.log($("#side-bar-wrapper"));
    // let content = $("#admin-content");
    // content.css({ marginLeft: $("#side-bar-wrapper").width()})
  }

  


}
