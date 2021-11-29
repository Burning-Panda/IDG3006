export {};
/* Module dependencies. */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import { v4 as uuidv4 } from 'uuid';

const Plants = new Schema({
    PlantID:            { type: String, required: true, unique: true, default: uuidv4},
    name:               { type: String, required: true, match: /[A-Za-z0-9 ]/ },
    scientificName:     { type: String },
    wateringType:       { type: String },
    lightType:          { type: String },
    temperature:        {
                            min: { type: Number },
                            max: { type: Number }
                        },
    humidity:           {
                            min: { type: Number },
                            max: { type: Number }
                        },
    fertilization:      { type: String },
    difficulty:         { type: Number },
    isTaken:            { type: Boolean, default: false },
    isTakenBy:          { type: String, default: 'none'},
    endTakenDate:       { type: Date, default: null },
});


module.exports = mongoose.model('Plants', Plants)


/*
name
scientific name
watering type (how often)
light type (how much, specific placement)
temperature range (min max)
humidity range (min max)
fertilization type (how often)
difficulty




{
name: "",
scientificName: "",
wateringType: "",
lightType: "",
temperature: {
    min: ,
    max:
},
fertilization: ""
}

{
"name": "Fiona",
"scientificName": "Ficus benjamina",
"wateringType": "Constantly a bit damp",
"lightType": "Even conditions, not direct sunlight",
"temperature": {
    "min": 10,
    "max": 37
},
"fertilization": "Once a year, April, Long-term fertilizer"
}

{
"name": "Groot",
"scientificName": "Pachira aquatica",
"wateringType": "Lots at summertime, little in winter",
"lightType": "Warm and bright, not by radiator",
"temperature": {
    "min": 15,
    "max": 37
},
"fertilization": "Once a year, April, Long-term fertilizer"
}

{
"name": "Grogu",
"scientificName": "Calathea Orbifolia",
"wateringType": "Don't like to dry out, like high humidity",
"lightType": "Medium, filtered light, no direct sunlight",
"temperature": {
    "min": 18,
    "max": 24
},
"fertilization": "Once a month in the summertime, rarer in the winter"
}
{
"name": "Yoda",
"scientificName": "Calathea 'Medallion'",
"wateringType": "Never allow soil to dry completely out, likes high humidity",
"lightType": "Medium, filtered light, no direct sunlight",
"temperature": {
    "min": 18,
    "max": 29
},
"fertilization": "Once a month in the summertime and rarer in the winter"
}

{
"name": "Shrek",
"scientificName": "Ficus Lyrata branched",
"wateringType": "Moderate, dry out between watering",
"lightType": "Like sun at least 4-5 hours daily",
"temperature": {
    "min": 15,
    "max": 18
},
"fertilization": "April, long-term fertilizer"
}

{
"name": "Poison Ivy",
"scientificName": "Heteropanax",
"wateringType": "Moderate, like high humidity",
"lightType": "Sun, filtered light",
"temperature": {
    "min": 10,
    "max": 24
},
"fertilization": "March-September: Once a month"
}

{
"name": "Beast Boy",
"scientificName": "Ficus benjamina",
"wateringType": "Constantly a bit damp",
"lightType": "Even conditions not direct sunlight",
"temperature": {
    "min": 10,
    "max": 37
},
"fertilization": "Once a year April, long-term fertilizer"
}

{
"name": "Gamora",
"scientificName": "Heteropanax",
"wateringType": "Moderate, like high humidity",
"lightType": "Sun, filtered light",
"temperature": {
    "min": 10,
    "max": 24
},
"fertilization": "March-September: Once a month"
}




 */