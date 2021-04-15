const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Admin = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    phone : {
      type : String,
      required : true,
      unique: true
    },
    role: {
          type: String,
          default:"Admin"
        }
    
  },
);

const AdminsList = mongoose.model("Admin", Admin);
module.exports = {AdminsList , Admin} ;
