var mongoose = require("mongoose");
var dateformat = require("dateformat");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: "Missing user id",
  },
  products: {
    type: Array,
  },
  purchaseDate: {
    type: Date,
    default: dateformat(new Date(), "yyyy-mm-dd HH:MM:ss"),
  },
});

const cart = mongoose.model("Cart", CartSchema);
module.exports = cart;
