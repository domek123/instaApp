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
  const headerAuth = request.headers.authorization;
  if (headerAuth && headerAuth.startsWith("Bearer")) {
    // czytam dane z nagłowka
    let token = headerAuth.split(" ")[1];
    if (verifyToken(token) != null) {
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
    } else {
      resp.getResponse(
        JSON.stringify({ code: 401, message: "wrong authentication" })
      );
    }
  }
};
module.exports = TagsRouter;
