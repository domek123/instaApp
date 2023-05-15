require("../model");
require("../controller/fileController");
require("../controller/jsonController");
const { savePhoto, deletePhoto } = require("../controller/fileController");
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

const getIdFromUrl = (url) => {
  const id = url.split("/").pop();
  return id;
};

const photoRouter = async (request, response) => {
  const resp = new HttpResp(response);
  if (request.url == "/api/photos" && request.method == "GET") {
    response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    response.end(JSON.stringify(getAll()));
  } else if (request.url == "/api/photos" && request.method == "POST") {
    const data = savePhoto(request);
    resp.getResponse(data);
  } else if (
    request.url.match(/\/api\/photos\/([0-9]+)/) &&
    request.method == "GET"
  ) {
    let data = getSelected(getIdFromUrl(request.url));
    resp.getCheckedResponse(data);
  } else if (
    request.url.match(/\/api\/photos\/([0-9]+)/) &&
    request.method == "DELETE"
  ) {
    const data = deletePhoto(getIdFromUrl(request.url));
    resp.getCheckedResponse(data);
  } else if (request.url == "/api/photos" && request.method == "PATCH") {
    let data = await getRequestData(request);
    const { id, change } = JSON.parse(data);
    const returnedData = changePhoto(id, change);
    resp.getCheckedResponse(returnedData);
  } else if (request.url == "/api/photos/tags" && request.method == "PATCH") {
    let data = await getRequestData(request);
    const { id, name, popularity } = JSON.parse(data);
    const returnedData = addTag(id, name, popularity);
    resp.getCheckedResponse(returnedData);
  } else if (
    request.url == "/api/photos/tags/mass" &&
    request.method == "PATCH"
  ) {
    let data = await getRequestData(request);
    const { id, tags } = JSON.parse(data);
    const returnedData = addTags(id, tags);
    resp.getCheckedResponse(returnedData);
  } else if (
    request.url.match(/\/api\/photos\/tags\/([0-9]+)/) &&
    request.method == "GET"
  ) {
    const id = getIdFromUrl(request.url);
    const returnedData = getTags(id);
    resp.getCheckedResponse(returnedData);
  }
};

module.exports = photoRouter;
