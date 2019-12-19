const server = require("./api/server");

const PORT = process.env.PORT || 3459;

server.listen(PORT, () => {
  console.log(`\n\n Welcome back Sir, we are listening on port${PORT}`);
});
