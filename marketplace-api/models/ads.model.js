const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const Ads = new Schema(
  {
    startdate: {
      type: Date,
      required: true,
    },
    enddate: {
          type: Date,
          required: true,
        },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    showen: {
         type: Boolean,
         default: false,
       }
  },
  {
    versionKey: false
}
);

const AdsList = mongoose.model("Ads", Ads);
module.exports = AdsList;
