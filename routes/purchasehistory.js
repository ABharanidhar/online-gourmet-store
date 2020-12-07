var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var pHistory = require("../models/purchasehistory");
var auth = require("../middleware/auth");

var cart = require("../models/cart");

const Cart = mongoose.model("Cart", cart.cart);

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
  let ress = req.body._data;
  //console.log("aaa" + ress);

  PurchaseHistory.create(req.body._data, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(ress);

      Cart.findOneAndUpdate(
        { userId: ress.userId },
        {
          products: [],
        },
        (err) => {
          if (err) {
            res.status(500).json({ errorMessage: err });
          }
        }
      );

      res.json(data);
    }
  });
});

module.exports = router;
