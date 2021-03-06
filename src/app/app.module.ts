import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import {RouterModule, Routes} from '@angular/router';
// import { AppRoutingModule } from './app-routing.module';

import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule } from "@angular/forms";
// import { ContactFormModule } from './contact-form/contact-form.module';
import { HomeComponent } from './home/home.component';

import { HashLocationStrategy, PathLocationStrategy, LocationStrategy } from '@angular/common';

import { SliderComponent } from './slider/slider.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core'



import { enableProdMode } from '@angular/core';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ImageLoaderComponent } from './image-loader/image-loader.component';

import { APP_BASE_HREF } from '@angular/common';

import { ServiceBoxComponent } from './service-box/service-box.component';

// import {AuthService} from "./providers/auth.service.ts.service"

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { HeaderTitleComponent } from './header-title/header-title.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { ModuleOptions, NgStaticSiteGeneratorModule } from 'ng-static-site-generator';
import { ParallaxSpacerComponent } from './parallax-spacer/parallax-spacer.component';

import { SpacerComponent } from './spacer/spacer.component';
import { ParallaxBackgroundComponent } from './parallax-background/parallax-background.component';


import{SiteUtilsService} from './providers/site-utils.service'
import { SiteLanguagesService } from './providers/site-languages.service';
import { ClientsComponent } from './clients/clients.component';
import { GoogleMapComponent } from './google-map/google-map.component';


const ngStaticSiteGeneratorModuleOptions: ModuleOptions = {
  openExternalLinksInNewTab: false // Automatically add target="_blank" to external links. Default false.
};


enableProdMode();

let Routes : Routes = [
  {
    path: "#",
    
    component: HomeComponent,
    data: { title: "L'Oeuf du Breil" }
  },
  {
    path: "",
    component: HomeComponent,
    data: { title: "L'Oeuf du Breil" }
  },
  {
    path: "home",
    component: HomeComponent,
    data: { title: "L'Oeuf du Breil" }
  },
  {
    path: "contact",    
    component: ContactFormComponent,
    data: { title: "L'Oeuf du Breil" }
  },
  {
    path: "admin",
    loadChildren: './admin/admin.module#AdminModule',
    // loadChildren: () => __adminModule,
    
    data: { title: "L'Oeuf du Breil" }
  },
  {
    path :'**',
    component : NotFoundComponent,
    // redirectTo:'/contact'
  }
]
@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    MenuComponent,
    HeaderComponent,
    SliderComponent,
    FooterComponent,
    ContactFormComponent,
    ImageLoaderComponent,
    ServiceBoxComponent,
    HeaderTitleComponent,
    NotFoundComponent,
    ParallaxSpacerComponent,
    SpacerComponent,
    ParallaxBackgroundComponent,
    ClientsComponent,
    GoogleMapComponent,
    

  ],
  imports: [

    NgStaticSiteGeneratorModule.forRoot(ngStaticSiteGeneratorModuleOptions),

    RouterModule.forRoot(Routes),
    // AppRoutingModule,
    BrowserModule.withServerTransition({appId:'my-app'}),    
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDomZdnRrVpGnJ40k6T_2YokeGMqQRTkUw'
    }),

    LazyLoadImageModule,
    // ImageLoaderModule

    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
 

  ],
  providers: [
    // { provide: APP_BASE_HREF, useValue: '/test/' },
  //  { provide: LocationStrategy, useClass: HashLocationStrategy },
  //  AuthService
  SiteUtilsService,
  SiteLanguagesService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
