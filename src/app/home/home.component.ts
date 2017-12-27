import { Component, OnInit, Inject } from '@angular/core';

import { inject } from '@angular/core/testing';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {


  items: Array<any> = [];

  constructor() {

    this.items = [
      { name: 'assets/img/oeufs_1.jpg' },
      { name: 'assets/img/oeufs_2.jpg' },
      { name: 'assets/img/oeufs_1.jpg' },
    ];
  }



}



