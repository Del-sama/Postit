require('dotenv').config()

import express from 'express';
import * as firebase from "firebase";
import usersRoute from './server/routes/user';
import messageRoute from './server/routes/message'
import groupsRoute from './server/routes/group'

const port = process.env.PORT;

const app = express();

const config = {
  apiKey: "AIzaSyDXPPQv_oOWkbLwgFUOPmtNYlkt5u6aNy4",
  authDomain: "postit-733a4.firebaseapp.com",
  databaseURL: "https://postit-733a4.firebaseio.com",
  projectId: "postit-733a4",
  storageBucket: "postit-733a4.appspot.com",
  messagingSenderId: "1045252909222"
};
firebase.initializeApp(config);

app.use('/users', usersRoute);
app.use('/groups', messageRoute);
app.use('/groups', groupsRoute);

app.use('/*', (req, res) => {
  res.send('welcome!')
})
const server = app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`);
});