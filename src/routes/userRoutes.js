const express = require("express");
const Router = express.Router();
const { userHandler } = require("../handler");
const { jwtAuth } = require("../helper");

Router.post("/register", userHandler.Register);
Router.get(
  "/verification",
  jwtAuth.VerifyToken,
  jwtAuth.VerifyLastToken,
  userHandler.VerifyAccount
);
Router.post("/login", userHandler.Login);

module.exports = Router;
