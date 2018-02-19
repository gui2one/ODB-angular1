import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss']
})
export class HeaderTitleComponent implements OnInit {

  @Input() name : string = "defaultName";
  @Input() text: string = "Dafault Text";
  constructor() { }

  ngOnInit() {
    
    

  }

  ngAfterViewInit(){
    //console.log($("#" + this.name + " h1").html());
    $("#" + this.name + " h1").html(this.text)
  }

  ngAfterViewChecked() {
    
    // let wWidth = document.body.clientWidth;
    let wHeight = window.innerHeight;
    // console.log(wHeight);

    let rect = $("#" + this.name)[0].getBoundingClientRect();
    if (rect.top < wHeight - 50) {
      $("#" + this.name).css({
        marginLeft: 50,
        opacity: 1.0
      });
      // console.log(rect.top);
    }else{
      $("#" + this.name).css({
        marginLeft: 0,
        opacity: 0.0
      });
    }    
  }
  

}
