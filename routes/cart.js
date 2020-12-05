var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var cart = require("../models/cart");
var pHistory = require("../models/purchasehistory");
var auth = require("../middleware/auth");

const Cart = mongoose.model("Cart", cart.cart);

const PurchaseHistory = mongoose.model(
  "PurchaseHistory",
  pHistory.purchasehistory
);

router.get("/", auth, function (req, res, next) {
  Cart.find(
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

router.post("/checkout", auth, function (req, res, next) {
  req.body.userId = req.user.id;
  let products = new PurchaseHistory(req.body);

  products.save((err) => {
    if (err) {
      res.status(500).json({ errorMessage: err });
    }
    res.status(200).json({ message: "success" });
  });
});

router.post("/addtocart", auth, function (req, res, next) {
  req.body.userId = req.user.id;
  let products = new Cart(req.body);

  products.save((err) => {
    if (err) {
      res.status(500).json({ errorMessage: err });
    }
    res.status(200).json({ message: "success" });
  });
});
mongoose.set("debug", true);
router.put("/updateproducts/:cardId", auth, function (req, res, next) {
  const { products } = req.body;

  Cart.findOneAndUpdate(
    { _id: req.params.cardId },
    { products: products },
    (err, cartDetails) => {
      if (err) {
        res.status(500).json({ errorMessage: err });
      }
      console.log(cartDetails);
      res.status(200).json(cartDetails);
    }
  );
});

module.exports = router;
