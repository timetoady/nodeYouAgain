const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ManufacturerSchema = new Schema({
  manName: String,
  address: String,
  phone: Number,
});

module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
