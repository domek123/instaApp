const { getUser, UpdateUser } = require("../controller/ProfileController");
const { HttpResp } = require("../HttpResponse");
const getRequestedData = require("../utils/getRequestedData")
const {savePhoto} = require("../controller/fileController")
const { verifyToken } = require("../utils/userUtils");
const profileRouter = async(request,response)=> {
    const {url,method} = request
    const resp = new HttpResp(response)
    const headerAuth = request.headers.authorization;
    if (headerAuth && headerAuth.startsWith("Bearer")) {
        // czytam dane z nagłowka
        let token = headerAuth.split(" ")[1];
        if (verifyToken(token) != null) { 
            if(url == "/api/profile" && method == "GET"){
                resp.getResponse(getUser(token))
            }else if(url == "/api/profile" && method == "PATCH"){
                let data = await getRequestedData(request)
                resp.getResponse(UpdateUser(data,token))

            }else if(url == "/api/profile" && method == "POST"){
                savePhoto(request);
                response.writeHead(200, {
                  "Content-Type": "text/plain;charset=utf-8",
                });
            }else if(url == "/api/logout" && method == "POST"){

            }
            
        } else {
            resp.getResponse(JSON.stringify({ code: 401, message: "wrong authentication" }));
        }
}}

module.exports = profileRouter