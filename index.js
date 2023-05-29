const http = require("http");
const routerPath = "./app/router/";
const photoRouter = require(routerPath + "photoRouter");
const tagsRouter = require(routerPath + "tagsRouter");
const filtersRouter = require(routerPath + "filtersRouter");
const usersRouter = require(routerPath + "usersRouter");
const profileRouter = require(routerPath + "profileRouter")
require("dotenv").config();
const ip = Object.values(require("os").networkInterfaces()).reduce(
  (r, list) =>
    r.concat(
      list.reduce(
        (rr, i) =>
          rr.concat((i.family === "IPv4" && !i.internal && i.address) || []),
        []
      )
    ),
  []
);

console.log(ip);
http
  .createServer(async (req, res) => {
    if (
      req.url.search("/api/photos") != -1 ||
      req.url.search("/api/getfile") != -1
    ) {
      await photoRouter(req, res);
    } else if (req.url.search("/api/tags") != -1) {
      await tagsRouter(req, res);
    } else if (req.url.search("/api/filter") != -1) {
      await filtersRouter(req, res);
    } else if (req.url.search("/api/user") != -1) {
      await usersRouter(req, res);
    } else if(req.url.search("/api/profile") != -1){
      await profileRouter(req,res);
    }
  })
  .listen(process.env.APP_PORT, () =>
    console.log("start server na porcie " + process.env.APP_PORT)
  );
