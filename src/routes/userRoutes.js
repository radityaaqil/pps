const express = require("express");
const Router = express.Router();
const { userHandler } = require("../handler");

Router.post("/register", userHandler.Register);

module.exports = Router;
