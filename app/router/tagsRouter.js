const { HttpResp } = require("../HttpResponse");
const {
  getSelectedTag,
  getTags,
  addTag,
  getRawTags,
} = require("../controller/tagsController");
require("../utils/getRequestedData");

const TagsRouter = async (request, response) => {
  const resp = new HttpResp(response);
  const { method, url } = request;
  if (url == "/api/tags/raw" && method == "GET") {
    resp.getResponse(getRawTags());
  } else if (url == "/api/tags" && method == "GET") {
    resp.getResponse(getTags());
  } else if (url.match(/\/api\/tags\/([0-9]+)/) && method == "GET") {
    const id = url.split("/").pop();
    resp.getResponse(getSelectedTag(id));
  } else if (url == "/api/tags" && method == "POST") {
    let data = await getRequestData(request);
    const { name, popularity } = JSON.parse(data);
    const msg = addTag(name, popularity);
    resp.getResponse(msg);
  }
};
module.exports = TagsRouter;
