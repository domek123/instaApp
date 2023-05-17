const { getMetadata, filterPhoto } = require("../controller/filtersController");
require("../utils/getRequestedData");
const { HttpResp } = require("../utils/HttpResponse");
const filtersRouter = async (request, res) => {
  const resp = new HttpResp(res);
  if (
    request.url.match(/\/api\/filters\/metadata\/([0-9]+)/) &&
    request.method == "GET"
  ) {
    const id = request.url.split("/").pop();
    resp.getStringifyResponse(await getMetadata(id));
  } else if (request.url == "/api/filters" && request.method == "PATCH") {
    let data = await getRequestData(request);
    resp.getStringifyResponse(await filterPhoto(data));
  } else if (
    request.url.match(/\/api\/getfile\/([0-9]+)/) &&
    request.method == "GET"
  ) {
  } else if (
    request.url.match(/\/api\/photos\/([0-9]+)/) &&
    request.method == "GET"
  ) {
  }
};

module.exports = filtersRouter;
