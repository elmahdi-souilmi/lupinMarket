const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone : {
      type : String,
      required : true,
    },
    address : {
      type : String,
      required : true 
    },
    role :{
       type : String,
       
    },
    verified: {
      type: Boolean,
      default: false,
     },
    identiteFiscale: {
      type: String,

    },
    veryfiedSaller:{
     type: Boolean,
      default: false,
    },
    suspend: {
      type: Boolean,
      default: false,
    },
    accountType: {
          type: String,

    },
    productCount: {
       type: Number,
       default: 0,
       },
    productsales: {
           type: Number,
           default: 0,
         },
    revenue: {
            type: Number,
            default: 0,
             }
  },
);

const UsersList = mongoose.model("User", User);
module.exports = {UsersList, User};
