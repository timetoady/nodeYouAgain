const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let ControllerSchema = new Schema({
    name: String,
    category: String,
    cost: Number,
    quantity: Number,
    manufacturer: [{ type: Schema.Types.ObjectId, ref: 'Manufacturers' }]
    
})

module.exports = mongoose.model('Controller', ControllerSchema)