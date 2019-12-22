const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      //console.log(users, 'response from GET /');
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error, "Error from get /");
      res
        .status(500)
        .json({ error, errorMessage: "internal error fetching users" });
    });
});

module.exports = router;
