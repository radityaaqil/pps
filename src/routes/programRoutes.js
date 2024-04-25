const express = require("express");
const Router = express.Router();
const { programHandler } = require("../handler");
const { jwtAuth } = require("../middleware");

Router.post("/insert", jwtAuth.VerifyTokenAdmin, programHandler.Insert);
Router.get("/detail/:id", jwtAuth.VerifyTokenAdmin, programHandler.GetDetail);

module.exports = Router;
