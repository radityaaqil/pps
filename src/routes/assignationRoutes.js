const express = require("express");
const Router = express.Router();
const { assignationHandler } = require("../handler");
const { jwtAuth } = require("../middleware");

Router.post(
  "/assign",
  jwtAuth.VerifyTokenAdmin,
  assignationHandler.AssignProgram
);

module.exports = Router;
