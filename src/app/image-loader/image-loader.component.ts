import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {




  // Image.prototype.completedPercentage = 0;  
  imgProto;

  @Input() imgSrc;

  imgUrl: string = 'assets/img/oeufs_2.jpg';

  constructor() { }

  ngOnInit() {

    
    // $('<img src="' + this.imgSrc+'">').on('load',function(success){
      
    //   if(success){
    //     console.log("loaded");
    //     $(this).appendTo($('#image-loader-wrapper')[0]);
    //   }
    // })

    this.imgProto = new Image();
    this.load(this.imgUrl);
    
  }

  load(url) {
    console.log("URL :: " + url)
    let root = this;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
      //console.log(e)
      var blob = new Blob([e.srcElement.response]);
      console.log("this.response :: " + e.srcElement.response)
      root.imgProto.src = window.URL.createObjectURL(blob);
      console.log(this.imgProto);
      $('#image-loader-wrapper')[0].appendChild(this.imgProto);
    }.bind(root);
    xmlHTTP.onprogress = function (e) {
      root.imgProto.completedPercentage = (e.loaded / e.total) * 100;

      console.log(root.imgProto.completedPercentage);
    }.bind(root);
    xmlHTTP.onloadstart = function () {
      root.imgProto.completedPercentage = 0;
    }.bind(root);
    xmlHTTP.send();
  };

}
