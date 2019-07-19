const url = require("url");
const { getFile, deleteFile, postWrite, notFound, getHome, getStatus, setPatch } = require("./controller");

exports.handleRoutes = function(request, response) {
  const { pathname } = url.parse(request.url, true);
  if (request.url === "/" && request.method === "GET") {
    return getHome(request, response);
  }

  if (request.url === "/status" && request.method === "GET") {
    return getStatus(request, response);
  }

  //   const parsedUrl = url.parse(request.url, true);
  //   console.log(parsedUrl);
  if (pathname === "/set" && request.method === "PATCH") {
    // fire off db set method
    return setPatch(request, response);
  }

  if (pathname.startsWith("/write") && request.method === "POST") {
    return postWrite(request, response, parsedUrl.pathname);
  }

  // DELETE a file
  if (pathname.startsWith("/delete") && request.method === "PATCH") {
    return deleteFile(request, response, pathname);
  }

  if (pathname.startsWith("/get") && request.method === "GET") {
    return getFile(request, response, pathname);
  }

  //   handle any routes that weren't found
  notFound(request, response);
};
