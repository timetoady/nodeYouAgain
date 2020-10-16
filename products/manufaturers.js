const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Manufacturers = new Schema({
  name: String,
  address: String,
  phone: Number,
});

module.exports = mongoose.model("Manufacturers", Manufacturers);
