const { getMetadata, filterPhoto } = require("../controller/filtersController");
require("../utils/getRequestedData");
const { HttpResp } = require("../HttpResponse");
const { verifyToken } = require("../utils/userUtils");
const filtersRouter = async (request, res) => {
  const resp = new HttpResp(res);
  const { method, url } = request;
  const headerAuth = request.headers.authorization;
  if (headerAuth && headerAuth.startsWith("Bearer")) {
    // czytam dane z nagłowka
    let token = headerAuth.split(" ")[1];
    if (verifyToken(token) != null) {
      if (url.match(/\/api\/filters\/metadata\/([0-9]+)/) && method == "GET") {
        const id = url.split("/").pop();
        resp.getResponse(await getMetadata(id));
      } else if (url == "/api/filters" && method == "PATCH") {
        let data = await getRequestData(request);
        resp.getResponse(await filterPhoto(data));
      }
    } else {
      resp.getResponse(
        JSON.stringify({ code: 401, message: "wrong authentication" })
      );
    }
  }
};

module.exports = filtersRouter;
