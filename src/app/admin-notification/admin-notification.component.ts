import { Component, OnInit,Input, ElementRef } from '@angular/core';
import * as $ from "jquery";
import { Broadcaster } from '../providers/broadcaster';
@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss']
})
export class AdminNotificationComponent implements OnInit {
  

  items : Array<any> = [];
  title : string;
  content : string;





  // listener : EventListener;
  constructor(private element : ElementRef,
  private broadcaster : Broadcaster) {

    

    this.broadcaster.on('successNotification')
      .subscribe(message => {
        this.success("",message.toString());
      });  
      
    this.broadcaster.on('errorNotification')
      .subscribe(message => {
        this.error("", message.toString());
      });          

   }



  ngOnInit() {


  }

  // receiveNotif(event){
  //   console.log(event);
  // }



  // onTestBroadcast(message){
  //   console.log(message);
  // }


  notify(type:string, title : string, content : string){
    // console.log("received event trigger -->");
    let item: object;
    if(type === "success"){
       item = {
        type: 'success',
        title: title,
        content: content
      }
      
    } else if (type === "error"){
      item = {
        type: 'error',
        title: title,
        content: content
      }
    }
    this.items.push(item);
    window.setTimeout( function() {
        this.items= this.items.slice(1,this.items.length);
        // console.log(this);
      }.bind(this),6000)    

    // console.log(this.items)
  }

  success(title : string, content : string){
    this.notify("success", title, content);
  }


  error(title: string, content: string) {
    this.notify("error", title, content);
  }  

  destroyItem(id:number){
    console.log("destroying ...:",id);
  }
}


