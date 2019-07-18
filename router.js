const url = require("url");
const { getHome, getStatus, setPatch } = require("./controller");

exports.handleRoutes = function(request, response) {
  if (request.url === "/" && request.method === "GET") {
    return getHome(request, response);
  }

  if (request.url === "/status" && request.method === "GET") {
    return getStatus(request, response);
  }

  const parsedUrl = url.parse(request.url, true);
  //   console.log(parsedUrl);
  if (parsedUrl.pathname === "/set" && request.method === "PATCH") {
    // fire off db set method
    return setPatch(request, response);
  }
};
