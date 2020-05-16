const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register'); 
const signin = require('./controllers/signin' );
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//Connection to Database

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "smart-brain",
  },
});

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {res.send(database.users)});

app.post("/signin", (req, res)=> {signin.getSignin(req, res, db, bcrypt)})

//sending information to the database from
//the users that register to the smart-brain app

app.post("/register", (req, res)=> {register.getRegister(req, res, db, bcrypt)});

app.get("/profile/:id", (req, res) => {profile.getProfileId(req, res, db)});

// incrementing  the entries in the app everytime
// we search for an image in the app

app.put("/image", (req, res) => {image.getImage(req, res, db)} );
app.put("/imageurl", (req, res) => {image.getApi(req, res )} );

//Eviormental Variables
app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

