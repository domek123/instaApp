const { userArray, User } = require("../model");
const { createFolder } = require("./fileController");
const {
  encryptPass,
  createToken,
  verifyToken,
  decryptPass,
} = require("../utils/userUtils");

const validateEmail = (email) => {
  return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
};
const userExist = (email) => {
  return userArray.findIndex((user) => user.getEmail() == email) !== -1;
};
module.exports = {
  registerUser: async (data) => {
    const { name, email, password } = data;
    if (name != "" && validateEmail(email) && password != "") {
      if (!userExist(email)) {
        const pass = await encryptPass(password);
        const token = await createToken(email, pass);
        userArray.push(new User(name, email, pass));

        return {
          code: 200,
          response: `http://192.168.0.176:3000/api/user/confirm/${token}`,
        };
      } else {
        return { code: 409, response: "user o podanym mailu istnieje" };
      }
    } else {
      return { code: 400, response: "niepoprawne dane" };
    }
  },
  authUser: async (token) => {
    const verifiedToken = await verifyToken(token);

    if (verifiedToken != null) {
      const { email } = verifiedToken;
      const user = userArray.find((user) => user.getEmail() == email);
      if (user != undefined) {
        user.AuthUser();
        createFolder(email);
        return { code: 200, response: verifiedToken };
      } else {
        return { code: 404, response: "brak usera" };
      }
    } else {
      return { code: 401, response: "token wygasł" };
    }
  },
  loginUser: async (data) => {
    const { email, password } = data;
    const user = userArray.find((user) => user.getEmail() == email);

    if (
      user != undefined &&
      (await decryptPass(password, user.getPassword()))
    ) {
      let token = await createToken(email, user.getPassword());
      if (user.getToken() != "") {
        token = user.getToken();
      }
      user.setToken(token);
      return { code: 200, response: token };
    } else {
      return { code: 401, response: "nie udalo sie zalogować" };
    }
  },
};
