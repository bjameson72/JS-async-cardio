const url = require("url");
const db = require("./db");

// different way to do module.exports
exports.getHome = function(request, response) {
  response.writeHead(200, {
    "My-Bitch-Ass-Header": "This is a terrible API",
    "Another-header": "more meta data",
  });
  // sending the response to the client with data
  response.write("Welcome to my house party");
  response.end();
};

exports.getStatus = function(request, response) {
  const status = {
    up: true,
    owner: "Brock",
    timestamp: Date.now(),
  };
  response.writeHead(200, {
    "Content-Type": "application/json",
    "Another-Header": "more things",
  });
  return response.end(JSON.stringify(status));
};

exports.setPatch = function(request, response) {
  const parsedUrl = url.parse(request.url, true);
  return db
    .set(parsedUrl.query.file, parsedUrl.query.key, parsedUrl.query.value)
    .then(() => {
      response.writeHead(200);
      response.end("Value set");
    })
    .catch(err => {
      // TODO: error handling
    });
};
/*
module.exports {
    getHome,
}
*/
