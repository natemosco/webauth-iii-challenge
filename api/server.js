const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");

const globalMiddleware = [helmet(), cors(), express.json()];

const server = express();
server.use(globalMiddleware);
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.get("/", (req, res) => {
  res.send("server is up and running.");
});

module.exports = server;
