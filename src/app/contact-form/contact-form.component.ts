import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../slider/slider.component'
import { NgModule } from '@angular/core/src/metadata/ng_module';
import { CommonModule } from '@angular/common';

import * as $ from "jquery"
// import {ContactFormComponentRoutingModule} from "./contact-form-routing.module"
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

// @NgModule({
//     // imports: [CommonModule, ContactFormComponentRoutingModule],
//     // declarations: [ContactFormComponent]
// })
export class ContactFormComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }

  submitContactForm(event){
    event.preventDefault();
    event.stopPropagation();

    let formData = $('form').serializeArray()
    
    console.log(formData)
    $.ajax({
      method: "POST",
      url: "assets/php/admin/sendMail.php",
      data: formData
    })
      .done(function( msg ) {
        console.log(msg);
      });

  }

  checkFirstName(ctrl){
    // let inputElement = event.input.srcElement
    if(ctrl.errors){

      $('form input[name="firstName"]').addClass("warning")
    }else{
      $('form input[name="firstName"]').removeClass("warning")
    }
  }

  checkLastName(ctrl) {
    // let inputElement = event.input.srcElement
    if (ctrl.errors) {

      $('form input[name="lastName"]').addClass("warning")
    } else {
      $('form input[name="lastName"]').removeClass("warning")
    }
  }  

  checkEmail(ctrl) {
    // let inputElement = event.input.srcElement
    console.log(ctrl.errors);
    if (ctrl.errors) {
      $('form input[name="email"]').addClass("warning")
    } else {
      $('form input[name="email"]').removeClass("warning")
    }
  }    

  checkMessage(ctrl) {
    console.log("check !!!");
    if (ctrl.errors) {

      $('form textarea[name="message"]').addClass("warning")
    } else {
      $('form textarea[name="message"]').removeClass("warning")
    }
  }      
  log(data){
    console.log(data)
  }


}
