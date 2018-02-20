import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router'


import{ AuthService } from '../providers/auth.service.ts.service'
import * as jQuery from 'jquery'; // into app.component.ts
import { Input } from '@angular/core/src/metadata/directives';

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  

  message : string = "this is the message !!!";
  bLoggedIn : boolean= false;
  @Output() messageEvent = new EventEmitter<(boolean)>();

  error : any;
  email : string;
  password : string;

  // @Output()
  // bLoggedIn : boolean = false;

  constructor(  public authService : AuthService,
                private router: Router
              ) {  }



  // sendMessage(){
  //   // alert(this.bLoggedIn);
  //   this.messageEvent.emit(this.bLoggedIn);
  //   // console.log("message SENT");

  // }
  login(event){
    event.preventDefault();
    this.email = (document.getElementById('email') as HTMLInputElement).value;
    this.password = (document.getElementById('password') as HTMLInputElement).value;    

    this.authService.loginWithEmail(this.email,this.password).then((data) => {
      
      this.bLoggedIn = true;
      // this.sendMessage();
      this.authService.setLoggedIn();
      // console.log(this.authService.loggedIn);
      // location.reload();
    }, (err) => {
      
      console.log(err.code);
      this.error = err.message;
    });
  }
  ngOnInit() {
    //this.login();
  }

  // testFunc(event){
  //   event.preventDefault();
  //   this.email = (document.getElementById('email') as HTMLInputElement).value;
  //   this.password = (document.getElementById('password') as HTMLInputElement).value;

    
  // }

}
