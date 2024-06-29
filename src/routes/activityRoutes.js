const express = require("express");
const Router = express.Router();
const { activityHandler } = require("../handler");
const { jwtAuth } = require("../middleware");

Router.post("/", jwtAuth.VerifyToken, activityHandler.Insert);
Router.patch("/:id", jwtAuth.VerifyToken, activityHandler.Update);

module.exports = Router;
