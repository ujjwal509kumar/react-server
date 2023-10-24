const otpcheck = require("../controllers/Otpcheck");
const express = require("express");
const otpRouter = express.Router();

otpRouter.post("/", otpcheck);

module.exports = otpRouter;