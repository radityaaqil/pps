const express = require("express");
const Router = express.Router();
const { programHandler } = require("../handler");
const { jwtAuth } = require("../middleware");

Router.post("/", jwtAuth.VerifyTokenAdmin, programHandler.Insert);
Router.patch("/:id", jwtAuth.VerifyTokenAdmin, programHandler.Update);
Router.get("/:id", jwtAuth.VerifyTokenAdmin, programHandler.GetDetail);
Router.get("/", jwtAuth.VerifyTokenAdmin, programHandler.GetList);
Router.patch(
  "/start/:id",
  jwtAuth.VerifyTokenAdmin,
  programHandler.StartProgram
);
Router.patch("/end/:id", jwtAuth.VerifyTokenAdmin, programHandler.EndProgram);

module.exports = Router;
