const mongoose = require('mongoose');
const user = require("./user.model");
const Schema = mongoose.Schema;

const product = new Schema({
    picture:{
        type: String,
        required: true,
    },
    label :{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    saler :{
        type:user.User,
        required: true,
    },

})
const productModel = mongoose.model("product", product);
module.exports = {
    productModel,
    product
};