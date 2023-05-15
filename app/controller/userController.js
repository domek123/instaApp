const { userArray, User } = require("../model");
const {
  encryptPass,
  createToken,
  verifyToken,
  decryptPass,
} = require("../utils/userUtils");
const validateEmail = (email) => {
  return email.includes("@") && email.includes(".") && email.length > 3;
};
const userExist = (email) => {
  const userChecked = userArray.findIndex((user) => user.getEmail() == email);
  return userChecked !== -1;
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

        return `skopiuj poniższy link do przeglądarki
                    http://localhost:3000/api/user/confirm/${token}
                    w celu potwierdzenia konta
                    Uwaga: link jest ważny przez godzinę`;
      } else {
        return "user o podanym mailu istnieje";
      }
    } else {
      return "niepoprawne dane";
    }
  },
  authUser: async (token) => {
    const verifiedToken = await verifyToken(token);
    if (verifiedToken != null) {
      const { email } = verifiedToken;
      userArray.find((user) => user.getEmail() == email).AuthUser();
      console.log(userArray);
    }
    return verifiedToken;
  },
  loginUser: async (data) => {
    const { email, password } = data;
    const user = userArray.find((user) => user.getEmail() == email);
    console.log(user);
    if (user != undefined && decryptPass(password, user.getPassword())) {
      const token = await createToken(email, user.getPassword());
      return token;
    }
  },
};
