const http = require("http");
const routerPath = "./app/router/";
const photoRouter = require(routerPath + "photoRouter");
const tagsRouter = require(routerPath + "tagsRouter");
const filtersRouter = require(routerPath + "filtersRouter");
const usersRouter = require(routerPath + "usersRouter");
require("dotenv").config();
http
  .createServer(async (req, res) => {
    if (req.url.search("/api/photos") != -1) {
      await photoRouter(req, res);
    } else if (req.url.search("/api/tags") != -1) {
      await tagsRouter(req, res);
    } else if (req.url.search("/api/filter") != -1) {
      await filtersRouter(req, res);
    } else if (req.url.search("/api/user") != -1) {
      await usersRouter(req, res);
    }
  })
  .listen(process.env.APP_PORT, () =>
    console.log("start server na porcie " + process.env.APP_PORT)
  );
