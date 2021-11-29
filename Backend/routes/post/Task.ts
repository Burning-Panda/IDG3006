import TaskClass, {iTaskClass} from "../../utils/dto/Tasks";

const express = require('express');
const router = express.Router();
import {parseMany, parseOne} from "../../utils/validation/validate_post_data";
import Measurement, {IMeasurements} from "../../utils/dto/Measurments";
import {isArray} from 'lodash';

const escape = require('../../utils/validation/escape-string-regexp');
const Measurements = require('../../models/Measurments');

const at = require('../../config/tokens');



router.post('/', async (req, res) => {

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
        let body = req.body.tasks;

        // Make sure that the date is valid and in the correct format.
        let data: iTaskClass | iTaskClass[]


        /*
        // Checks if the post data is an array or not. Then parses it and gets it ready for the database.
        // @ts-ignore
        if (arr) {data = parseMany(acceptableKeys, body)}
        // @ts-ignore
        else {data = parseOne(acceptableKeys, body)}
         */
        const arr = isArray(body)

        data = arr ? body.map(plant => TaskClass.validate(plant)) : TaskClass.validate(body);


        /* ################ *\
        * Response handler *
       \* ################ */
        // If data is missing, respond now
        if (!data) res.status(400).send('Bad Request');





        // NOTE: Can perhaps not send anything?
        else {
            console.log(data)
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
    }
});

module.exports = router;
