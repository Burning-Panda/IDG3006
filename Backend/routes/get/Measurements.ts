export{};
const express = require('express');
const router = express.Router();
const Measurements = require('../../models/Measurments.ts');
const authToken = require('./../../config/tokens').authorization_token;

router.get('/', async (req, res) => {

    if(req.headers.authorization == `Basic ${authToken}`) {
        await Measurements
            .find({})
            .exec()
            .then(result => {
                res.status(200)
                    .send({
                    "ok":true,
                    "data":result,
                });
            });
    }

    else {
        res.status(401).send('This request is unauthorized, please authenticate your method.');
    }

    // Send the data.
})


module.exports = router;

// Measurements
// Measurements
