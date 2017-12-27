import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import {RouterModule} from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { HomeComponent } from './home/home.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { SliderComponent } from './slider/slider.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core'


let Routes = [
  {
    path: "#",
    component: HomeComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path: "contact",
    component: ContactFormComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ContactFormComponent,
    HomeComponent,
    SliderComponent
  ],
  imports: [
    RouterModule.forRoot(Routes),
    BrowserModule,    
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrxNx6aLV1eZ_sFzxsps8Q3uTK - qW1A3Q'
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
