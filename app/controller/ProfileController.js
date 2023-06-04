const { userArray } = require("../model");

module.exports = {
  getUser: (token) => {
    const user = userArray.find((user) => user.getToken() == token);
    if (user != undefined) {
      return { code: 200, response: user };
    } else {
      return { code: 404, response: "brak usera" };
    }
  },
  UpdateUser: (data, token) => {
    const { name, email } = JSON.parse(data);
    console.log(name, email);
    const user = userArray.find((user) => user.getToken() == token);
    if (user != undefined) {
      const checkUser = userArray.find((user) => user.getEmail() == email);
      if (checkUser == undefined || checkUser != user) {
        user.setEmail(email);
        user.setName(name);
        return { code: 200, response: user };
      } else {
        return { code: 403, response: "podany mail juz istnieje w bazie" };
      }
    } else {
      return { code: 404, response: "brak usera" };
    }
  },
};
