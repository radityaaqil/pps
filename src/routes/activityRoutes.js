const express = require("express");
const Router = express.Router();
const { activityHandler } = require("../handler");
const { jwtAuth } = require("../middleware");

Router.post("/insert", jwtAuth.VerifyToken, activityHandler.Insert);

module.exports = Router;
