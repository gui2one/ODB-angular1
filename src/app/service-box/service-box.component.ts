import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-box',
  templateUrl: './service-box.component.html',
  styleUrls: ['./service-box.component.scss']
})
export class ServiceBoxComponent implements OnInit {

  @Input() iconStr : string = 'fa fa-cloud';
  @Input() text: string = 'Plorem ipsum dolor sit, amet consectetur adipisicing elit. At molestias blanditiis inventore ea velit provident voluptates repellat, quidem amet ? Magnam, temporibus explicabo ? Doloribus veniam commodi fugiat est autem eaque vel ?'
  constructor() { }

  ngOnInit() {
  }

}
