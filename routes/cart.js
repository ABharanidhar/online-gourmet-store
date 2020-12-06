var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var cart = require("../models/cart");
var pHistory = require("../models/purchasehistory");
var auth = require("../middleware/auth");
const { log } = require("debug");

const Cart = mongoose.model("Cart", cart.cart);

const PurchaseHistory2 = mongoose.model(
  "PurchaseHistory",
  pHistory.purchasehistory
);

router.get("/", auth, function (req, res, next) {
  Cart.findOne(
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

router.put("/updateproducts/:id", auth, function (req, res, next) {
  const { products } = req.body;

  Cart.findByIdAndUpdate(
    req.params.id,
    { products: products },

    (err, cartDetails) => {
      if (err) {
        res.status(500).json({ errorMessage: err });
      }
      res.status(200).json(cartDetails);
    }
  );
});

//TODO: delete product from checkout.
router.delete("/removeproduct/:id/:productId", auth, function (req, res, next) {
  Cart.findByIdAndUpdate(
    req.params.id,
    { $pull: { products: { id: req.params.productId } } },
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
