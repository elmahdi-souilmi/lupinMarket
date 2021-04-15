const mongoose = require("mongoose");

const delivery = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
}, );

const deliverymodel = mongoose.model("DeliveryMan", delivery);
module.exports = {
    deliverymodel,
    delivery
};