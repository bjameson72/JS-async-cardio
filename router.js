const url = require("url");
const { postWrite, notFound, getHome, getStatus, setPatch } = require("./controller");

exports.handleRoutes = function(request, response) {
  // const { pathname } = url.parse
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

  if (parsedUrl.pathname.startsWith("/write") && request.method === "POST") {
    return postWrite(request, response, parsedUrl.pathname);
  }

  //   handle any routes that weren't found
  notFound(request, response);
};
