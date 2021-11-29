export {};
/* Module dependencies. */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tasks = new Schema({
    PlantID:            { type: String, required: true },
    title:           { type: String, required: true, match: /[A-Za-z0-9 ]/ },
    description:    { type: String },

    // Should be increased after a day or two.
    reward:             { type: Number, required: true },
    created:            { type: Date, default: Date.now },
    // default to current date + 1 day
    completeBy:         { type: Date, default: new Date(new Date().getTime() + 60 * 60 * 24 * 1000) },

    // Booking information, needs to be updated when a person "books a task".
    // Tasks should be defaulted to the person "owning the plant"
    isBooked:           { type: Boolean, default: false},
    isPublic:           { type: Boolean, default: false},

    bookedBy:           { type: String, default: 'none'},
    bookedTime:         { type: Date },

    completed:          { type: Boolean, default: false},
});


module.exports = mongoose.model('Tasks', Tasks)

/*
"PlantID": "544528292",
"taskName": "Fill water",
"taskDescription": "Too little water, I need more",
"createTime": {"$date":{"$numberLong":"1637279269047"}},
"points": 50,
"isBooked": false,
"isPublic": false,
"bookedBy": "none",
"bookedTime": null

{"_id":{"$oid":"6196e6255460e8da90f4d1a2"},"PlantID":"544528292","moisture":"25","humidity":"25","light":"4","temperature":"27","ts":{"$date":{"$numberLong":"1637279269047"}},"__v":{"$numberInt":"0"}}

 */

