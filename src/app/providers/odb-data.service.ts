import { Injectable, OnInit } from '@angular/core';
import * as jQuery from "jquery"
import {AngularFireDatabase} from 'angularfire2/database'
@Injectable()
export class OdbDataService implements OnInit {

  galleryData : any;

  dbRoot:any;
  constructor(private db:AngularFireDatabase) { }


  ngOnInit(){
    this.dbRoot = this.db.database.ref();
    this.galleryData = this.dbRoot.list("gallery");
  }

  
}
