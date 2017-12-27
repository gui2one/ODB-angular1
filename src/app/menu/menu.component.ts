import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery'; // into app.component.ts
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery.get('/assets/php/test.php').then(data =>console.log(data));
    console.log("menu init");
    
  }

}
