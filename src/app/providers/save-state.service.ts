import { Injectable, ViewChild, ViewChildren, ContentChild, ContentChildren, ComponentRef } from '@angular/core';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';


@Injectable()
export class SaveStateService {

  dataSets : Array<any> = [];
  saveSets : Array<object> = [];
  constructor() {
    // console.log("________________Save State service starting___________________")
   }

  addSaveSet(caller: any, viewChildren, params: Array<string>){    

    this.saveSets.push({ 
      caller: caller, 
      viewChildren: viewChildren, 
      params : params}
    );
  }

  public save(){
    this.dataSets = [];
    for(let i=0; i< this.saveSets.length; i++){
      let saveSet = this.saveSets[i];
      let comp = saveSet["caller"]
      let viewChildren = comp[saveSet['viewChildren']];
      let params = saveSet['params'];
      console.log(saveSet);
      // console.log(comp);
      // console.log(viewChildren);
      
      let tempData : Array<any> = [];

      viewChildren.forEach((item, id)=>{   
                
        let tempData2 : Array<any> = [];
        for(let j=0; j<params.length; j++){          
          tempData2.push(item[params[j]]);
        }        
        tempData.push(tempData2);
      })
      this.dataSets.push(tempData)
    }    
    console.log(this.dataSets);
  }

  public restore(){

    for (let i = 0; i < this.saveSets.length; i++) {

      console.log("----- save set " + i +" ________________________");
      
      let saveSet = this.saveSets[i];
      if( this.dataSets.length > 0){

        let dataSet = this.dataSets[i];
        // console.log(saveSet)
        let comp = saveSet["caller"]
        let viewChildren = comp[saveSet['viewChildren']];
        let params = saveSet['params'];
  
        // console.log(comp);
        // console.log(dataSet);
        viewChildren.forEach((item, id)=>{
          for (let j = 0; j < params.length; j++) {
            console.log("________________ View Child " + id + " ________________________");

            console.log(this.dataSets[i][id]);
            console.log(this.dataSets[i][id][j]);
            item[params[j]] = this.dataSets[i][id][j]

              // console.log(item[params[j]]);
              
            }
        })
        
      }
     
    }
    
  }

}
