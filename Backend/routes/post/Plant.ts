import {IMeasurements} from "../../utils/dto/Measurments";
import {parseMany, parseOne} from "../../utils/validation/validate_post_data";
const Plants = require("../../models/Plants");
import {isArray} from "lodash";
import Plant, {IPlant} from "../../utils/dto/Plants";
const express = require('express');
const router = express.Router();


// TODO Plants
// - [ ] Check

router.post('/', async (req, res) => {
    // Setup
    const acceptableKeys = [
        'PlantID',
        'name',
        'scientificName',
        'wateringType',
        'lightType',
        'tempRange',
        'fertilization',
        'recentlyWatered',
        'difficulty',
        'whoWatered',
        'difficulty',
        'isTakenBy',
        'endTakenDate',
    ];

    // Handle errors or missing data
    req.accepts('application/json');

    if(!req.body || !req.body.plant) res.status(400).send( 'Bad Request').end();
    else if(!req.headers.authorization) {res.status(401).send( 'Unauthorized').end()}


    // Everything is validated, lets goooo
    else {

        // Get the data from the body
        let body = req.body.plant;

        // Make sure that the date is valid and in the correct format.
        let data: IPlant | Array<IPlant> | boolean;

        // Checks if the post data is an array or not. Then parses it and gets it ready for the database.
        const isAnArray = isArray(body);
        // @ts-ignore
        //data = isAnArray ? parseMany(acceptableKeys, body) : parseOne(acceptableKeys, body);

        data = isAnArray ? body.map(plant => Plant.validate(plant)) : Plant.validate(body);

        //console.log(nd)

        /* ################ *\
         * Response handler *
        \* ################ */
        // If data is missing, respond now
        if (!data) res.status(400).send('Bad Request');
        else {
            try {
                isAnArray
                    ? await Plants.insertMany(data)
                    : await Plants.create(data);
                res.status(201).send('Resource Successfully Created');
            }
            catch (e) {
                console.log(e)
                res.status(400).send('Bad Request');
            }
        }
    }
})


module.exports = router;
