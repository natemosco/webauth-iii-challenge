const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("users").select("*");
}

function findBy(filter) {
  return db("users")
    .select("*")
    .where(filter);
}

function findById(id) {
  return db("users")
    .select("*")
    .where("id", "=", id)
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  const newUser = await findById(id);
  return newUser;
}

// function add(user) {
//   return db("users")
//     .insert(user)
//     .then(ids => {
//       const [id] = ids;
//       return findById(id);
//     });
// }
