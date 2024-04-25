const jwt = require("jsonwebtoken");
const { myCache } = require("../helper");
const jwtSecret = process.env.JWT_SECRET;

const SignJWT = (data, expiry) => {
  return jwt.sign(data, jwtSecret, { expiresIn: expiry });
};

const VerifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1] ? authHeader.split(" ")[1] : authHeader;
  } else {
    token = null;
  }
  let key = jwtSecret;
  try {
    let decode = jwt.verify(token, key);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

const VerifyTokenAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1] ? authHeader.split(" ")[1] : authHeader;
  } else {
    token = null;
  }
  let key = jwtSecret;
  try {
    let decode = jwt.verify(token, key);
    req.user = decode;
    if (req.user.role !== "ADMIN") {
      return res.status(401).send({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

const VerifyLastToken = (req, res, next) => {
  const { timecreated, email } = req.user;
  let isiCache = myCache.get(email);
  if (timecreated === isiCache.timecreated) {
    next();
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = {
  SignJWT,
  VerifyLastToken,
  VerifyToken,
  VerifyTokenAdmin,
};
