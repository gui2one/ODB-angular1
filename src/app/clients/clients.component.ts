import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  @Input() title : string;
  @Input() sliderItems : Array<object> = [];
  
  constructor() { }

  ngOnInit() {
    
  }

}
