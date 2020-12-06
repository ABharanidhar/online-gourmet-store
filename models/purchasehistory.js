var mongoose = require("mongoose");
var dateformat = require("dateformat");

const PurchaseHistorySchema = new mongoose.Schema({
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

  totalPrice: {
    type: Number,
    required: "Missing total price",
  },
});

const purchaseHistory = mongoose.model(
  "PurchaseHistory",
  PurchaseHistorySchema
);
module.exports = purchaseHistory;
