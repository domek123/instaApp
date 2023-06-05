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
  getImagesFromAlbum,
} = require("../controller/jsonController");

require("../utils/getRequestedData");
const { HttpResp } = require("../HttpResponse");
const { verifyToken } = require("../utils/userUtils");

const getIdFromUrl = (url) => {
  const id = url.split("/").pop();
  return id;
};

const photoRouter = async (request, response) => {
  const resp = new HttpResp(response);
  const { method, url } = request;
  if (url == "/api/photos" && method == "GET") {
    resp.getResponse(getAll());
  } else if (url.match(/\/api\/photos\/([0-9]+)/) && method == "GET") {
    let data = getSelected(getIdFromUrl(url));
    resp.getResponse(data);
  } else if (url.match(/\/api\/photos\/tags\/([0-9]+)/) && method == "GET") {
    const id = getIdFromUrl(url);
    const returnedData = getTags(id);
    resp.getResponse(returnedData);
  } else if (url.match(/\/api\/photos\/([a-zA-Z0-9@.]+)/) && method == "GET") {
    const albumName = url.split("/").pop();
    console.log(albumName);
    const data = getImagesFromAlbum(albumName);
    console.log(data);
    resp.getResponse(data);
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
  const headerAuth = request.headers.authorization;
  if (headerAuth && headerAuth.startsWith("Bearer")) {
    // czytam dane z nagłowka
    let token = headerAuth.split(" ")[1];
    if (verifyToken(token) != null) {
      if (url == "/api/photos" && method == "POST") {
        savePhoto(request, "", response);
      } else if (url.match(/\/api\/photos\/([0-9]+)/) && method == "DELETE") {
        const data = deletePhoto(getIdFromUrl(url));
        resp.getResponse(data);
      } else if (url == "/api/photos" && method == "PATCH") {
        let data = await getRequestData(request);
        const { id, change } = JSON.parse(data);
        const returnedData = changePhoto(id, change);
        resp.getResponse(returnedData);
      } else if (url == "/api/photos/tags" && method == "PATCH") {
        let data = await getRequestData(request);
        const { id, name, popularity } = JSON.parse(data);
        const returnedData = addTag(id, name, popularity);
        resp.getResponse(returnedData);
      } else if (url == "/api/photos/tags/mass" && method == "PATCH") {
        let data = await getRequestData(request);
        const { id, tags } = JSON.parse(data);
        const returnedData = addTags(id, tags);
        resp.getResponse(returnedData);
      }
    } else {
      resp.getResponse(
        JSON.stringify({ code: 401, response: "wrong authentication" })
      );
    }
  }
};

module.exports = photoRouter;
