const { HttpResp } = require("../utils/HttpResponse");
require("../controller/tagsController");
const {
  getSelectedTag,
  getTags,
  addTag,
  getRawTags,
} = require("../controller/tagsController");
require("../utils/getRequestedData");

const TagsRouter = async (request, response) => {
  const resp = new HttpResp(response);
  if (request.url == "/api/tags/raw" && request.method == "GET") {
    resp.getStringifyResponse(getRawTags());
  } else if (request.url == "/api/tags" && request.method == "GET") {
    resp.getStringifyResponse(getTags());
  } else if (
    request.url.match(/\/api\/tags\/([0-9]+)/) &&
    request.method == "GET"
  ) {
    const id = request.url.split("/").pop();
    resp.getStringifyResponse(getSelectedTag(id));
  } else if (request.url == "/api/tags" && request.method == "POST") {
    let data = await getRequestData(request);
    const { name, popularity } = JSON.parse(data);
    const msg = addTag(name, popularity);
    resp.getResponse(msg);
  }
};
module.exports = TagsRouter;
