const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

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

//Middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Anakin",
      email: "anakin@gmail.com",
      password: "darkside",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  bcrypt.compare(
    "apples",
    "$2a$10$Cbz6ns78FWiSEkFkpe71HOgDMcKnJVuA2ZkHYwy/vDVa8q2LfTVjy",
    function (err, res) {
      console.log("first guess", res); // res == true
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$Cbz6ns78FWiSEkFkpe71HOgDMcKnJVuA2ZkHYwy/vDVa8q2LfTVjy",
    function (err, res) {
      console.log("second guess", res); // res = false
    }
  );

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

//sending information to the database from
//the users the register to the smart-brain app

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  db("users")
    .returning('*')
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('Unable to register'))
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
  .then(user => {
  if(user.length){
    res.json(user[0])
  }else{
    res.status(400).json('Not found')
  }
  })
  .catch(err => res.status(400).json('Error getting user'))

});

// incrementing  the entries in the app everytime 
// we search for an image in the app 

app.put("/image", (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  . returning('entries')
  .then(entries => {
  res.json(entries[0]); 
  })
  .catch(err => res.status(400).json('unable to get entries'))
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*
/ --> res = this is working 
/ signin --> POST = success / fail 
/ register --> POST = user 
/ profile/:userId --> GET = user
/ image --> PUT --> user
*/

/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});


*/
