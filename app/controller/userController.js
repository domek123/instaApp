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
    const { name, lastName, email, password } = data;
    if (
      name != "" &&
      lastName != "" &&
      validateEmail(email) &&
      password != ""
    ) {
      if (!userExist(email)) {
        const pass = await encryptPass(password);
        const token = await createToken(email, pass);
        userArray.push(new User(name, lastName, email, pass));

        return {
          message: `skopiuj poniższy link do przeglądarki
                    http://localhost:3000/api/user/confirm/${token}
                    w celu potwierdzenia konta
                    Uwaga: link jest ważny przez godzinę`,
        };
      } else {
        return { message: "user o podanym mailu istnieje" };
      }
    } else {
      return { message: "niepoprawne dane" };
    }
  },
  authUser: async (token) => {
    const verifiedToken = await verifyToken(token);
    if (verifiedToken != null) {
      const { email } = verifiedToken;
      userArray.find((user) => user.getEmail() == email).AuthUser();
      createFolder(email);
    }
    return verifiedToken;
  },
  loginUser: async (data) => {
    const { email, password } = data;
    const user = userArray.find((user) => user.getEmail() == email);
    console.log(user);
    if (user != undefined && decryptPass(password, user.getPassword())) {
      const token = await createToken(email, user.getPassword());
      return { token };
    }
  },
};
