import { Injectable, ViewChild, ViewChildren, ContentChild, ContentChildren, ComponentRef } from '@angular/core';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';


@Injectable()
export class SaveStateService {

  dataSets : Array<any> = [];
  saveSets : Array<object> = [];
  constructor() {

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
  
  }

  public restore(){

    for (let i = 0; i < this.saveSets.length; i++) {


      
      let saveSet = this.saveSets[i];
      if( this.dataSets.length > 0){

        let dataSet = this.dataSets[i];

        let comp = saveSet["caller"]
        let viewChildren = comp[saveSet['viewChildren']];
        let params = saveSet['params'];
  

        viewChildren.forEach((item, id)=>{
          for (let j = 0; j < params.length; j++) {

            try {              
              item[params[j]] = this.dataSets[i][id][j]
            } catch (error) {
              
            }


              
          }
        })        
      }     
    }    
  }
}
