const express = require("express");
const Router = express.Router();
const { programHandler } = require("../handler");
const { jwtAuth } = require("../middleware");

Router.post("/insert", jwtAuth.VerifyTokenAdmin, programHandler.Insert);
Router.get("/detail/:id", jwtAuth.VerifyTokenAdmin, programHandler.GetDetail);
Router.patch(
  "/start-program/:id",
  jwtAuth.VerifyTokenAdmin,
  programHandler.StartProgram
);
Router.patch(
  "/end-program/:id",
  jwtAuth.VerifyTokenAdmin,
  programHandler.EndProgram
);

module.exports = Router;
