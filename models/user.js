var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Missing Name",
  },
  email: {
    type: String,
    required: "Missing Email",
  },
  password: {
    type: String,
    required: "Missing Password",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("User", UserSchema);
module.exports = user;
