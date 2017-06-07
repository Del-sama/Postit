import express from 'express';

const app = express();

import * as firebase from 'firebase';

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: "AIzaSyDXPPQv_oOWkbLwgFUOPmtNYlkt5u6aNy4",
    authDomain: "postit-733a4.firebaseapp.com",
    databaseURL: "https://postit-733a4.firebaseio.com",
    projectId: "postit-733a4",
    storageBucket: "postit-733a4.appspot.com",
    messagingSenderId: "1045252909222"
};
firebase.initializeApp(config);

app.get('/', (req, res) => {
  res.send("Hello world")
});

app.listen(3000, ()=> {
  console.log("app is listening on port 3000");
});