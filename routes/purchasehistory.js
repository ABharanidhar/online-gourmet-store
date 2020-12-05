var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var pHistory = require("../models/purchasehistory");
var auth = require("../middleware/auth");

const PurchaseHistory = mongoose.model(
  "PurchaseHistory",
  pHistory.purchasehistory
);

router.get("/", auth, function (req, res, next) {
  PurchaseHistory.find(
    { userId: req.user.id },
    {
      __v: 0,
    },
    (err, ph) => {
      if (err) {
        res.status(500).json({ errorMessage: err });
      }
      res.status(200).json(ph);
    }
  );
});

module.exports = router;
