var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var pHistory = require("../models/purchasehistory");
var auth = require("../middleware/auth");
const { log } = require("debug");

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

router.route("/save").post((req, res, next) => {
  console.log(req.body._data);
  //let ress = JSON.stringify(req.body);
  //console.log("aaa" + ress);

  PurchaseHistory.create(req.body._data, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

module.exports = router;
