const login  = require("../controllers/UserLogin");
const express = require("express");
const loginRouter = express.Router();

loginRouter.post("/", login);

module.exports = loginRouter;