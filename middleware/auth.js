var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  const token = req.header("auth-token");
  const jwtSecret = "jwtsecret";

  if (!token) {
    res.status(401).json({ msg: "No token provided for authorization" });
    return;
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Not a valid token for authorization" });
  }
});

module.exports = router;
