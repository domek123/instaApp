const {
  registerUser,
  authUser,
  loginUser,
} = require("../controller/userController");
const { userArray } = require("../model");
const { HttpResp } = require("../HttpResponse");
require("../utils/getRequestedData");
const usersRouter = async (request, response) => {
  const resp = new HttpResp(response);
  const { method, url } = request;
  if (url == "/api/user/register" && method == "POST") {
    let data = await getRequestData(request);
    data = await registerUser(JSON.parse(data));
    resp.getResponse(data);
  } else if (
    url.match(/\/api\/user\/confirm\/([A-Za-z0-9]+)/) &&
    method == "GET"
  ) {
    const data = await authUser(url.split("/").pop());
    resp.getResponse(data);
  } else if (url == "/api/user/login" && method == "POST") {
    let data = await getRequestData(request);
    resp.getResponse(await loginUser(JSON.parse(data)));
  } else if (url.match(/\/api\/user\/([A-Za-z0-9@.]+)/) && method == "GET") {
    const userEmail = userArray.find(
      (user) => user.getEmail() == url.split("/").pop()
    );
    resp.getResponse({ code: 200, response: userEmail });
  }
};

module.exports = usersRouter;
