import { Injectable, ViewChild, ViewChildren, ContentChild, ContentChildren } from '@angular/core';

@Injectable()
export class SaveStateService {

  data : any = "empty data";
  constructor() {
    console.log("________________Save State service starting___________________")
   }

  public saveState(caller){
    console.log(caller);
    console.log(this.data);
  }

}
