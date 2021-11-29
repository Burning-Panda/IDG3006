const express = require('express');
const router = express.Router();
import {parseMany, parseOne} from "../../utils/validation/validate_post_data";
import Measurement, {IMeasurements} from "../../utils/dto/Measurments";
import {isArray} from 'lodash';
//@ts-ignore
//import MemoryDatabase from "./../../utils/database/database";


const escape = require('../../utils/validation/escape-string-regexp');
const Measurements = require('../../models/Measurments');

const at = require('../../config/tokens');



router.post('/', async (req, res) => {
    // Setup
    const acceptableKeys = [
        'PlantID',
        'moisture',
        'humidity',
        'light',
        'temperature'
    ];


    // Handle errors or missing data
    req.accepts('application/json');

    if(!req.body || !req.body.measurements) {
        res.status(400).send('Bad Request');
    }
    else if(!req.body.access_token && (req.body.access_token == at.access_token)) {
        res.status(401).send('Unauthorized')
    }


    // Everything is validated, lets goooo
    else {
        // Get the data from the body
        let body = req.body.measurements;

        // Make sure that the date is valid and in the correct format.
        let data: IMeasurements | Array<IMeasurements> | boolean


        /*
        // Checks if the post data is an array or not. Then parses it and gets it ready for the database.
        // @ts-ignore
        if (arr) {data = parseMany(acceptableKeys, body)}
        // @ts-ignore
        else {data = parseOne(acceptableKeys, body)}
         */
        const arr = isArray(body)

        data = arr ? body.map(plant => Measurement.validate(plant)) : Measurement.validate(body);


        /* ################ *\
        * Response handler *
       \* ################ */
        // If data is missing, respond now
        if (!data) res.status(400).send('Bad Request');





        // NOTE: Can perhaps not send anything?
        else {
            /*
            //console.log(data)
            // @ts-ignore

            let newData: any;
            newData = arr
                //@ts-ignore
                ? data.map(measurement => {
                    MemoryDatabase.measurements(
                        measurement.PlantID,
                        measurement.moisture,
                        measurement.humidity,
                        measurement.light,
                        measurement.temperature
                    )
                }) // @ts-ignore
                : MemoryDatabase.measurements(data.PlantID, data.moisture, data.humidity, data.light, data.temperature);
            // If the data is an array, then we need to save each one.

            console.log(newData)
            * */



            if(data) {


                try {
                    arr ? await Measurements.insertMany(data)
                        : await Measurements.create(data)

                    res.status(201).send('Resource Successfully Created');
                }
                catch (e) {
                    console.log(e)
                    res.status(400).send('Bad Request').end();
                }
            }
            else if(!data) {
                res.status(400).send('Bad Request').end();
            }
            else res.status(500).send('Something went wrong, it has been logged').end();
        }
    }
});


// TODO: A function to add a new task to the database if some value is below a certain threshold.
// A function to add a new task to the database if some value is below a certain threshold.
type iThresholds = { min: number; max: number }
const thresholds: iThresholds = {min: 10, max: 30};

function createNewTaskFromValue(value:number | string, threshold: iThresholds, plantID: number, type: string) {
    const types = {
        moisture: {
            title: 'Fill water',
            description: 'The plant needs water'
        },
        humidity: 'Humidity',
        light: 'Light',
        temperature: 'Temperature'
    }

    if(value < threshold.min || value > threshold.max) {
        // Create a new task

    }
}


module.exports = router;
