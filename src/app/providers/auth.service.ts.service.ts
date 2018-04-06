import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase';

import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class AuthService implements OnInit{
  provider : firebase.auth.EmailAuthProvider;

  loggedIn : boolean = false;

  constructor(public afAuth: AngularFireAuth) { 
    this.provider = new firebase.auth.EmailAuthProvider();

  }

  ngOnInit(){

  }

  checkLoggedIn(){
    // this.afAuth.authState.forEach((item)=>{
    //   console.log(item);
      
    // });
    
    // return this.afAuth.authState["email"] !== undefined;
    return this.afAuth.authState
  }


  loginWithEmail(email : string, password : string){
    // console.log("login !!!!")
    let prom = this.afAuth.auth.signInWithEmailAndPassword(email, password).then(()=>{

        // localStorage.setItem("ODB_user",email);
        // localStorage.setItem("ODB_connected",'true');
        this.loggedIn = true;
    });
    return prom 
  }

  setLoggedIn(){
    this.loggedIn = true;
  }

  logOut(){
    localStorage.removeItem("ODB_connected");
    localStorage.removeItem("ODB_user");
    // console.log("logOut called from auth.service");
    // console.log(localStorage.getItem("ODB_connected"));
    // console.log(localStorage.getItem("ODB_connected"));
    this.loggedIn = false;
    return firebase.auth().signOut();
  }

}
