const forgottoken = require("../controllers/ForgotToken");
const express = require("express");
const forgottokenrouter = express.Router();

forgottokenrouter.post("/",forgottoken);

module.exports = forgottokenrouter;