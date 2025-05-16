// utils/jwt.js
const { sign } = require("jsonwebtoken");
const dotenv = require('dotenv').config()

const generateToken = (user) => {
    return sign({ username: user.username, id: user.id }, process.env.JWT_STRING);
}

module.exports = { generateToken };
