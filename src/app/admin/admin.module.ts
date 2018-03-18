import { BrowserModule, Title } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, OnInit } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {AdminComponent} from './admin.component'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../../environments/environment';
import { LoginComponent } from '../login/login.component';
import {AuthService} from '../providers/auth.service.ts.service';

import { GalleryComponent } from '../gallery/gallery.component';
import { ImageManagerComponent } from '../image-manager/image-manager.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component'

import { ModalModule } from 'ngx-bootstrap/modal';

// import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ConfirmModalModule } from "../confirm-modal/confirm-modal.module";


// import { OdbDataService } from "../providers/odb-data.service";
import { OdbAdminDataService } from "../providers/odb-admin-data.service";
import { GalleryManagerComponent } from '../gallery-manager/gallery-manager.component';
import { AdminUploadsComponent } from '../admin-uploads/admin-uploads.component';

import { HashLocationStrategy, PathLocationStrategy, LocationStrategy} from '@angular/common';

import{ ToggleModule} from '../toggle/toggle.module'
import { ToggleComponent } from '../toggle/toggle.component';
// import { ToggleComponent } from '../toggle/toggle.component';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

import { SiteUtilsService } from '../providers/site-utils.service'
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { JsonEditorComponent } from '../json-editor/json-editor.component';

// import { AdminNotificationComponent } from '../admin-notification/admin-notification.component';
import { AdminNotificationModule } from '../admin-notification/admin-notification.module';
import { Broadcaster } from '../providers/broadcaster';

// import { AdminMultilangInputComponent } from '../admin-multilang-input/admin-multilang-input.component';
import { AdminMultilangInputModule } from "../admin-multilang-input/admin-multilang-input.module";
import { AdminLanguageBarComponent } from '../admin-language-bar/admin-language-bar.component';

import { LanguagesService } from "../providers/languages.service";
import { AdminCollapseComponent } from '../admin-collapse/admin-collapse.component';
import { AdminCollapseGroupComponent } from '../admin-collapse-group/admin-collapse-group.component';
let Routes : Routes = [
  {
    path: "",
    component: AdminComponent,
    data: { title: "L'Oeuf du Breil" }
  },
  {
    path: "gallery_manager",
    component: AdminComponent,
    data: { title: "L'Oeuf du Breil" }
  },
  {
    path: "uploads",
    component: AdminComponent,
    data: { title: "L'Oeuf du Breil" }
  },  
]
@NgModule({

  imports: [
    // ContactFormModule,
    RouterModule.forChild(Routes),

    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ModalModule.forRoot(),

    ToggleModule,
    ConfirmModalModule,
    AdminNotificationModule,
    AdminMultilangInputModule
    
    
  ], 
  providers: [
    // { provide : APP_BASE_HREF, useValue:'/test/'},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthService,
    // OdbDataService,
    OdbAdminDataService,
    SiteUtilsService,
    Broadcaster,
    LanguagesService
  ],
  declarations: [
    AdminComponent, 
    LoginComponent,
    GalleryComponent,
    ImageManagerComponent,
    AdminHeaderComponent,
    // ConfirmModalComponent,
    GalleryManagerComponent,
    AdminUploadsComponent,
    AdminSideBarComponent,
    AdminPanelComponent,
    JsonEditorComponent,
    AdminLanguageBarComponent,
    
    AdminCollapseComponent,
    AdminCollapseGroupComponent
    
  ],

  bootstrap: [AdminComponent],
})
export class AdminModule implements OnInit{

  ngOnInit(){
    console.log("admin Module loaded");
    
  }
 }
