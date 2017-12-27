import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../slider/slider.component'
import { NgModule } from '@angular/core/src/metadata/ng_module';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent implements OnInit {

  items: Array<any> = [];
  sliderHeight : number = 150;
  constructor() { 
    this.items = [
      { url: '/assets/img/oeufs_2.jpg' },
      { url: '/assets/img/oeufs_1.jpg' },
      { url: '/assets/img/oeufs_2.jpg' },
      { url: '/assets/img/oeufs_1.jpg' },
      { url: '/assets/img/oeufs_2.jpg' },
      { url: '/assets/img/oeufs_2.jpg' },
    ];


  }

  ngOnInit() {
  }




}
