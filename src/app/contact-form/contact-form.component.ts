import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../slider/slider.component'
import { NgModule } from '@angular/core/src/metadata/ng_module';
import { CommonModule } from '@angular/common';
import * as $ from "jquery"
// import {ContactFormComponentRoutingModule} from "./contact-form-routing.module"
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
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


}
