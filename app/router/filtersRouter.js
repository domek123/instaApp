const { getMetadata, filterPhoto } = require("../controller/filtersController");
require("../utils/getRequestedData");
const { HttpResp } = require("../HttpResponse");
const filtersRouter = async (request, res) => {
  const resp = new HttpResp(res);
  const { method, url } = request;
  if (url.match(/\/api\/filters\/metadata\/([0-9]+)/) && method == "GET") {
    const id = url.split("/").pop();
    resp.getResponse(await getMetadata(id));
  } else if (url == "/api/filters" && method == "PATCH") {
    let data = await getRequestData(request);
    resp.getResponse(await filterPhoto(data));
  }
};

module.exports = filtersRouter;
