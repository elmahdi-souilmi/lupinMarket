const mongoose = require("mongoose");
const user = require("./user.model");
const product = require("./product.model");
const Schema = mongoose.Schema;

const Command = new Schema (
    {

      client: {
      type: user.User,
      required: true,
      },
      product: {
        type:product.product
      },
      ValidityState: {
        type: Boolean,
        default: false
      }

});

const commandModel = mongoose.model("Command", Command);
module.exports = {
  commandModel,
  Command
};