import express from 'express';
import * as auth from './server/controllers/auth'

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Hello world")
});

app.post('/user', (req,res) => {
  auth.createUser(req.body.email);
  res.send("Success!");
});

app.listen(3000, ()=> {
  console.log("app is listening on port 3000");
});
