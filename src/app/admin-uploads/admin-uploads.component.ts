import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-uploads',
  templateUrl: './admin-uploads.component.html',
  styleUrls: ['./admin-uploads.component.scss']
})
export class AdminUploadsComponent implements OnInit {
  // bLoggedIn: boolean = false;
  message : boolean;
  @Input() bLoggedIn: boolean = false;
  constructor() { }

  ngOnInit() {
    this.bLoggedIn = localStorage.getItem('ODB_connected') == 'true' ? true : false;
  }

    receiveMessage(event) {
    this.message = event;
    this.bLoggedIn = this.message;
    //localStorage.setItem('ODB_connected', 'true');
    // console.log(localStorage);    
  }

}
