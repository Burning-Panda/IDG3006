export{};
const express = require('express');
const router = express.Router();
const Plants = require('../../models/Plants.ts');
const authToken = require('./../../config/tokens').authorization_token;

interface IPlants {
    id: number;
    name: string;
    description: string;
    image: string;
}

router.get('/', async (req, res) => {


    /*
    const token = req.headers.authorization;

    if (req.headers.authorization !== authToken) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
     */
    const query = req.query;
    if(query.auth === authToken) {

        let data;
        let isOk;
        let status;

        await Plants
            .find(
                {},
                '-_id -__v -wateringType -endTakenDate -isTakenBy -lightType -fertilization -tempRange',
                {}
            )
            .exec()
            .then((result: any) => {
               if (result) {
                   res.json({
                           ok: true,
                           data: result
                       })
               }
            })
            .catch(e => {
                console.log(e);
                res.status(500)
                    .json({ok:false, message: 'Internal error, something went wrong. Error has been logged.', data: []});
            });

    }

    else {
        res.status(401)
            .send('This request is unauthorized, please authenticate your browser.');
    }

    // Send the data.
})


router.get('/AllPlants', async (req, res) => {

    const query = req.query;
    if(query.auth === authToken) {
        const plantsList = query.plants.split(',');

        // create an array of objects that will be used to find the plants
        let plants = plantsList.map(plant => {
            return {PlantID: plant}
        });


        // Find all plants listed in query.plants object

        await Plants
            .find(
                {},
                '-_id -__v -wateringType -endTakenDate -isTakenBy -lightType -fertilization -tempRange',
                {}
            )
            .or(plants)
            .exec()
            .then((result: any) => {
                if (result) {
                    res.json({
                        ok: true,
                        data: result
                    })
                }
            })
            .catch(e => {
                console.log(e);
                res.status(500)
                    .json({ok:false, message: 'Internal error, something went wrong. Error has been logged.', data: []});
            });

    }

    else {
        res.status(401)
            .send('This request is unauthorized, please authenticate your browser.');
    }

    // Send the data.
})


module.exports = router;

// Measurements
// Measurements
