export{};
const express = require('express');
const router = express.Router();
const Measurements = require('../../models/Measurments.ts');
const authToken = require('./../../config/tokens').authorization_token;
const lod = require('lodash');

router.get('/:id/:limit(\d)', async (req, res) => {
    let limit = 1;

    if (req.params.limit && lod.isFinite(Number(req.params.limit))) {
        if (!lod.inRange(req.params.limit, 0, 101)){
            limit = 100;
        } else limit = req.params.limit
    } else limit = 1

    if(req.headers.authorization == `Basic ${authToken}`) {
        await Measurements
            .find(
                { plantShortName: `${req.params.id}` },
                '-_id -__v',
                { limit: limit })
            .exec()
            .then(result => {
                if (!result) {
                    res.status(404)
                        .send('Nothing found on that plant.');
                } else {
                    res.send({
                        "ok":true,
                        "data":result,
                    }).end();
                }
            });
    }

    else {
        res.status(401).send('This request is unauthorized, please authenticate your method.').end();
    }

    // Send the data.
})


module.exports = router;

// Measurements
// Measurements
