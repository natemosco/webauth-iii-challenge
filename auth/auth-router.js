const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 15);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      //console.log(newUser, 'response from post /register');
      res.status(201).json(newUser);
    })
    .catch(error => {
      console.log(error, "Error from post /register");
      res.status(500).json({ errorMessage: "internal error adding new user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      //console.log(user, 'response from post /login');
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({
          token,
          message: `Welcome ${user.username}`
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log(error, "Error from post /login");
      res
        .status(500)
        .json({ errorMessage: "internal error loggin in ", error });
    });
});

function signToken(user) {
  const payload = {
    username: user.username
  };
  const secret = process.env.JWT_SECRET || TOKEN_SECRET;

  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
