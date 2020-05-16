const getSignin = (req, res, db , bcrypt) => {

    if (!email || !name || !password){
        return res.status(400).json('incorrect submission')
    }
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
  }

  module.exports = {
      getSignin: getSignin
  }