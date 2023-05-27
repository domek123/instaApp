const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const encryptPass = async (password) => {
  let encryptedPassword = await bcrypt.hash(password, 10);
  return { code: 200, message: encryptedPassword };
};

const decryptPass = async (userpass, encrypted) => {
  let decrypted = await bcrypt.compare(userpass, encrypted);
  return { code: 200, message: decrypted };
};

const createToken = async (email, password) => {
  let token = await jwt.sign(
    {
      email,
      password,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "10m",
    }
  );
  return { code: 200, message: token };
};
const verifyToken = async (token) => {
  try {
    let decoded = await jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  } catch (ex) {
    return null;
  }
};

module.exports = { encryptPass, decryptPass, createToken, verifyToken };
