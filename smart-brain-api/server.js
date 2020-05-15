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

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // // true
  //bcrypt.compareSync("veggies", hash); // false

  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      // this is use to compare the entered hash (password) with the one stored in the data base
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      }else{
        res.status(400).json('wrong credentials')
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
});

//sending information to the database from
//the users the register to the smart-brain app

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  //Updating the login table
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          })
          .then(trx.commit)
          .catch(trx.rollback);
      });
  }).catch((err) => res.status(400).json("Unable to register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("Error getting user"));
});

// incrementing  the entries in the app everytime
// we search for an image in the app

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
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
