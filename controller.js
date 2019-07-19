const fs = require("fs").promises;
const db = require("./db");

exports.notFound = async (request, response) => {
  const html = await fs.readFile("404html.html");
  response.writeHead(404, {
    "Content-Type": "text/html",
  });
  response.end(html);
};

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

exports.setPatch = function(request, response, { file, key, value }) {
  //   const parsedUrl = url.parse(request.url, true);
  if (!file || !key || !value) {
    response.writeHead(400);
    return response.end();
  }
  return db
    .set(file, key, value)
    .then(() => {
      response.writeHead(200);
      response.end("Value set");
    })
    .catch(err => {
      response.writeHead(400, {
        "Content-Type": "text/html",
      });
      response.end(err.message);
    });
};

exports.postWrite = async (request, response, pathname) => {
  const data = [];
  // event emitted when the request receives a chunk of data
  request.on("data", chunk => data.push(chunk));
  //   event emitted when the request has received all of the data
  request.on("end", async () => {
    //   parse data
    const body = JSON.parse(data);
    // call some db function to create this file
    db.createFile(pathname.split("/")[2], body)
      .then(() => {
        response.writeHead(201, {
          "Content-Type": "text/html",
        });
        // return response
        response.end("File written");
      })
      .catch(err => {
        response.writeHead(400, {
          "Content-Type": "text/html",
        });
        response.end(err.message);
      });
  });
};

/*
******Handled above w different export method**********
module.exports {
    getHome,
}
*/
