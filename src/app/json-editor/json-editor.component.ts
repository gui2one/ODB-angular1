import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnInit {

  mockData : object;
  constructor() { }

  ngOnInit() {

    let data  = {
      mainTitle: "Gros titre",
      home:{
        header : {
          title : "Home Title text",
          content : "content text"
        }
      },
      newObject :{
        newData : "100"
      },
      about: {
        header: {
          title: "Title text",
          content: "content text"
        }
      }
    }

    // this.mockData = this.getObjectKeys(data);
    // this.printObject(data);
  }

  printObject(_object : object){

    for( let item in _object ){

      let counter = 0;

      let currentObj : object = _object[item];

      console.log("", item, " -->")
      if( typeof currentObj === "object"){

        while(typeof currentObj === "object" && counter < 30){
          
          for( let key in currentObj){
            if(typeof currentObj[key] === "object"){
              currentObj = currentObj[key]
              console.log("\t", key, " -->")
              console.log(currentObj)
              continue
            }else{
              console.log(currentObj[key])
              continue
            }
          }
          counter++;
          
        }
      }else if(typeof currentObj === "string"){
        console.log(currentObj)
      }else if (typeof currentObj === "number") {
        console.log(currentObj)
      }
    }
  }
  getObjectKeys(_object : object) : Array<any>{
    let keys : Array<any> = [];
    let values : Array<any> = [];
    
    for( let key in _object){

      let obj = _object[key];
      let subKeys = [];
      let subValues = [];
      let counter = 0;
      // console.log( "---", typeof _object[key]);
      while (typeof obj === "object" && counter < 3){

        subKeys.push(key);
        
        counter += 1;

        console.log(counter, "---", typeof obj);
        if(typeof obj !== "object"){
          break;
        }

        obj = obj[key];
      }
      // console.log(typeof _object[key]);
      // values.push(_object[key]);
    }
    return [keys, values]
  }

}
