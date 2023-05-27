const {
  registerUser,
  authUser,
  loginUser,
} = require("../controller/userController");
const { userArray } = require("../model");
const { HttpResp } = require("../utils/HttpResponse");
require("../utils/getRequestedData");
const usersRouter = async (request, response) => {
  const resp = new HttpResp(response);
  if (request.url == "/api/user/register" && request.method == "POST") {
    let data = await getRequestData(request);
    resp.getResponse(await registerUser(JSON.parse(data)));
  } else if (
    request.url.match(/\/api\/user\/confirm\/([A-Za-z0-9]+)/) &&
    request.method == "GET"
  ) {
    const data = await authUser(request.url.split("/").pop());
    resp.getCheckedResponse(data);
  } else if (request.url == "/api/user/login" && request.method == "POST") {
    let data = await getRequestData(request);
    resp.getResponse(await loginUser(JSON.parse(data)));
  } else if (request.url == "/api/user" && request.method == "GET") {
    resp.getResponse(userArray);
  }
};

module.exports = usersRouter;
