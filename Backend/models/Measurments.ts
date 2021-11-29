export {};
/* Module dependencies. */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Measurements = new Schema({
    ts:             { type: Date, default: Date.now},
    PlantID:        { type: String },
    moisture:       { type: String },
    humidity:       { type: String },
    light:          { type: String },
    temperature:    { type: String },
});



module.exports = mongoose.model('Measurements', Measurements)
