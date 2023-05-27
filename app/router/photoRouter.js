require("../model");
const {
  savePhoto,
  deletePhoto,
  getPhotoById,
  getFilteredPhoto,
} = require("../controller/fileController");
const {
  getAll,
  getSelected,
  changePhoto,
  addTag,
  addTags,
  getTags,
} = require("../controller/jsonController");

require("../utils/getRequestedData");
const { HttpResp } = require("../utils/HttpResponse");
const { verifyToken } = require("../utils/userUtils");

const getIdFromUrl = (url) => {
  const id = url.split("/").pop();
  return id;
};

const photoRouter = async (request, response) => {
  const resp = new HttpResp(response);
  const { method, url } = request;
  // if (
  //   request.headers.authorization &&
  //   request.headers.authorization.startsWith("Bearer")
  // ) {
  //   // czytam dane z nagłowka
  //   let token = req.headers.authorization.split(" ")[1];
  //   if (verifyToken(token) != null) {
  //   } else {
  //     response.writeHead(401, {
  //       "Content-Type": "application/json;charset=utf-8",
  //     });
  //     resp.getResponse(
  //       JSON.stringify({ message: "wrong authentication" })
  //     );
  //   }
  // }
  if (url == "/api/photos" && method == "GET") {
    response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    response.end(JSON.stringify(getAll()));
  } else if (url == "/api/photos" && method == "POST") {
    const data = savePhoto(request);
    resp.getResponse(data);
  } else if (url.match(/\/api\/photos\/([0-9]+)/) && method == "GET") {
    let data = getSelected(getIdFromUrl(url));
    resp.getCheckedResponse(data);
  } else if (url.match(/\/api\/photos\/([0-9]+)/) && method == "DELETE") {
    const data = deletePhoto(getIdFromUrl(url));
    resp.getCheckedResponse(data);
  } else if (url == "/api/photos" && method == "PATCH") {
    let data = await getRequestData(request);
    const { id, change } = JSON.parse(data);
    const returnedData = changePhoto(id, change);
    resp.getCheckedResponse(returnedData);
  } else if (url == "/api/photos/tags" && method == "PATCH") {
    let data = await getRequestData(request);
    const { id, name, popularity } = JSON.parse(data);
    const returnedData = addTag(id, name, popularity);
    resp.getCheckedResponse(returnedData);
  } else if (url == "/api/photos/tags/mass" && method == "PATCH") {
    let data = await getRequestData(request);
    const { id, tags } = JSON.parse(data);
    const returnedData = addTags(id, tags);
    resp.getCheckedResponse(returnedData);
  } else if (url.match(/\/api\/photos\/tags\/([0-9]+)/) && method == "GET") {
    const id = getIdFromUrl(url);
    const returnedData = getTags(id);
    resp.getCheckedResponse(returnedData);
  } else if (
    url.match(/\/api\/getfile\/([0-9]+)\/([a-z]+)/) &&
    method == "GET"
  ) {
    const filtername = url.split("/").pop();
    const id = url.split("/")[url.split("/").length - 2];
    const data = getFilteredPhoto(id, filtername);

    resp.getPhotoResponse(data);
  } else if (url.match(/\/api\/getfile\/([0-9]+)/) && method == "GET") {
    const id = getIdFromUrl(url);
    const data = getPhotoById(id);
    resp.getPhotoResponse(data);
  }
};

module.exports = photoRouter;
