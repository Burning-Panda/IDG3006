export{};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Microcontroller = new Schema({
    name:         { type: String, default: null },
    token:        { type: String, required: true },
    verification: { type: String, required: true }
});


module.exports = mongoose.model("Microcontroller", Microcontroller)
