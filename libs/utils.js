// este archivo centreliza funciones


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const utils = {
  /**
   * Esta función se encarga de encriptar un string
   * @param {String} password Contraseña a encriptar
   * @returns {String} Contraseña encriptada
   */
  hashPassword: (password) =>
    bcrypt.hashSync(password, parseInt(process.env.COST_FACTOR)),
  /**
   * Genera un nuevo JWT
   * @param {object} data
   * @returns {string} JWT
   */
  generateJwt: (data) =>
    jwt.sign(data, process.env.JWT_PASSWORD, { expiresIn: "7d" }),
};
module.exports = utils;