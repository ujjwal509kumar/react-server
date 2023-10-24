const register  = require("../controllers/UserRegestration");
const express = require("express");
const registerRouter = express.Router();

registerRouter.post("/", register);

module.exports = registerRouter;