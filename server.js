const http = require("http"); // import HTTP node module
const { handleRoutes } = require("./router");

const server = http.createServer(); // create the server

server.on("request", (request, response) => {
  handleRoutes(request, response);
});

// opens our server up on PORT 5000 for connections
server.listen(5000, () => console.log("Server listening on port 5000"));
