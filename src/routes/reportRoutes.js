const express = require("express");
const Router = express.Router();
const { reportHandler } = require("../handler");
const { jwtAuth } = require("../middleware");

Router.post("/", jwtAuth.VerifyToken, reportHandler.Insert);
// Router.patch("/:id", jwtAuth.VerifyToken, reportHandler.Update);

module.exports = Router;
