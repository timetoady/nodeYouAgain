const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let ControllerSchema = new Schema({
    name: String,
    category: String,
    cost: Number,
    quantity: Number,
    // manufacturerID: 
})

module.exports = mongoose.model('Controller', ControllerSchema)