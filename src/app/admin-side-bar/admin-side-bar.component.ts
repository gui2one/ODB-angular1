import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router'

import {AuthService} from "../providers/auth.service.ts.service"
import * as $ from "jquery"
@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.scss']
})
export class AdminSideBarComponent implements OnInit{

  
  @Input()
  bLoggedIn: boolean = false;
  @Input() userEmail : string = "";
  @Output() onCollapse = new EventEmitter<boolean>()
  bSideBarCollapsed : boolean = false;

  constructor(private router: Router, private authService: AuthService ) {}


  ngOnInit(){
    this.bSideBarCollapsed = localStorage.getItem('ODB_side-bar-collapsed') === "true" ? true : false;
    if(this.bSideBarCollapsed){
      this.broadcastCollapse(true);
    }
    // console.log(localStorage.getItem('ODB_side-bar-collapsed'));
    // console.log(this.bSideBarCollapsed);
  }

  broadcastCollapse( collapsed : boolean){
    this.onCollapse.emit(collapsed)
    // console.log("just sent message")
  }
  onTogglerButtonClick(event){
    this.bSideBarCollapsed = !this.bSideBarCollapsed;
    // console.log(this.bSideBarCollapsed);
    this.broadcastCollapse(this.bSideBarCollapsed);

    localStorage.setItem("ODB_side-bar-collapsed", (this.bSideBarCollapsed).toString());
    // if(this.bSideBarCollapsed){
    //   $("#")
    // }
  }

  logOut(event){
    this.authService.logOut();
  }

  navigate(route){
    // this.router.navigate([route],{queryParams:{collpased:true}})
  }

}
