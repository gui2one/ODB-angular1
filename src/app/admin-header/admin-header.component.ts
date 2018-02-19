import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../providers/auth.service.ts.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  message : boolean = false;


  @Input()  
  bLoggedIn : boolean = false;
  @Output() messageEvent = new EventEmitter<(boolean)>();

  @Input()
  userEmail : string;
  constructor(public authService: AuthService, private router : Router) { }

  ngOnInit() {


  }

  ngAfterViewInit(){

  }

  // sendMessage(){
  //   this.messageEvent.emit(this.bLoggedIn);
  // }
  // receiveMessage(event) {
  //   this.message = event;
  //   this.bLoggedIn = this.message;
  //   this.userEmail = localStorage.getItem("ODB_user");
  //   // console.log("before .... :", localStorage.getItem('ODB_connected'));
  //   localStorage.setItem('ODB_connected', 'true');

  //   // console.log(localStorage);
  //   this.sendMessage();
  //   // console.log(event);
  // }

  logOut(event){

    this.bLoggedIn = false;
    // localStorage.removeItem("ODB_connected");
    // localStorage.removeItem("ODB_user");

    this.authService.logOut();
    // this.sendMessage();

  }

  refresh(): void {
    window.location.reload();
  }  

}
