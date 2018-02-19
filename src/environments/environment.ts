// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebase:{
    apiKey: "AIzaSyADOzobUZeThYFkf4GEbr4G3oiZ6PJhYfQ",
    authDomain: "odb-web-test.firebaseapp.com",
    databaseURL: "https://odb-web-test.firebaseio.com",
    projectId: "odb-web-test",
    storageBucket: "odb-web-test.appspot.com",
    messagingSenderId: "282019542378"
  },
  // firebase:{
  // apiKey: "AIzaSyBPEQkSUUmBCYT8UaopNnxaDL7bIoAMFRA",
  // authDomain: "odb-web-22a63.firebaseapp.com",
  // databaseURL: "https://odb-web-22a63.firebaseio.com",
  // projectId: "odb-web-22a63",
  // storageBucket: "",
  // messagingSenderId: "54318903796"
  // }
};
