var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var cart = require("../models/cart");

var user = require("../models/user");

const User = mongoose.model("User", user.user);

const CartInit = mongoose.model("Cart", cart.cart);

const jwtSecret = "jwtsecret";

router.post("/login", function (req, res, next) {
  const { user, password } = req.body;

  User.findOne({ email: user }, (err, user) => {
    if (err) {
      res.status(500).json({ errorMessage: err });
    }
    if (!user) {
      res.status(203).json({ errorMessage: "Invalid Credentials" });
    } else {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          res.status(203).json({ errorMessage: "Invalid Credentials" });
        }
        jwt.sign(
          {
            id: user.id,
          },
          jwtSecret,
          { expiresIn: 36000 },
          (err, token) => {
            if (err) {
              res.status(500).json({ errorMessage: err });
            }
            res.status(200).json({
              token,
              user: {
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    }
  });
});

router.post("/register", function (req, res, next) {
  let newUser = new User(req.body);
  const { email, user, password } = req.body;
  console.log(newUser);
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log("ERROR: Unable to find user email" + err);
      res.status(500).json({ errorMessage: err });
    }
    if (user) {
      res.status(203).json({ errorMessage: "Email already exists" });
    } else {
      //encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log("ERROR: Unable to encrypt user password" + err);
            res.status(500).json({ errorMessage: err });
          }
          newUser.password = hash;

          newUser.save((err, user) => {
            if (err) {
              console.log("ERROR: Unable to save new user" + err);
              res.status(500).json({ errorMessage: err });
            }

            jwt.sign(
              {
                id: user.id,
              },
              jwtSecret,
              { expiresIn: 36000 },
              (err, token) => {
                if (err) {
                  res.status(203).json({ errorMessage: err });
                }
                let cart = new CartInit();
                cart.userId = user.id;
                cart.products = [];
                cart.save((err) => {
                  if(err) {
                    console.log("Unable to create cart");
                  }
                })
                res.status(200).json({ message: "User registered Sucess!" });
              }
            );
          });
        });
      });
    }
  });
});

module.exports = router;
