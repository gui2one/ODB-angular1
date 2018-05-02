import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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


export class ContactFormComponent implements OnInit {

  @ViewChild("captchaInput") captchaInput : ElementRef;
  infosInterval : number;
  captchaImgPath : string;
  captchaCode : string;

  constructor(private element : ElementRef) { 
  }

  @Input() text : string;
  ngOnInit() {
    // $(this.element.nativeElement.querySelector("#messageSuccess")).css({ opacity: 1.0 })
    // $(this.element.nativeElement.querySelector("#messageSuccess")).text("SUCCESS")
    this.loadCaptcha();
  }

  loadCaptcha(){
    $.ajax( {
      method : "POST",
      url:"assets/php/simple-php-captcha/myCaptcha.php",
      contentType: false,
      processData: false,
      success : (response)=>{
        let data = JSON.parse(response)
        // console.log(data.image_src)
        this.captchaImgPath = data.image_src
        // console.log( this.captchaImgPath );
        this.captchaCode = data.code
      }, error : (err)=>{
        console.log(err)
      }
      
    });
  }

  verifCaptcha(){

    if (this.captchaCode === this.captchaInput.nativeElement.value){
      this.submitContactForm(undefined);
    }
    // let formData = new FormData();
    // formData.append("typed_code", this.captchaInput.nativeElement.value);
    // $.ajax( {
    //   method : "POST",
    //   data : formData,
    //   url:"assets/php/simple-php-captcha/myVerifCaptcha.php",
    //   processData: false,
    //   contentType: false,
    //   dataType : "text",

    //   success : (response)=>{
    //     if(response === "good code"){
    //       this.submitContactForm(undefined);
    //     }
    //     console.log("",response)
        
    //   }, error : (err)=>{
    //     console.log(err)
    //   }
      
    // });
  }
  resetFields(){
    // console.log(this.element.nativeElement.querySelector("input[name='firstName']").value);
    this.element.nativeElement.querySelector("input[name='firstName']").value = "";
    this.element.nativeElement.querySelector("input[name='lastName']").value = "";
    this.element.nativeElement.querySelector("input[name='email']").value = "";
    this.element.nativeElement.querySelector("input[name='company']").value = "";
    this.element.nativeElement.querySelector("textarea[name='message']").value = "";    
    this.element.nativeElement.querySelector("button[type='submit']").disabled = true;

  }
  submitContactForm(event){

    
    // console.log(this.captchaInput.nativeElement.value);
    // event.preventDefault();
    // event.stopPropagation();

    let formData = $('form').serializeArray()
    
    console.log(formData)
    $.ajax({
      method: "POST",
      url: "assets/php/admin/sendMail.php",
      data: formData,
      dataType: 'json'
    })
      .done(function( msg ) {
        // console.log(msg.type);
        let infos = $(this.element.nativeElement.querySelector("#messageSuccess"))
        
        if(msg.type === "error"){
          infos.addClass("message-error");
          infos.css({ 
            opacity: 1.0 ,
            
          })
          infos.text("ERROR")          
          // infos.text("ERROR")          
          // console.log(msg.message);
        }else if(msg.type === "success"){
          infos.removeClass("message-error");
          // console.log(msg.message);
          this.resetFields();
          infos.css({ opacity: 1.0 })
          infos.text("SUCCESS")
        }

        window.setTimeout( () => infos.css({ opacity : 0.0}),5000);
      }.bind(this));

  }

  checkFirstName(ctrl){
    // let inputElement = event.input.srcElement

    console.log("checkFirstName function")
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

  onCaptchaInputChange(event){
    console.log(event)
  }

}
