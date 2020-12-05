var mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name : String,
    image : String,
    category : String,
    description : String,
    quantity : Number,
    price : Number,
    available: Boolean,
}, {
        collection: 'products'
    });

module.exports = mongoose.model("Product", productSchema);